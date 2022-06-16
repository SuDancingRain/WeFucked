"use strict";

const IOTMainUseCaseError = require("./iot-main-use-case-error.js");
const DATA_ERROR_PREFIX = `${IOTMainUseCaseError.ERROR_PREFIX}data/`;

const FilteredList = {
  UC_CODE: `${DATA_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${FilteredList.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  DaoFilteredListFailed: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${FilteredList.UC_CODE}DAOFilteredListFailed`;
      this.message = "DAO filtered list failed";
    }
  },
  TooSmallGranurality: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${FilteredList.UC_CODE}DAOFilteredListFailed`;
      this.message = "Too small granurality";
    }
  },
  MissingMeteo: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${FilteredList.UC_CODE}DAOFilteredListFailed`;
      this.message = "Meteo with that ID does not exist";
    }
  },
  UserIsNotAuthorizedToViewThisStation: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${FilteredList.UC_CODE}userIsNotAuthorizedToViewThisStation`;
      this.message = "User is not authorized to view this station";
    }
  },
};

module.exports = {
  FilteredList
};
