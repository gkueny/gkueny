import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/ocaml.js
var require_ocaml = __commonJS({
  "node_modules/refractor/lang/ocaml.js"(exports, module) {
    module.exports = ocaml;
    ocaml.displayName = "ocaml";
    ocaml.aliases = [];
    function ocaml(Prism) {
      Prism.languages.ocaml = {
        comment: /\(\*[\s\S]*?\*\)/,
        string: [
          {
            pattern: /"(?:\\.|[^\\\r\n"])*"/,
            greedy: true
          },
          {
            pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
            greedy: true
          }
        ],
        number: /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*(?:\.[\d_]*)?(?:e[+-]?[\d_]+)?)/i,
        directive: {
          pattern: /\B#\w+/,
          alias: "important"
        },
        label: {
          pattern: /\B~\w+/,
          alias: "function"
        },
        "type-variable": {
          pattern: /\B'\w+/,
          alias: "function"
        },
        variant: {
          pattern: /`\w+/,
          alias: "variable"
        },
        module: {
          pattern: /\b[A-Z]\w+/,
          alias: "variable"
        },
        // For the list of keywords and operators,
        // see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
        keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
        boolean: /\b(?:false|true)\b/,
        // Custom operators are allowed
        operator: /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
        punctuation: /[(){}\[\]|.,:;]|\b_\b/
      };
    }
  }
});

export {
  require_ocaml
};
//# sourceMappingURL=/build/_shared/chunk-RVNSNH5L.js.map
