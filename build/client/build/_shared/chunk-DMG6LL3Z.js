import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/fsharp.js
var require_fsharp = __commonJS({
  "node_modules/refractor/lang/fsharp.js"(exports, module) {
    module.exports = fsharp;
    fsharp.displayName = "fsharp";
    fsharp.aliases = [];
    function fsharp(Prism) {
      Prism.languages.fsharp = Prism.languages.extend("clike", {
        comment: [
          {
            pattern: /(^|[^\\])\(\*(?!\))[\s\S]*?\*\)/,
            lookbehind: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true
          }
        ],
        string: {
          pattern: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|"(?:\\[\s\S]|[^\\"])*")B?|'(?:[^\\']|\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))'B?/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[.\w]+\b(?:\s*(?:->|\*)\s*[.\w]+\b)*(?!\s*[:.])/,
          lookbehind: true,
          inside: {
            operator: /->|\*/,
            punctuation: /\./
          }
        },
        keyword: /\b(?:let|return|use|yield)(?:!\B|\b)|\b(?:abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
        number: [
          /\b0x[\da-fA-F]+(?:un|lf|LF)?\b/,
          /\b0b[01]+(?:y|uy)?\b/,
          /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i,
          /\b\d+(?:[IlLsy]|u[lsy]?|UL)?\b/
        ],
        operator: /([<>~&^])\1\1|([*.:<>&])\2|<-|->|[!=:]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[-+*/%=<>])\??|[!?^&]|~[+~-]|:>|:\?>?/
      });
      Prism.languages.insertBefore("fsharp", "keyword", {
        preprocessor: {
          pattern: /(^[\t ]*)#.*/m,
          lookbehind: true,
          alias: "property",
          inside: {
            directive: {
              pattern: /(^#)\b(?:else|endif|if|light|line|nowarn)\b/,
              lookbehind: true,
              alias: "keyword"
            }
          }
        }
      });
      Prism.languages.insertBefore("fsharp", "punctuation", {
        "computation-expression": {
          pattern: /\b[_a-z]\w*(?=\s*\{)/i,
          alias: "keyword"
        }
      });
      Prism.languages.insertBefore("fsharp", "string", {
        annotation: {
          pattern: /\[<.+?>\]/,
          inside: {
            punctuation: /^\[<|>\]$/,
            "class-name": {
              pattern: /^\w+$|(^|;\s*)[A-Z]\w*(?=\()/,
              lookbehind: true
            },
            "annotation-content": {
              pattern: /[\s\S]+/,
              inside: Prism.languages.fsharp
            }
          }
        }
      });
    }
  }
});

export {
  require_fsharp
};
//# sourceMappingURL=/build/_shared/chunk-DMG6LL3Z.js.map
