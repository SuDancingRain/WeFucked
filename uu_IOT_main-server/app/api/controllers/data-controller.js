"use strict";
const DataAbl = require("../../abl/data-abl.js");

class DataController {

  list(ucEnv) {
    return DataAbl.filteredList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

}

module.exports = new DataController();
