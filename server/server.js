import React from "react";
import ReactDOMServer from "react-dom/server";
import StaticRouter from "react-router-dom/StaticRouter";
import MainRouter from "./../client/MainRouter";
import { SheetsRegistry, JssProvider } from "react-jss";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "material-ui/styles";
import { indigo, pink } from "material-ui/colors";

import path from "path";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";

import Template from "./../templete";
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

app.get("*", (req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#757de8",
        main: "#3f51b5",
        dark: "#002984",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff79b0",
        main: "#ff4081",
        dark: "#c60055",
        contrastText: "#000"
      },
      openTitle: indigo["400"],
      protectedTitle: pink["400"],
      type: "light"
    }
  });

  const generateClassName = createGenerateClassName();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <MainRouter />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheetsRegistry.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css
    })
  );
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
