"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class DataMongo extends UuObjectDao {

  async createSchema(){
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async get(awid, meteoId, timestamp) {
    return await super.findOne({ awid, meteoId, timestamp});
  }
  async list(awid, meteoId,timeStart,timeEnd,pageInfo = { pageIndex: 0, pageSize: 1000 }, sortBy = {}, projection = {}) {
    return await super.find({ awid, meteoId,timestamp:{$gte:timeStart,$lte:timeEnd}}, pageInfo, sortBy, projection);
  }
}

module.exports = DataMongo;
