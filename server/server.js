import path from "path";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";

import templete from "./../templete";
import config from "./../config/config";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
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

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

// Database Connection URL
const url = config.mongoUri;
console.log("mongo url", url);
// Use connect method to connect to the server
mongoose.connect(url);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
