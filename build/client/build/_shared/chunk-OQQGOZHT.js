import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/json.js
var require_json = __commonJS({
  "node_modules/refractor/lang/json.js"(exports, module) {
    module.exports = json;
    json.displayName = "json";
    json.aliases = ["webmanifest"];
    function json(Prism) {
      Prism.languages.json = {
        property: {
          pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
          lookbehind: true,
          greedy: true
        },
        string: {
          pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
          lookbehind: true,
          greedy: true
        },
        comment: {
          pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
          greedy: true
        },
        number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
        punctuation: /[{}[\],]/,
        operator: /:/,
        boolean: /\b(?:true|false)\b/,
        null: {
          pattern: /\bnull\b/,
          alias: "keyword"
        }
      };
      Prism.languages.webmanifest = Prism.languages.json;
    }
  }
});

export {
  require_json
};
//# sourceMappingURL=/build/_shared/chunk-OQQGOZHT.js.map
