const express = require("express");
const app = express();
const axios = require('axios').default;

app.get("/front", async (req, res) => {

    res.json({
        data: [{ name: "e20w0000000_1280x720.png", size: "1280 x 720" },
        { name: "e20w0000000_1920x1080.png", size: "1920 x 1080" },
        { name: "e20w0000000_2048x1080.png", size: "2048 x 1080" },
        { name: "e20w0000000_4096x2160.png", size: "4096 x 2160" },
        { name: "e20w0000000_7680x4230.png", size: "7680 x 4320" },
        ]
    })



});



module.exports = app;