import React from "react";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import { pink, indigo } from "material-ui/colors";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader";

import MainRouter from "./MainRouter";

const theme = createMuiTheme({
  pallete: {
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
    protedtedTitle: pink["400"],
    type: "light"
  }
});

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  </BrowserRouter>
);

export default hot(module)(App);
