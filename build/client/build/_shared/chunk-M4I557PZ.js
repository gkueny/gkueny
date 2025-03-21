import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/processing.js
var require_processing = __commonJS({
  "node_modules/refractor/lang/processing.js"(exports, module) {
    module.exports = processing;
    processing.displayName = "processing";
    processing.aliases = [];
    function processing(Prism) {
      Prism.languages.processing = Prism.languages.extend("clike", {
        keyword: /\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
        operator: /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/
      });
      Prism.languages.insertBefore("processing", "number", {
        // Special case: XML is a type
        constant: /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
        type: {
          pattern: /\b(?:boolean|byte|char|color|double|float|int|[A-Z]\w*)\b/,
          alias: "variable"
        }
      });
      Prism.languages.processing["function"] = /\b\w+(?=\s*\()/;
      Prism.languages.processing["class-name"].alias = "variable";
    }
  }
});

export {
  require_processing
};
//# sourceMappingURL=/build/_shared/chunk-M4I557PZ.js.map
