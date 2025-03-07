import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/smalltalk.js
var require_smalltalk = __commonJS({
  "node_modules/refractor/lang/smalltalk.js"(exports, module) {
    module.exports = smalltalk;
    smalltalk.displayName = "smalltalk";
    smalltalk.aliases = [];
    function smalltalk(Prism) {
      Prism.languages.smalltalk = {
        comment: /"(?:""|[^"])*"/,
        character: {
          pattern: /\$./,
          alias: "string"
        },
        string: /'(?:''|[^'])*'/,
        symbol: /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
        "block-arguments": {
          pattern: /(\[\s*):[^\[|]*\|/,
          lookbehind: true,
          inside: {
            variable: /:[\da-z]+/i,
            punctuation: /\|/
          }
        },
        "temporary-variables": {
          pattern: /\|[^|]+\|/,
          inside: {
            variable: /[\da-z]+/i,
            punctuation: /\|/
          }
        },
        keyword: /\b(?:nil|true|false|self|super|new)\b/,
        number: [
          /\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/,
          /\b\d+(?:\.\d+)?(?:e-?\d+)?/
        ],
        operator: /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/,
        punctuation: /[.;:?\[\](){}]/
      };
    }
  }
});

export {
  require_smalltalk
};
//# sourceMappingURL=/build/_shared/chunk-GK7EVV2D.js.map
