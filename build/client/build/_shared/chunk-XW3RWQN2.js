import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/hsts.js
var require_hsts = __commonJS({
  "node_modules/refractor/lang/hsts.js"(exports, module) {
    module.exports = hsts;
    hsts.displayName = "hsts";
    hsts.aliases = [];
    function hsts(Prism) {
      Prism.languages.hsts = {
        directive: {
          pattern: /\b(?:max-age=|includeSubDomains|preload)/,
          alias: "keyword"
        },
        safe: {
          pattern: /\b\d{8,}\b/,
          alias: "selector"
        },
        unsafe: {
          pattern: /\b\d{1,7}\b/,
          alias: "function"
        }
      };
    }
  }
});

export {
  require_hsts
};
//# sourceMappingURL=/build/_shared/chunk-XW3RWQN2.js.map
