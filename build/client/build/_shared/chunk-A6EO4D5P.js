import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/ruby.js
var require_ruby = __commonJS({
  "node_modules/refractor/lang/ruby.js"(exports, module) {
    module.exports = ruby;
    ruby.displayName = "ruby";
    ruby.aliases = ["rb"];
    function ruby(Prism) {
      ;
      (function(Prism2) {
        Prism2.languages.ruby = Prism2.languages.extend("clike", {
          comment: [
            /#.*/,
            {
              pattern: /^=begin\s[\s\S]*?^=end/m,
              greedy: true
            }
          ],
          "class-name": {
            pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: true,
            inside: {
              punctuation: /[.\\]/
            }
          },
          keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/
        });
        var interpolation = {
          pattern: /#\{[^}]+\}/,
          inside: {
            delimiter: {
              pattern: /^#\{|\}$/,
              alias: "tag"
            },
            rest: Prism2.languages.ruby
          }
        };
        delete Prism2.languages.ruby.function;
        Prism2.languages.insertBefore("ruby", "keyword", {
          regex: [
            {
              pattern: RegExp(
                /%r/.source + "(?:" + [
                  /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
                  /\((?:[^()\\]|\\[\s\S])*\)/.source,
                  // Here we need to specifically allow interpolation
                  /\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/.source,
                  /\[(?:[^\[\]\\]|\\[\s\S])*\]/.source,
                  /<(?:[^<>\\]|\\[\s\S])*>/.source
                ].join("|") + ")" + /[egimnosux]{0,6}/.source
              ),
              greedy: true,
              inside: {
                interpolation
              }
            },
            {
              pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
              lookbehind: true,
              greedy: true,
              inside: {
                interpolation
              }
            }
          ],
          variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
          symbol: {
            pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/,
            lookbehind: true
          },
          "method-definition": {
            pattern: /(\bdef\s+)[\w.]+/,
            lookbehind: true,
            inside: {
              function: /\w+$/,
              rest: Prism2.languages.ruby
            }
          }
        });
        Prism2.languages.insertBefore("ruby", "number", {
          builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
          constant: /\b[A-Z]\w*(?:[?!]|\b)/
        });
        Prism2.languages.ruby.string = [
          {
            pattern: RegExp(
              /%[qQiIwWxs]?/.source + "(?:" + [
                /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
                /\((?:[^()\\]|\\[\s\S])*\)/.source,
                // Here we need to specifically allow interpolation
                /\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/.source,
                /\[(?:[^\[\]\\]|\\[\s\S])*\]/.source,
                /<(?:[^<>\\]|\\[\s\S])*>/.source
              ].join("|") + ")"
            ),
            greedy: true,
            inside: {
              interpolation
            }
          },
          {
            pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
            greedy: true,
            inside: {
              interpolation
            }
          },
          {
            pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
            alias: "heredoc-string",
            greedy: true,
            inside: {
              delimiter: {
                pattern: /^<<[-~]?[a-z_]\w*|[a-z_]\w*$/i,
                alias: "symbol",
                inside: {
                  punctuation: /^<<[-~]?/
                }
              },
              interpolation
            }
          },
          {
            pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
            alias: "heredoc-string",
            greedy: true,
            inside: {
              delimiter: {
                pattern: /^<<[-~]?'[a-z_]\w*'|[a-z_]\w*$/i,
                alias: "symbol",
                inside: {
                  punctuation: /^<<[-~]?'|'$/
                }
              }
            }
          }
        ];
        Prism2.languages.rb = Prism2.languages.ruby;
      })(Prism);
    }
  }
});

export {
  require_ruby
};
//# sourceMappingURL=/build/_shared/chunk-A6EO4D5P.js.map
