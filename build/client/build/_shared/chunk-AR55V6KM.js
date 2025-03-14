import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/birb.js
var require_birb = __commonJS({
  "node_modules/refractor/lang/birb.js"(exports, module) {
    module.exports = birb;
    birb.displayName = "birb";
    birb.aliases = [];
    function birb(Prism) {
      Prism.languages.birb = Prism.languages.extend("clike", {
        string: {
          pattern: /r?("|')(?:\\.|(?!\1)[^\\])*\1/,
          greedy: true
        },
        "class-name": [
          /\b[A-Z](?:[\d_]*[a-zA-Z]\w*)?\b/,
          // matches variable and function return types (parameters as well).
          /\b[A-Z]\w*(?=\s+\w+\s*[;,=()])/
        ],
        keyword: /\b(?:assert|break|case|class|const|default|else|enum|final|follows|for|grab|if|nest|next|new|noSeeb|return|static|switch|throw|var|void|while)\b/,
        operator: /\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?|:/,
        variable: /\b[a-z_]\w*\b/
      });
      Prism.languages.insertBefore("birb", "function", {
        metadata: {
          pattern: /<\w+>/,
          greedy: true,
          alias: "symbol"
        }
      });
    }
  }
});

export {
  require_birb
};
//# sourceMappingURL=/build/_shared/chunk-AR55V6KM.js.map
