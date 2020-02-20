import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackClientConfig from "../webpack.config.client";

const compile = app => {
  if (process.env.NODE_ENV === "development") {
    const compiler = webpack(webpackClientConfig);
    const middleware = webpackDevMiddleware(compiler, {
      publicPath: webpackClientConfig.output.publicPath
    });
    const middlewares = [middleware, webpackHotMiddleware(compiler)];
    app.use(middlewares);
  }
};

export default {
  compile
};
