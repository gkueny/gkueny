import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/j.js
var require_j = __commonJS({
  "node_modules/refractor/lang/j.js"(exports, module) {
    module.exports = j;
    j.displayName = "j";
    j.aliases = [];
    function j(Prism) {
      Prism.languages.j = {
        comment: /\bNB\..*/,
        string: {
          pattern: /'(?:''|[^'\r\n])*'/,
          greedy: true
        },
        keyword: /\b(?:(?:adverb|conjunction|CR|def|define|dyad|LF|monad|noun|verb)\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
        verb: {
          // Negative look-ahead prevents bad highlighting
          // of ^: ;. =. =: !. !:
          pattern: /(?!\^:|;\.|[=!][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[=!\]]|[<>+*\-%$|,#][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_\/\\qsux]|_?\d):)/,
          alias: "keyword"
        },
        number: /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:[ejpx]|ad|ar)_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?:\.[\da-z]+)?)?|_\b(?!\.))/,
        adverb: {
          pattern: /[~}]|[\/\\]\.?|[bfM]\.|t[.:]/,
          alias: "builtin"
        },
        operator: /[=a][.:]|_\./,
        conjunction: {
          pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
          alias: "variable"
        },
        punctuation: /[()]/
      };
    }
  }
});

export {
  require_j
};
//# sourceMappingURL=/build/_shared/chunk-WR2HVL5V.js.map
