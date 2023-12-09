const express = require("express");
const bot = express.Router();
// const Email = require("../model/email");
// const log = console.log.bind(console);

bot.get("/pingbot", async (request, response) => {
  try {
    response.status(200);
    response.send('running');
  } catch (error) {
    response.status(500);
    response.send(error);
  }
});

bot.post("/tv-order", async (request, response) => {
  try {
    const { body } = request;
    log('tv-order', body)
    response.status(200);
  } catch (error) {
    response.status(500);
    response.send(error);
  }
});

// email.post("/email", async (request, response) => {
//   const { body } = request;
//   try {
//     await Email.save(body);
//     response.status(200);
//     response.send("Saved!");
//   } catch (error) {
//     response.status(500);
//   }
// });

// email.get("/email", async (request, response) => {
//   try {
//     const r = await Email.fetchList();
//     response.status(200);
//     response.send(r);
//   } catch (error) {
//     response.status(500);
//     response.send(error);
//   }
// });

// email.get("/gltf", async (request, response) => {
//   try {
//     response.status(200);
//     response.sendFile(path.join(__dirname, "../../build/gltf/index.html"));
//   } catch (error) {
//     response.status(500);
//     response.send(error);
//   }
// });

module.exports = bot;
