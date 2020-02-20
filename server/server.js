import path from "path";
import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";

import templete from "./../templete";
import config from "./../config/config";
//comment out before building for production
import devBundle from "./devBundle";

const app = express();
//comment out before building for production
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send(templete());
});

app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

// Database Connection URL
// const url = config.mongoUri;
// // Use connect method to connect to the server
// MongoClient.connect(url, (err, db) => {
//   console.log("Connected successfully to mongodb server");
//   db.close();
// });
