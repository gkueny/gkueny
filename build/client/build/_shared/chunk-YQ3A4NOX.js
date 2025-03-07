import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/csp.js
var require_csp = __commonJS({
  "node_modules/refractor/lang/csp.js"(exports, module) {
    module.exports = csp;
    csp.displayName = "csp";
    csp.aliases = [];
    function csp(Prism) {
      Prism.languages.csp = {
        directive: {
          pattern: /(^|[^-\da-z])(?:base-uri|block-all-mixed-content|(?:child|connect|default|font|frame|img|manifest|media|object|prefetch|script|style|worker)-src|disown-opener|form-action|frame-(?:ancestors|options)|input-protection(?:-(?:clip|selectors))?|navigate-to|plugin-types|policy-uri|referrer|reflected-xss|report-(?:to|uri)|require-sri-for|sandbox|(?:script|style)-src-(?:attr|elem)|upgrade-insecure-requests)(?=[^-\da-z]|$)/i,
          lookbehind: true,
          alias: "keyword"
        },
        safe: {
          // CSP2 hashes and nonces are base64 values. CSP3 accepts both base64 and base64url values.
          // See https://tools.ietf.org/html/rfc4648#section-4
          // See https://tools.ietf.org/html/rfc4648#section-5
          pattern: /'(?:deny|none|report-sample|self|strict-dynamic|top-only|(?:nonce|sha(?:256|384|512))-[-+/\w=]+)'/i,
          alias: "selector"
        },
        unsafe: {
          pattern: /(?:'unsafe-(?:allow-redirects|dynamic|eval|hash-attributes|hashed-attributes|hashes|inline)'|\*)/i,
          alias: "function"
        }
      };
    }
  }
});

export {
  require_csp
};
//# sourceMappingURL=/build/_shared/chunk-YQ3A4NOX.js.map
