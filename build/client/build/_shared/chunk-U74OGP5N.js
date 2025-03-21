import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/http.js
var require_http = __commonJS({
  "node_modules/refractor/lang/http.js"(exports, module) {
    module.exports = http;
    http.displayName = "http";
    http.aliases = [];
    function http(Prism) {
      ;
      (function(Prism2) {
        Prism2.languages.http = {
          "request-line": {
            pattern: /^(?:GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\s(?:https?:\/\/|\/)\S*\sHTTP\/[0-9.]+/m,
            inside: {
              // HTTP Method
              method: {
                pattern: /^[A-Z]+\b/,
                alias: "property"
              },
              // Request Target e.g. http://example.com, /path/to/file
              "request-target": {
                pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
                lookbehind: true,
                alias: "url",
                inside: Prism2.languages.uri
              },
              // HTTP Version
              "http-version": {
                pattern: /^(\s)HTTP\/[0-9.]+/,
                lookbehind: true,
                alias: "property"
              }
            }
          },
          "response-status": {
            pattern: /^HTTP\/[0-9.]+ \d+ .+/m,
            inside: {
              // HTTP Version
              "http-version": {
                pattern: /^HTTP\/[0-9.]+/,
                alias: "property"
              },
              // Status Code
              "status-code": {
                pattern: /^(\s)\d+(?=\s)/,
                lookbehind: true,
                alias: "number"
              },
              // Reason Phrase
              "reason-phrase": {
                pattern: /^(\s).+/,
                lookbehind: true,
                alias: "string"
              }
            }
          },
          // HTTP header name
          "header-name": {
            pattern: /^[\w-]+:(?=.)/m,
            alias: "keyword"
          }
        };
        var langs = Prism2.languages;
        var httpLanguages = {
          "application/javascript": langs.javascript,
          "application/json": langs.json || langs.javascript,
          "application/xml": langs.xml,
          "text/xml": langs.xml,
          "text/html": langs.html,
          "text/css": langs.css
        };
        var suffixTypes = {
          "application/json": true,
          "application/xml": true
        };
        function getSuffixPattern(contentType2) {
          var suffix = contentType2.replace(/^[a-z]+\//, "");
          var suffixPattern = "\\w+/(?:[\\w.-]+\\+)+" + suffix + "(?![+\\w.-])";
          return "(?:" + contentType2 + "|" + suffixPattern + ")";
        }
        var options;
        for (var contentType in httpLanguages) {
          if (httpLanguages[contentType]) {
            options = options || {};
            var pattern = suffixTypes[contentType] ? getSuffixPattern(contentType) : contentType;
            options[contentType.replace(/\//g, "-")] = {
              pattern: RegExp(
                "(content-type:\\s*" + pattern + "(?:(?:\\r\\n?|\\n).+)*)(?:\\r?\\n|\\r){2}[\\s\\S]*",
                "i"
              ),
              lookbehind: true,
              inside: httpLanguages[contentType]
            };
          }
        }
        if (options) {
          Prism2.languages.insertBefore("http", "header-name", options);
        }
      })(Prism);
    }
  }
});

export {
  require_http
};
//# sourceMappingURL=/build/_shared/chunk-U74OGP5N.js.map
