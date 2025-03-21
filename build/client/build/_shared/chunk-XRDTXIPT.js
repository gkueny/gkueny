import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/latex.js
var require_latex = __commonJS({
  "node_modules/refractor/lang/latex.js"(exports, module) {
    module.exports = latex;
    latex.displayName = "latex";
    latex.aliases = ["tex", "context"];
    function latex(Prism) {
      ;
      (function(Prism2) {
        var funcPattern = /\\(?:[^a-z()[\]]|[a-z*]+)/i;
        var insideEqu = {
          "equation-command": {
            pattern: funcPattern,
            alias: "regex"
          }
        };
        Prism2.languages.latex = {
          comment: /%.*/m,
          // the verbatim environment prints whitespace to the document
          cdata: {
            pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
            lookbehind: true
          },
          /*
           * equations can be between $$ $$ or $ $ or \( \) or \[ \]
           * (all are multiline)
           */
          equation: [
            {
              pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
              inside: insideEqu,
              alias: "string"
            },
            {
              pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
              lookbehind: true,
              inside: insideEqu,
              alias: "string"
            }
          ],
          /*
           * arguments which are keywords or references are highlighted
           * as keywords
           */
          keyword: {
            pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
            lookbehind: true
          },
          url: {
            pattern: /(\\url\{)[^}]+(?=\})/,
            lookbehind: true
          },
          /*
           * section or chapter headlines are highlighted as bold so that
           * they stand out more
           */
          headline: {
            pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
            lookbehind: true,
            alias: "class-name"
          },
          function: {
            pattern: funcPattern,
            alias: "selector"
          },
          punctuation: /[[\]{}&]/
        };
        Prism2.languages.tex = Prism2.languages.latex;
        Prism2.languages.context = Prism2.languages.latex;
      })(Prism);
    }
  }
});

export {
  require_latex
};
//# sourceMappingURL=/build/_shared/chunk-XRDTXIPT.js.map
