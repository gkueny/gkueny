import {
  require_java
} from "/build/_shared/chunk-ALLEOL22.js";
import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/scala.js
var require_scala = __commonJS({
  "node_modules/refractor/lang/scala.js"(exports, module) {
    var refractorJava = require_java();
    module.exports = scala;
    scala.displayName = "scala";
    scala.aliases = [];
    function scala(Prism) {
      Prism.register(refractorJava);
      Prism.languages.scala = Prism.languages.extend("java", {
        "triple-quoted-string": {
          pattern: /"""[\s\S]*?"""/,
          greedy: true,
          alias: "string"
        },
        string: {
          pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        keyword: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
        number: /\b0x(?:[\da-f]*\.)?[\da-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
        builtin: /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
        symbol: /'[^\d\s\\]\w*/
      });
      delete Prism.languages.scala["class-name"];
      delete Prism.languages.scala["function"];
    }
  }
});

export {
  require_scala
};
//# sourceMappingURL=/build/_shared/chunk-3Q2HQ4WP.js.map
