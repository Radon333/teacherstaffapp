var express = require("express");
var app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
require("dotenv").config();

// SOME COMMON MIDDLEWARES
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("./client/build"));

const databaseURL = "mongodb://shiv-nosql:nosql@cluster0-shard-00-00.esppv.mongodb.net:27017,cluster0-shard-00-01.esppv.mongodb.net:27017,cluster0-shard-00-02.esppv.mongodb.net:27017/project?ssl=true&replicaSet=atlas-tpt76p-shard-0&authSource=admin&retryWrites=true&w=majority"
// DATABASE CONNECTION
mongoose.connect(
  process.env.MONGODB_URI || process.env.DATABASE || databaseURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) console.log(error);
    // Handle failed connection
    else
      console.log(
        "Database connected. Connection State -> " +
          mongoose.connection.readyState
      );
  }
);

// MAIN ROUTES
app.use("/college/teacher", require("./Routes/teacher"));

// SERVE STATIC ASSETS WHEN WE ARE IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var port = process.env.PORT || 8000;
app.listen(port, (req, res) => {
  console.log(`Woah! App is running on port ${port}`);
});
