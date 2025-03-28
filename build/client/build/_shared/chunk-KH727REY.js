import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/groovy.js
var require_groovy = __commonJS({
  "node_modules/refractor/lang/groovy.js"(exports, module) {
    module.exports = groovy;
    groovy.displayName = "groovy";
    groovy.aliases = [];
    function groovy(Prism) {
      Prism.languages.groovy = Prism.languages.extend("clike", {
        string: [
          {
            // https://groovy-lang.org/syntax.html#_dollar_slashy_string
            pattern: /("""|''')(?:[^\\]|\\[\s\S])*?\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
            greedy: true
          },
          {
            // TODO: Slash strings (e.g. /foo/) can contain line breaks but this will cause a lot of trouble with
            // simple division (see JS regex), so find a fix maybe?
            pattern: /(["'/])(?:\\.|(?!\1)[^\\\r\n])*\1/,
            greedy: true
          }
        ],
        keyword: /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
        number: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
        operator: {
          pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
          lookbehind: true
        },
        punctuation: /\.+|[{}[\];(),:$]/
      });
      Prism.languages.insertBefore("groovy", "string", {
        shebang: {
          pattern: /#!.+/,
          alias: "comment"
        }
      });
      Prism.languages.insertBefore("groovy", "punctuation", {
        "spock-block": /\b(?:setup|given|when|then|and|cleanup|expect|where):/
      });
      Prism.languages.insertBefore("groovy", "function", {
        annotation: {
          pattern: /(^|[^.])@\w+/,
          lookbehind: true,
          alias: "punctuation"
        }
      });
      Prism.hooks.add("wrap", function(env) {
        if (env.language === "groovy" && env.type === "string") {
          var delimiter = env.content.value[0];
          if (delimiter != "'") {
            var pattern = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/;
            if (delimiter === "$") {
              pattern = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/;
            }
            env.content.value = env.content.value.replace(/&lt;/g, "<").replace(/&amp;/g, "&");
            env.content = Prism.highlight(env.content.value, {
              expression: {
                pattern,
                lookbehind: true,
                inside: Prism.languages.groovy
              }
            });
            env.classes.push(delimiter === "/" ? "regex" : "gstring");
          }
        }
      });
    }
  }
});

export {
  require_groovy
};
//# sourceMappingURL=/build/_shared/chunk-KH727REY.js.map
