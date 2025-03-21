import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/go.js
var require_go = __commonJS({
  "node_modules/refractor/lang/go.js"(exports, module) {
    module.exports = go;
    go.displayName = "go";
    go.aliases = [];
    function go(Prism) {
      Prism.languages.go = Prism.languages.extend("clike", {
        string: {
          pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
          greedy: true
        },
        keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
        boolean: /\b(?:_|iota|nil|true|false)\b/,
        number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
        operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
        builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/
      });
      delete Prism.languages.go["class-name"];
    }
  }
});

export {
  require_go
};
//# sourceMappingURL=/build/_shared/chunk-XTLPZ6CG.js.map
