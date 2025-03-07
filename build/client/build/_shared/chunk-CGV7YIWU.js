import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/editorconfig.js
var require_editorconfig = __commonJS({
  "node_modules/refractor/lang/editorconfig.js"(exports, module) {
    module.exports = editorconfig;
    editorconfig.displayName = "editorconfig";
    editorconfig.aliases = [];
    function editorconfig(Prism) {
      Prism.languages.editorconfig = {
        // https://editorconfig-specification.readthedocs.io/en/latest/
        comment: /[;#].*/,
        section: {
          pattern: /(^[ \t]*)\[.+\]/m,
          lookbehind: true,
          alias: "keyword",
          inside: {
            regex: /\\\\[\[\]{},!?.*]/,
            // Escape special characters with '\\'
            operator: /[!?]|\.\.|\*{1,2}/,
            punctuation: /[\[\]{},]/
          }
        },
        property: {
          pattern: /(^[ \t]*)[^\s=]+(?=[ \t]*=)/m,
          lookbehind: true
        },
        value: {
          pattern: /=.*/,
          alias: "string",
          inside: {
            punctuation: /^=/
          }
        }
      };
    }
  }
});

export {
  require_editorconfig
};
//# sourceMappingURL=/build/_shared/chunk-CGV7YIWU.js.map
