import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/hcl.js
var require_hcl = __commonJS({
  "node_modules/refractor/lang/hcl.js"(exports, module) {
    module.exports = hcl;
    hcl.displayName = "hcl";
    hcl.aliases = [];
    function hcl(Prism) {
      Prism.languages.hcl = {
        comment: /(?:\/\/|#).*|\/\*[\s\S]*?(?:\*\/|$)/,
        heredoc: {
          pattern: /<<-?(\w+\b)[\s\S]*?^[ \t]*\1/m,
          greedy: true,
          alias: "string"
        },
        keyword: [
          {
            pattern: /(?:resource|data)\s+(?:"(?:\\[\s\S]|[^\\"])*")(?=\s+"[\w-]+"\s+\{)/i,
            inside: {
              type: {
                pattern: /(resource|data|\s+)(?:"(?:\\[\s\S]|[^\\"])*")/i,
                lookbehind: true,
                alias: "variable"
              }
            }
          },
          {
            pattern: /(?:provider|provisioner|variable|output|module|backend)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+(?=\{)/i,
            inside: {
              type: {
                pattern: /(provider|provisioner|variable|output|module|backend)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+/i,
                lookbehind: true,
                alias: "variable"
              }
            }
          },
          /[\w-]+(?=\s+\{)/
        ],
        property: [/[-\w\.]+(?=\s*=(?!=))/, /"(?:\\[\s\S]|[^\\"])+"(?=\s*[:=])/],
        string: {
          pattern: /"(?:[^\\$"]|\\[\s\S]|\$(?:(?=")|\$+(?!\$)|[^"${])|\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\})*"/,
          greedy: true,
          inside: {
            interpolation: {
              pattern: /(^|[^$])\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\}/,
              lookbehind: true,
              inside: {
                type: {
                  pattern: /(\b(?:terraform|var|self|count|module|path|data|local)\b\.)[\w\*]+/i,
                  lookbehind: true,
                  alias: "variable"
                },
                keyword: /\b(?:terraform|var|self|count|module|path|data|local)\b/i,
                function: /\w+(?=\()/,
                string: {
                  pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                  greedy: true
                },
                number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
                punctuation: /[!\$#%&'()*+,.\/;<=>@\[\\\]^`{|}~?:]/
              }
            }
          }
        },
        number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
        boolean: /\b(?:true|false)\b/i,
        punctuation: /[=\[\]{}]/
      };
    }
  }
});

export {
  require_hcl
};
//# sourceMappingURL=/build/_shared/chunk-T3K26VIJ.js.map
