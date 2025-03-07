import {
  require_php
} from "/build/_shared/chunk-2NWADT2B.js";
import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/php-extras.js
var require_php_extras = __commonJS({
  "node_modules/refractor/lang/php-extras.js"(exports, module) {
    var refractorPhp = require_php();
    module.exports = phpExtras;
    phpExtras.displayName = "phpExtras";
    phpExtras.aliases = [];
    function phpExtras(Prism) {
      Prism.register(refractorPhp);
      Prism.languages.insertBefore("php", "variable", {
        this: /\$this\b/,
        global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
        scope: {
          pattern: /\b[\w\\]+::/,
          inside: {
            keyword: /static|self|parent/,
            punctuation: /::|\\/
          }
        }
      });
    }
  }
});

export {
  require_php_extras
};
//# sourceMappingURL=/build/_shared/chunk-ZHQBY7XX.js.map
