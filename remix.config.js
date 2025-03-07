const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");

/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/_build",
  ignoredRouteFiles: [".*"],
  dev: {
    port: 4004,
  },
  future: {
    // makes the warning go away in v1.15+
    v2_routeConvention: true,
  },

  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
};
