const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    console.log("user service is running");
    return res.json({message : "user service is running"});
})

app.listen(PORT, () => {
    console.log(`User service is running at http://localhost:${PORT}/`)
})