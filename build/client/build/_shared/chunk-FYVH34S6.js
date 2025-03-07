import {
  require_prop_types
} from "/build/_shared/chunk-X4LC4ON2.js";
import {
  Link
} from "/build/_shared/chunk-5XN2AKVC.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  createHotContext
} from "/build/_shared/chunk-JR545TFC.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/images/profil-blog.webp
var profil_blog_default = "/build/_assets/profil-blog-2JWAGG2G.webp";

// app/components/Layout/Header/Header.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/Layout/Header/Header.js"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Layout/Header/Header.js"
  );
  import.meta.hot.lastModified = "1741379642775.8477";
}
var Header = ({
  title = null,
  breadcrumb = []
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { className: "flex flex-col py-4 px-6 justify-center header lg:px-0", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-1 items-center justify-start max-w-3xl w-full mx-auto", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("meta", { name: "name", content: "Accueil" }, void 0, false, {
          fileName: "app/components/Layout/Header/Header.js",
          lineNumber: 32,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { width: "48", height: "48", sizes: "(min-width: 48px) 48px, 100vw", src: profil_blog_default, className: "w-12 h-12 mr-6 rounded-full", alt: "gkueny" }, void 0, false, {
          fileName: "app/components/Layout/Header/Header.js",
          lineNumber: 33,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Layout/Header/Header.js",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      breadcrumb.map((path, i) => {
        if (i === breadcrumb.length - 1 && !title) {
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-2xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-gray-900 leading-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: path.link, className: "hover:text-blue-800 hover:underline", children: path.title }, void 0, false, {
            fileName: "app/components/Layout/Header/Header.js",
            lineNumber: 40,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/components/Layout/Header/Header.js",
            lineNumber: 39,
            columnNumber: 17
          }, this) }, i, false, {
            fileName: "app/components/Layout/Header/Header.js",
            lineNumber: 38,
            columnNumber: 18
          }, this);
        }
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-2xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-gray-900 leading-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: path.link, className: "hover:text-blue-800 hover:underline", children: path.title }, void 0, false, {
            fileName: "app/components/Layout/Header/Header.js",
            lineNumber: 49,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/components/Layout/Header/Header.js",
            lineNumber: 48,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/Layout/Header/Header.js",
            lineNumber: 47,
            columnNumber: 15
          }, this),
          i < breadcrumb.length - 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-2", children: "-" }, void 0, false, {
            fileName: "app/components/Layout/Header/Header.js",
            lineNumber: 54,
            columnNumber: 45
          }, this)
        ] }, i, true, {
          fileName: "app/components/Layout/Header/Header.js",
          lineNumber: 46,
          columnNumber: 16
        }, this);
      })
    ] }, void 0, true, {
      fileName: "app/components/Layout/Header/Header.js",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    title && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-3xl w-full mx-auto pb-4 pt-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl text-gray-900 leading-none", children: title }, void 0, false, {
      fileName: "app/components/Layout/Header/Header.js",
      lineNumber: 59,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/Layout/Header/Header.js",
      lineNumber: 58,
      columnNumber: 17
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Layout/Header/Header.js",
    lineNumber: 29,
    columnNumber: 10
  }, this);
};
_c = Header;
Header.propTypes = {
  title: import_prop_types.default.string,
  breadcrumb: import_prop_types.default.arrayOf(import_prop_types.default.shape({
    title: import_prop_types.default.string.isRequired,
    link: import_prop_types.default.string.isRequired
  }))
};
var Header_default = Header;
var _c;
$RefreshReg$(_c, "Header");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Layout/Header/index.js
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Layout/Header/index.js"
  );
  import.meta.hot.lastModified = "1741378420089.076";
}
var Header_default2 = Header_default;

export {
  profil_blog_default,
  Header_default2 as Header_default
};
//# sourceMappingURL=/build/_shared/chunk-FYVH34S6.js.map
