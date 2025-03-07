import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/actionscript.js
var require_actionscript = __commonJS({
  "node_modules/refractor/lang/actionscript.js"(exports, module) {
    module.exports = actionscript;
    actionscript.displayName = "actionscript";
    actionscript.aliases = [];
    function actionscript(Prism) {
      Prism.languages.actionscript = Prism.languages.extend("javascript", {
        keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|override|set|static)\b/,
        operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
      });
      Prism.languages.actionscript["class-name"].alias = "function";
      if (Prism.languages.markup) {
        Prism.languages.insertBefore("actionscript", "string", {
          xml: {
            pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
            lookbehind: true,
            inside: Prism.languages.markup
          }
        });
      }
    }
  }
});

export {
  require_actionscript
};
//# sourceMappingURL=/build/_shared/chunk-CYJP4XMH.js.map
