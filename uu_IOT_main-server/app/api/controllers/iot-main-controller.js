"use strict";
const IOTMainAbl = require("../../abl/iot-main-abl.js");

class IOTMainController {
  init(ucEnv) {
    return IOTMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new IOTMainController();
