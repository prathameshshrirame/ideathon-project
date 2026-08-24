const express = require("express");

const router = express.Router();

const {
    analyze
    } = require("../controllers/emergency.controller");

    router.post("/analyze", analyze);

    module.exports = router;