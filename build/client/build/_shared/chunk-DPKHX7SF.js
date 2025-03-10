import {
  require_c
} from "/build/_shared/chunk-SUOMF4KV.js";
import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/objectivec.js
var require_objectivec = __commonJS({
  "node_modules/refractor/lang/objectivec.js"(exports, module) {
    var refractorC = require_c();
    module.exports = objectivec;
    objectivec.displayName = "objectivec";
    objectivec.aliases = ["objc"];
    function objectivec(Prism) {
      Prism.register(refractorC);
      Prism.languages.objectivec = Prism.languages.extend("c", {
        string: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
        keyword: /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
        operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
      });
      delete Prism.languages.objectivec["class-name"];
      Prism.languages.objc = Prism.languages.objectivec;
    }
  }
});

export {
  require_objectivec
};
//# sourceMappingURL=/build/_shared/chunk-DPKHX7SF.js.map
