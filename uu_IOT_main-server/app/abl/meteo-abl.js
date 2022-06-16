"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/meteo-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
};

class MeteoAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("meteo");
  }

  async list(awid, dtoIn, session, authorizationResult) {
    // hds 2 2.1
    let validationResult = this.validator.validate("weatherStationListDtoInType", dtoIn);
    // hds 2.2, 2.3 // A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // hds 3
    dtoIn.awid = awid;
    let dtoOut;

    console.log(authorizationResult.getUuIdentityProfileList());



    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn, session, authorizationResult) {
    // hds 2 2.1
    let validationResult = this.validator.validate("weatherStationListDtoInType", dtoIn);
    // hds 2.2, 2.3 // A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // hds 3
    dtoIn.awid = awid;
    let dtoOut;

    console.log(authorizationResult.getUuIdentityProfileList());



    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn, session, authorizationResult) {
    // hds 2 2.1
    let validationResult = this.validator.validate("weatherStationListDtoInType", dtoIn);
    // hds 2.2, 2.3 // A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // hds 3
    dtoIn.awid = awid;
    let dtoOut;

    console.log(authorizationResult.getUuIdentityProfileList());



    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    // hds 2 2.1
    let validationResult = this.validator.validate("weatherStationListDtoInType", dtoIn);
    // hds 2.2, 2.3 // A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // hds 3
    dtoIn.awid = awid;
    let dtoOut;

    console.log(authorizationResult.getUuIdentityProfileList());



    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn, session, authorizationResult) {
    // hds 2 2.1
    let validationResult = this.validator.validate("weatherStationListDtoInType", dtoIn);
    // hds 2.2, 2.3 // A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    // hds 3
    dtoIn.awid = awid;
    let dtoOut;

    console.log(authorizationResult.getUuIdentityProfileList());



    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new MeteoAbl();
