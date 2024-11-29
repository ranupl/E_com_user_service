const express = require("express");
const app = express();
require('dotenv').config({ path: './config/.env' });
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const routes = require("./routes/user.route");

app.use(express.json());
app.use(cors());
app.use("/api/user", routes);

app.get("/", (req, res) => {
    console.log("user service is running");
    return res.json({message : "user service is running"});
})

app.listen(PORT, () => {
    console.log(`User service is running at http://localhost:${PORT}/`)
})