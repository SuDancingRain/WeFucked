"use strict";

const IOTMainUseCaseError = require("./iot-main-use-case-error.js");
const METEO_ERROR_PREFIX = `${IOTMainUseCaseError.ERROR_PREFIX}meteo/`;

const Create = {
  UC_CODE: `${METEO_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Delete = {
  UC_CODE: `${METEO_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Update = {
  UC_CODE: `${METEO_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${METEO_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const List = {
  UC_CODE: `${METEO_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends IOTMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Get,
  Update,
  Delete,
  Create
};
