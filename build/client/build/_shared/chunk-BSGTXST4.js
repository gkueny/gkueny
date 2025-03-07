import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/dart.js
var require_dart = __commonJS({
  "node_modules/refractor/lang/dart.js"(exports, module) {
    module.exports = dart;
    dart.displayName = "dart";
    dart.aliases = [];
    function dart(Prism) {
      ;
      (function(Prism2) {
        var keywords = [
          /\b(?:async|sync|yield)\*/,
          /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extension|external|extends|factory|final|finally|for|get|hide|if|implements|interface|import|in|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/
        ];
        var packagePrefix = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
        var className = {
          pattern: RegExp(packagePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
          lookbehind: true,
          inside: {
            namespace: {
              pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
              inside: {
                punctuation: /\./
              }
            }
          }
        };
        Prism2.languages.dart = Prism2.languages.extend("clike", {
          string: [
            {
              pattern: /r?("""|''')[\s\S]*?\1/,
              greedy: true
            },
            {
              pattern: /r?(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
              greedy: true
            }
          ],
          "class-name": [
            className,
            {
              // variables and parameters
              // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
              pattern: RegExp(
                packagePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source
              ),
              lookbehind: true,
              inside: className.inside
            }
          ],
          keyword: keywords,
          operator: /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/
        });
        Prism2.languages.insertBefore("dart", "function", {
          metadata: {
            pattern: /@\w+/,
            alias: "symbol"
          }
        });
        Prism2.languages.insertBefore("dart", "class-name", {
          generics: {
            pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
            inside: {
              "class-name": className,
              keyword: keywords,
              punctuation: /[<>(),.:]/,
              operator: /[?&|]/
            }
          }
        });
      })(Prism);
    }
  }
});

export {
  require_dart
};
//# sourceMappingURL=/build/_shared/chunk-BSGTXST4.js.map
