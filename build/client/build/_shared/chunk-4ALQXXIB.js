import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/jolie.js
var require_jolie = __commonJS({
  "node_modules/refractor/lang/jolie.js"(exports, module) {
    module.exports = jolie;
    jolie.displayName = "jolie";
    jolie.aliases = [];
    function jolie(Prism) {
      Prism.languages.jolie = Prism.languages.extend("clike", {
        string: {
          pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        keyword: /\b(?:include|define|is_defined|undef|main|init|outputPort|inputPort|Location|Protocol|Interfaces|RequestResponse|OneWay|type|interface|extender|throws|cset|csets|forward|Aggregates|Redirects|embedded|courier|execution|sequential|concurrent|single|scope|install|throw|comp|cH|default|global|linkIn|linkOut|synchronized|this|new|for|if|else|while|in|Jolie|Java|Javascript|nullProcess|spawn|constants|with|provide|until|exit|foreach|instanceof|over|service)\b/,
        number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?l?/i,
        operator: /-[-=>]?|\+[+=]?|<[<=]?|[>=*!]=?|&&|\|\||[:?\/%^]/,
        punctuation: /[,.]/,
        builtin: /\b(?:undefined|string|int|void|long|Byte|bool|double|float|char|any)\b/,
        symbol: /[|;@]/
      });
      delete Prism.languages.jolie["class-name"];
      Prism.languages.insertBefore("jolie", "keyword", {
        function: {
          pattern: /((?:\b(?:outputPort|inputPort|in|service|courier)\b|@)\s*)\w+/,
          lookbehind: true
        },
        aggregates: {
          pattern: /(\bAggregates\s*:\s*)(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/,
          lookbehind: true,
          inside: {
            "with-extension": {
              pattern: /\bwith\s+\w+/,
              inside: {
                keyword: /\bwith\b/
              }
            },
            function: {
              pattern: /\w+/
            },
            punctuation: {
              pattern: /,/
            }
          }
        },
        redirects: {
          pattern: /(\bRedirects\s*:\s*)(?:\w+\s*=>\s*\w+\s*,\s*)*(?:\w+\s*=>\s*\w+)/,
          lookbehind: true,
          inside: {
            punctuation: {
              pattern: /,/
            },
            function: {
              pattern: /\w+/
            },
            symbol: {
              pattern: /=>/
            }
          }
        }
      });
    }
  }
});

export {
  require_jolie
};
//# sourceMappingURL=/build/_shared/chunk-4ALQXXIB.js.map
