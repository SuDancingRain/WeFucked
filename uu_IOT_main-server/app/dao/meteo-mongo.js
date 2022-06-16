"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class MeteoMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }
  async list(awid, pageInfo = { pageIndex: 0, pageSize: 100 }, sortBy = {}, projection = {}) {
    return await super.find({ awid }, pageInfo, sortBy, projection);
  }

  async update(dtoIn) {
    let filter = { meteoId: dtoIn.meteoId, awid: dtoIn.awid };
   return await super.findOneAndUpdate(filter, dtoIn, "NONE");
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async get(awid, meteoId) {
    return await super.findOne({ awid, meteoId });
  }
  async delete(awid, meteoId) {
    return await super.deleteOne({awid, meteoId})
  }
}

module.exports = MeteoMongo;
