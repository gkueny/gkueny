import {
  require_turtle
} from "/build/_shared/chunk-GBHPM4GS.js";
import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/sparql.js
var require_sparql = __commonJS({
  "node_modules/refractor/lang/sparql.js"(exports, module) {
    var refractorTurtle = require_turtle();
    module.exports = sparql;
    sparql.displayName = "sparql";
    sparql.aliases = ["rq"];
    function sparql(Prism) {
      Prism.register(refractorTurtle);
      Prism.languages.sparql = Prism.languages.extend("turtle", {
        boolean: /\b(?:true|false)\b/i,
        variable: {
          pattern: /[?$]\w+/,
          greedy: true
        }
      });
      Prism.languages.insertBefore("sparql", "punctuation", {
        keyword: [
          /\b(?:A|ADD|ALL|AS|ASC|ASK|BNODE|BY|CLEAR|CONSTRUCT|COPY|CREATE|DATA|DEFAULT|DELETE|DESC|DESCRIBE|DISTINCT|DROP|EXISTS|FILTER|FROM|GROUP|HAVING|INSERT|INTO|LIMIT|LOAD|MINUS|MOVE|NAMED|NOT|NOW|OFFSET|OPTIONAL|ORDER|RAND|REDUCED|SELECT|SEPARATOR|SERVICE|SILENT|STRUUID|UNION|USING|UUID|VALUES|WHERE)\b/i,
          /\b(?:ABS|AVG|BIND|BOUND|CEIL|COALESCE|CONCAT|CONTAINS|COUNT|DATATYPE|DAY|ENCODE_FOR_URI|FLOOR|GROUP_CONCAT|HOURS|IF|IRI|isBLANK|isIRI|isLITERAL|isNUMERIC|isURI|LANG|LANGMATCHES|LCASE|MAX|MD5|MIN|MINUTES|MONTH|ROUND|REGEX|REPLACE|sameTerm|SAMPLE|SECONDS|SHA1|SHA256|SHA384|SHA512|STR|STRAFTER|STRBEFORE|STRDT|STRENDS|STRLANG|STRLEN|STRSTARTS|SUBSTR|SUM|TIMEZONE|TZ|UCASE|URI|YEAR)\b(?=\s*\()/i,
          /\b(?:GRAPH|BASE|PREFIX)\b/i
        ]
      });
      Prism.languages.rq = Prism.languages.sparql;
    }
  }
});

export {
  require_sparql
};
//# sourceMappingURL=/build/_shared/chunk-UNBM6ITG.js.map
