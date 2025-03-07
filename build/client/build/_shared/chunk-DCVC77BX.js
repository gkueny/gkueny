import {
  Markdown_default,
  require_format,
  require_fr,
  require_prop_types
} from "/build/_shared/chunk-X4LC4ON2.js";
import {
  Link
} from "/build/_shared/chunk-5XN2AKVC.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-JR545TFC.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/Articles/List/List.js
var import_prop_types2 = __toESM(require_prop_types());

// app/components/Articles/List/Article/Article.js
var import_prop_types = __toESM(require_prop_types());
var import_format = __toESM(require_format());
var import_fr = __toESM(require_fr());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/Articles/List/Article/Article.js"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Articles/List/Article/Article.js"
  );
  import.meta.hot.lastModified = "1741379749279.208";
}
var Article = ({
  title,
  excerpt,
  slug,
  date,
  keywords = ""
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "max-w-xl rounded overflow-hidden shadow-lg border border-gray-200", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/${slug}`, className: "block px-6 py-4 hover:text-blue-800 ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-bold text-xl", children: title }, void 0, false, {
        fileName: "app/components/Articles/List/Article/Article.js",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      date && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-700 text-xs", children: [
        "Publi\xE9 le ",
        (0, import_format.default)(new Date(date), "dd MMMM yyyy", {
          locale: import_fr.default
        })
      ] }, void 0, true, {
        fileName: "app/components/Articles/List/Article/Article.js",
        lineNumber: 36,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-gray-900 text-base mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Markdown_default, { source: excerpt, escapeHtml: false }, void 0, false, {
        fileName: "app/components/Articles/List/Article/Article.js",
        lineNumber: 42,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/Articles/List/Article/Article.js",
        lineNumber: 41,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Articles/List/Article/Article.js",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4", children: keywords && keywords.split(",").map((keyword, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2", children: [
      "#",
      keyword
    ] }, i, true, {
      fileName: "app/components/Articles/List/Article/Article.js",
      lineNumber: 46,
      columnNumber: 62
    }, this)) }, void 0, false, {
      fileName: "app/components/Articles/List/Article/Article.js",
      lineNumber: 45,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Articles/List/Article/Article.js",
    lineNumber: 33,
    columnNumber: 10
  }, this);
};
_c = Article;
Article.propTypes = {
  title: import_prop_types.default.string.isRequired,
  excerpt: import_prop_types.default.string.isRequired,
  slug: import_prop_types.default.string.isRequired,
  date: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.object]).isRequired,
  keywords: import_prop_types.default.string
};
var Article_default = Article;
var _c;
$RefreshReg$(_c, "Article");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Articles/List/Article/index.js
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Articles/List/Article/index.js"
  );
  import.meta.hot.lastModified = "1741378420087.9746";
}
var Article_default2 = Article_default;

// app/components/Articles/List/List.js
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/Articles/List/List.js"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Articles/List/List.js"
  );
  import.meta.hot.lastModified = "1741379642762.74";
}
var ArticlesList = ({
  articles,
  withLink = true
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("ul", { className: "flex flex-col h-full justify-center py-12 px-1 lg:justify-start lg:py-24 lg:overflow-y-auto article-list", children: [
    articles.map((article) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("li", { className: "my-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Article_default2, { ...article }, void 0, false, {
      fileName: "app/components/Articles/List/List.js",
      lineNumber: 30,
      columnNumber: 11
    }, this) }, article.id, false, {
      fileName: "app/components/Articles/List/List.js",
      lineNumber: 29,
      columnNumber: 32
    }, this)),
    withLink && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("li", { className: "my-4 w-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { to: "/blog", className: "text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: " Voir tous mes articles" }, void 0, false, {
        fileName: "app/components/Articles/List/List.js",
        lineNumber: 34,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "fill-current h-6 ml-2", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M16,4.96C9.913,4.96,4.96,9.912,4.96,16S9.913,27.04,16,27.04S27.04,22.088,27.04,16S22.087,4.96,16,4.96z M16,25.12  c-5.028,0-9.12-4.092-9.12-9.12S10.972,6.88,16,6.88s9.12,4.092,9.12,9.12S21.028,25.12,16,25.12z" }, void 0, false, {
          fileName: "app/components/Articles/List/List.js",
          lineNumber: 36,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("polygon", { points: "13.098,11.368 17.966,16 13.098,20.632 14.421,22.022 20.753,16 14.421,9.977 " }, void 0, false, {
          fileName: "app/components/Articles/List/List.js",
          lineNumber: 37,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Articles/List/List.js",
        lineNumber: 35,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Articles/List/List.js",
      lineNumber: 33,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/Articles/List/List.js",
      lineNumber: 32,
      columnNumber: 20
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Articles/List/List.js",
    lineNumber: 28,
    columnNumber: 10
  }, this);
};
_c2 = ArticlesList;
ArticlesList.propTypes = {
  articles: import_prop_types2.default.array.isRequired,
  withLink: import_prop_types2.default.bool
};
var List_default = ArticlesList;
var _c2;
$RefreshReg$(_c2, "ArticlesList");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Articles/List/index.js
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Articles/List/index.js"
  );
  import.meta.hot.lastModified = "1741378420088.1882";
}
var List_default2 = List_default;

export {
  List_default2 as List_default
};
//# sourceMappingURL=/build/_shared/chunk-DCVC77BX.js.map
