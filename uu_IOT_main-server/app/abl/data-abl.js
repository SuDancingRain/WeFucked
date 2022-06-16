"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/data-error.js");

const WARNINGS = {
  filteredListUnsupportedKeys: {
    code: `${Errors.FilteredList.UC_CODE}unsupportedKeys`
  },
};

class DataAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("data");
    this.meteoDao = DaoFactory.getDao("meteo");
  }


  createInterpolant(xs, ys) {
    let i, length = xs.length;

    // Rearrange xs and ys so that xs is sorted
    let indexes = [];
    for (i = 0; i < length; i++) {
      indexes.push(i);
    }
    indexes.sort(
      function (a, b) {
        return xs[a] < xs[b] ? -1 : 1;
      });
    let oldXs = xs, oldYs = ys;
    // Impl: Creating new arrays also prevents problems if the input arrays are mutated later
    xs = []; ys = [];
    // Impl: Unary plus properly converts values to numbers
    for (i = 0; i < length; i++) { xs.push(+oldXs[indexes[i]]); ys.push(+oldYs[indexes[i]]); }

    // Get consecutive differences and slopes
    let dys = [], dxs = [], ms = [];
    for (i = 0; i < length - 1; i++) {
      let dx = xs[i + 1] - xs[i], dy = ys[i + 1] - ys[i];
      dxs.push(dx); dys.push(dy); ms.push(dy / dx);
    }

    // Get degree-1 coefficients
    let c1s = [ms[0]];
    for (i = 0; i < dxs.length - 1; i++) {
      let m = ms[i], mNext = ms[i + 1];
      if (m * mNext <= 0) {
        c1s.push(0);
      } else {
        let dx_ = dxs[i], dxNext = dxs[i + 1], common = dx_ + dxNext;
        c1s.push(3 * common / ((common + dxNext) / m + (common + dx_) / mNext));
      }
    }
    c1s.push(ms[ms.length - 1]);

    // Get degree-2 and degree-3 coefficients
    let c2s = [], c3s = [];
    for (i = 0; i < c1s.length - 1; i++) {
      let c1 = c1s[i], m_ = ms[i], invDx = 1 / dxs[i], common_ = c1 + c1s[i + 1] - m_ - m_;
      c2s.push((m_ - c1 - common_) * invDx); c3s.push(common_ * invDx * invDx);
    }

    // Return interpolant function
    return function (x) {
      // The rightmost point in the dataset should give an exact result
      let i = xs.length - 1;
      if (x == xs[i]) { return ys[i]; }

      // Search for the interval x is in, returning the corresponding y if x is one of the original xs
      let low = 0, avg, high = c3s.length - 1;
      while (low <= high) {
        avg = Math.floor(0.5 * (low + high));
        let xHere = xs[avg];
        if (xHere < x) { low = avg + 1; }
        else if (xHere > x) { high = avg - 1; }
        else { return ys[avg]; }
      }
      i = Math.max(0, high);

      // Interpolate
      let diff = x - xs[i], diffSq = diff * diff;
      return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
    }
  }

  async filteredList(awid, dtoIn, session, authorizationResult) {
    let validationResult = this.validator.validate("dataFilteredListDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.filteredListUnsupportedKeys.code,
      Errors.FilteredList.InvalidDtoIn
    );

    console.log(authorizationResult.getUuIdentity());
    console.log(authorizationResult.getProfileList());
    console.log(authorizationResult.getUuIdentityProfileList());

    dtoIn.awid = awid;

    try {
      let meteo = await this.meteoDao.get(dtoIn.awid, dtoIn.meteoId)
      if (meteo.meteoId != dtoIn.meteoId) {
        throw new Errors.FilteredList.MissingMeteo({ uuAppErrorMap });
      }
      if (!authorizationResult.getUuIdentityProfileList().includes("AwidLicenseOwner")) {
        if (!meteo.permissions || meteo.permissions.filter(p => p.uuId == session.getIdentity().getUuIdentity() && (p.permission == "view" || p.permission == "edit")) == null) {
          throw new Errors.FilteredList.UserIsNotAuthorizedToViewThisStation({ uuAppErrorMap });
        }
      }
    }
    catch (e) {
      throw e;
    }

    let dtoOut;

    let askedMin = Date.parse(dtoIn.timeStart);
    let askedMax = Date.parse(dtoIn.timeEnd);
    let granularity = dtoIn.granularity * 60 * 1000;
    let input;
    let pageInfo = { pageIndex: 0, pageSize: 1000 }
    try {
      let list = await this.dao.list(dtoIn.awid, dtoIn.meteoId, dtoIn.timeStart, dtoIn.timeEnd, pageInfo);
      input = list.itemList;
      if (list.pageInfo.total > list.pageInfo.pageSize) {
        console.log(input);
        while (input.length < list.pageInfo.total) {
          pageInfo.pageIndex += 1;
          list = await this.dao.list(dtoIn.awid, dtoIn.meteoId, dtoIn.timeStart, dtoIn.timeEnd, pageInfo);
          Array.prototype.push.apply(input, list.itemList);
        }
      }
    } catch (e) {
      if (e instanceof ObjectStoreError) throw new Errors.FilteredList.DaoFilteredListFailed({ uuAppErrorMap }, e);
      throw e;
    }
    let prefilterTime = [], prefilterTemp = [], prefilterHum = [];
    input.map(a => {
      prefilterTime.push(Date.parse(a.timestamp));
      prefilterTemp.push(a.temperature);
      prefilterHum.push(a.humidity);
    });
    if (prefilterTime.length == 0) {
      dtoOut = {};
    }
    else if (prefilterTemp.length == 1) {
      dtoOut.push({ "temperature": temp(prefilterTemp[0]), "timestamp": prefilterTime[0], "humidity": hum(prefilterHum[0]), "meteoId": dtoIn.meteoId });
    }
    else {
      let obj = [];
      let temp = this.createInterpolant(prefilterTime, prefilterTemp);
      let hum = this.createInterpolant(prefilterTime, prefilterHum);
      let minTime = Math.min(...prefilterTime);
      let maxTime = Math.max(...prefilterTime);
      if ((maxTime - minTime) / granularity > 1000) {
        throw new Errors.FilteredList.TooSmallGranurality({ uuAppErrorMap });
      }
      for (let x = minTime; x <= askedMax; x += granularity) {
        if (askedMin <= x && x <= maxTime) {
          obj.push({ "temperature": temp(x), "timestamp": x, "humidity": hum(x), "meteoId": dtoIn.meteoId });
        }
        else {
          break;
        }

      }
      dtoOut = obj;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new DataAbl();
