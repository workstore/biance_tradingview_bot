const express = require("express");
const bot = express.Router();
const log = console.log.bind(console);

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
        const { body, originalUrl, path } = request;
        log('tv-order', body)
        response.status(200);
        response.send({
            data: JSON.stringify(body),
            originalUrl, path
        })
    } catch (error) {
        response.status(500);
        response.send(error);
    }
});


module.exports = bot;