import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/nginx.js
var require_nginx = __commonJS({
  "node_modules/refractor/lang/nginx.js"(exports, module) {
    module.exports = nginx;
    nginx.displayName = "nginx";
    nginx.aliases = [];
    function nginx(Prism) {
      ;
      (function(Prism2) {
        var variable = /\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;
        Prism2.languages.nginx = {
          comment: {
            pattern: /(^|[\s{};])#.*/,
            lookbehind: true
          },
          directive: {
            pattern: /(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,
            lookbehind: true,
            greedy: true,
            inside: {
              string: {
                pattern: /((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,
                lookbehind: true,
                inside: {
                  escape: {
                    pattern: /\\["'\\nrt]/,
                    alias: "entity"
                  },
                  variable
                }
              },
              comment: {
                pattern: /(\s)#.*/,
                lookbehind: true,
                greedy: true
              },
              keyword: {
                pattern: /^\S+/,
                greedy: true
              },
              // other patterns
              boolean: {
                pattern: /(\s)(?:off|on)(?!\S)/,
                lookbehind: true
              },
              number: {
                pattern: /(\s)\d+[a-z]*(?!\S)/i,
                lookbehind: true
              },
              variable
            }
          },
          punctuation: /[{};]/
        };
      })(Prism);
    }
  }
});

export {
  require_nginx
};
//# sourceMappingURL=/build/_shared/chunk-URZQCQ34.js.map
