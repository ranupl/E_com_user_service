const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5001;
const db = require("./src/db/connection");
const routes = require("./src/routes/user.route");

db.query((err, results) => {
    if (err) {
      console.error('Query error:', err);
      return;
    }
    console.log('Query results:', results);
});

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