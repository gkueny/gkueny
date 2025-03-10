import {
  require_php
} from "/build/_shared/chunk-2NWADT2B.js";
import {
  require_javadoclike
} from "/build/_shared/chunk-MN5IJP33.js";
import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/phpdoc.js
var require_phpdoc = __commonJS({
  "node_modules/refractor/lang/phpdoc.js"(exports, module) {
    var refractorPhp = require_php();
    var refractorJavadoclike = require_javadoclike();
    module.exports = phpdoc;
    phpdoc.displayName = "phpdoc";
    phpdoc.aliases = [];
    function phpdoc(Prism) {
      Prism.register(refractorPhp);
      Prism.register(refractorJavadoclike);
      (function(Prism2) {
        var typeExpression = /(?:\b[a-zA-Z]\w*|[|\\[\]])+/.source;
        Prism2.languages.phpdoc = Prism2.languages.extend("javadoclike", {
          parameter: {
            pattern: RegExp(
              "(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:" + typeExpression + "\\s+)?)\\$\\w+"
            ),
            lookbehind: true
          }
        });
        Prism2.languages.insertBefore("phpdoc", "keyword", {
          "class-name": [
            {
              pattern: RegExp(
                "(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)" + typeExpression
              ),
              lookbehind: true,
              inside: {
                keyword: /\b(?:callback|resource|boolean|integer|double|object|string|array|false|float|mixed|bool|null|self|true|void|int)\b/,
                punctuation: /[|\\[\]()]/
              }
            }
          ]
        });
        Prism2.languages.javadoclike.addSupport("php", Prism2.languages.phpdoc);
      })(Prism);
    }
  }
});

export {
  require_phpdoc
};
//# sourceMappingURL=/build/_shared/chunk-GPUCKBX3.js.map
