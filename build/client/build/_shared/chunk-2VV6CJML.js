import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/hpkp.js
var require_hpkp = __commonJS({
  "node_modules/refractor/lang/hpkp.js"(exports, module) {
    module.exports = hpkp;
    hpkp.displayName = "hpkp";
    hpkp.aliases = [];
    function hpkp(Prism) {
      Prism.languages.hpkp = {
        directive: {
          pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/,
          alias: "keyword"
        },
        safe: {
          pattern: /\b\d{7,}\b/,
          alias: "selector"
        },
        unsafe: {
          pattern: /\b\d{1,6}\b/,
          alias: "function"
        }
      };
    }
  }
});

export {
  require_hpkp
};
//# sourceMappingURL=/build/_shared/chunk-2VV6CJML.js.map
