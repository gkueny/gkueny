import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/kotlin.js
var require_kotlin = __commonJS({
  "node_modules/refractor/lang/kotlin.js"(exports, module) {
    module.exports = kotlin;
    kotlin.displayName = "kotlin";
    kotlin.aliases = ["kt", "kts"];
    function kotlin(Prism) {
      ;
      (function(Prism2) {
        Prism2.languages.kotlin = Prism2.languages.extend("clike", {
          keyword: {
            // The lookbehind prevents wrong highlighting of e.g. kotlin.properties.get
            pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
            lookbehind: true
          },
          function: [
            {
              pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/,
              greedy: true
            },
            {
              pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
              lookbehind: true,
              greedy: true
            }
          ],
          number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
          operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
        });
        delete Prism2.languages.kotlin["class-name"];
        Prism2.languages.insertBefore("kotlin", "string", {
          "raw-string": {
            pattern: /("""|''')[\s\S]*?\1/,
            alias: "string"
            // See interpolation below
          }
        });
        Prism2.languages.insertBefore("kotlin", "keyword", {
          annotation: {
            pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
            alias: "builtin"
          }
        });
        Prism2.languages.insertBefore("kotlin", "function", {
          label: {
            pattern: /\b\w+@|@\w+\b/,
            alias: "symbol"
          }
        });
        var interpolation = [
          {
            pattern: /\$\{[^}]+\}/,
            inside: {
              delimiter: {
                pattern: /^\$\{|\}$/,
                alias: "variable"
              },
              rest: Prism2.languages.kotlin
            }
          },
          {
            pattern: /\$\w+/,
            alias: "variable"
          }
        ];
        Prism2.languages.kotlin["string"].inside = Prism2.languages.kotlin["raw-string"].inside = {
          interpolation
        };
        Prism2.languages.kt = Prism2.languages.kotlin;
        Prism2.languages.kts = Prism2.languages.kotlin;
      })(Prism);
    }
  }
});

export {
  require_kotlin
};
//# sourceMappingURL=/build/_shared/chunk-P3WPBOYJ.js.map
