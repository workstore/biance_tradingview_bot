// const db = require('./index')
const mongoose = require("mongoose");
const log = console.log.bind(console);

class Email {
  constructor() {
    this.init();
  }

  init() {
    const emailSchema = mongoose.Schema({
      address: {
        type: String,
        required: true,
      },
      imageHash: {
        type: String,
        required: true,
      },
    });
    this.model = mongoose.model("Email", emailSchema);
  }

  async save(body) {
    try {
      let e = new this.model(body);
      const r = await e.save();
    } catch (error) {
      log("email saved error", error);
    }
  }

  async fetchList() {
    try {
      let docs = await this.model.find();
      return docs;
    } catch (error) {
      log("email fetchList error", error);
    }
  }
}

module.exports = new Email();
