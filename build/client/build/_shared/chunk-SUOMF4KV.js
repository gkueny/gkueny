import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/c.js
var require_c = __commonJS({
  "node_modules/refractor/lang/c.js"(exports, module) {
    module.exports = c;
    c.displayName = "c";
    c.aliases = [];
    function c(Prism) {
      Prism.languages.c = Prism.languages.extend("clike", {
        comment: {
          pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
          lookbehind: true
        },
        keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
        function: /\b[a-z_]\w*(?=\s*\()/i,
        number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
        operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
      });
      Prism.languages.insertBefore("c", "string", {
        macro: {
          // allow for multiline macro definitions
          // spaces after the # character compile fine with gcc
          pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
          lookbehind: true,
          greedy: true,
          alias: "property",
          inside: {
            string: [
              {
                // highlight the path of the include statement as a string
                pattern: /^(#\s*include\s*)<[^>]+>/,
                lookbehind: true
              },
              Prism.languages.c["string"]
            ],
            comment: Prism.languages.c["comment"],
            "macro-name": [
              {
                pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
                lookbehind: true
              },
              {
                pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
                lookbehind: true,
                alias: "function"
              }
            ],
            // highlight macro directives as keywords
            directive: {
              pattern: /^(#\s*)[a-z]+/,
              lookbehind: true,
              alias: "keyword"
            },
            "directive-hash": /^#/,
            punctuation: /##|\\(?=[\r\n])/,
            expression: {
              pattern: /\S[\s\S]*/,
              inside: Prism.languages.c
            }
          }
        },
        // highlight predefined macros as constants
        constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
      });
      delete Prism.languages.c["boolean"];
    }
  }
});

export {
  require_c
};
//# sourceMappingURL=/build/_shared/chunk-SUOMF4KV.js.map
