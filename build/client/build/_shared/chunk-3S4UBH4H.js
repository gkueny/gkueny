import {
  require_markup_templating
} from "/build/_shared/chunk-FDPXNRAA.js";
import {
  require_ruby
} from "/build/_shared/chunk-A6EO4D5P.js";
import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/erb.js
var require_erb = __commonJS({
  "node_modules/refractor/lang/erb.js"(exports, module) {
    var refractorRuby = require_ruby();
    var refractorMarkupTemplating = require_markup_templating();
    module.exports = erb;
    erb.displayName = "erb";
    erb.aliases = [];
    function erb(Prism) {
      Prism.register(refractorRuby);
      Prism.register(refractorMarkupTemplating);
      (function(Prism2) {
        Prism2.languages.erb = Prism2.languages.extend("ruby", {});
        Prism2.languages.insertBefore("erb", "comment", {
          delimiter: {
            pattern: /^<%=?|%>$/,
            alias: "punctuation"
          }
        });
        Prism2.hooks.add("before-tokenize", function(env) {
          var erbPattern = /<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/gm;
          Prism2.languages["markup-templating"].buildPlaceholders(
            env,
            "erb",
            erbPattern
          );
        });
        Prism2.hooks.add("after-tokenize", function(env) {
          Prism2.languages["markup-templating"].tokenizePlaceholders(env, "erb");
        });
      })(Prism);
    }
  }
});

export {
  require_erb
};
//# sourceMappingURL=/build/_shared/chunk-3S4UBH4H.js.map
