import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/nand2tetris-hdl.js
var require_nand2tetris_hdl = __commonJS({
  "node_modules/refractor/lang/nand2tetris-hdl.js"(exports, module) {
    module.exports = nand2tetrisHdl;
    nand2tetrisHdl.displayName = "nand2tetrisHdl";
    nand2tetrisHdl.aliases = [];
    function nand2tetrisHdl(Prism) {
      Prism.languages["nand2tetris-hdl"] = {
        comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        keyword: /\b(?:CHIP|IN|OUT|PARTS|BUILTIN|CLOCKED)\b/,
        boolean: /\b(?:true|false)\b/,
        function: /\b[A-Za-z][A-Za-z0-9]*(?=\()/,
        number: /\b\d+\b/,
        operator: /=|\.\./,
        punctuation: /[{}[\];(),:]/
      };
    }
  }
});

export {
  require_nand2tetris_hdl
};
//# sourceMappingURL=/build/_shared/chunk-AFMIQVAY.js.map
