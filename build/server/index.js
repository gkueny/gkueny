import { jsx, jsxs } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, Link, useLoaderData } from "@remix-run/react";
import PropTypes from "prop-types";
import React from "react";
import format from "date-fns/format/index.js";
import locale from "date-fns/locale/fr/index.js";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
import createSlug from "slug";
import fs from "fs";
import matter from "gray-matter";
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = renderToString(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url })
  );
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const styles = "/assets/app-qKdgO1Bk.css";
function meta$2() {
  const title = "Gaëtan Kueny";
  const author = "@gkueny";
  const description = "Développeur depuis maintenant 8 ans et à mon compte depuis 3 ans, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur le développement mobile avec react-native et le développement backend Symfony / php.";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "author",
      content: author
    },
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "twitter:card",
      content: "summary"
    },
    {
      property: "twitter:creator",
      content: author
    },
    {
      property: "twitter:title",
      content: title
    },
    {
      property: "twitter:description",
      content: description
    }
  ];
}
function links$3() {
  return [{ rel: "stylesheet", href: styles }];
}
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      process.env.NODE_ENV === "production" && /* @__PURE__ */ jsx("script", { async: true, src: "https://cdn.splitbee.io/sb.js" })
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links: links$3,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const Layout = ({ children, header, footer, padding = false }) => {
  return /* @__PURE__ */ jsxs("div", { className: padding ? "pt-4 pb-16" : "", children: [
    header,
    /* @__PURE__ */ jsx("main", { children }),
    footer
  ] });
};
Layout.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  padding: PropTypes.bool,
  children: PropTypes.node.isRequired
};
const getLanguage = (children) => {
  var _a, _b, _c, _d, _e, _f, _g;
  if (!children || !children[0]) {
    return null;
  }
  if (!((_a = children[0]) == null ? void 0 : _a.type) === "code") {
    return null;
  }
  if (!((_d = (_c = (_b = children[0]) == null ? void 0 : _b.props) == null ? void 0 : _c.className) == null ? void 0 : _d.includes("language-"))) {
    return null;
  }
  return (_g = (_f = (_e = children[0]) == null ? void 0 : _e.props) == null ? void 0 : _f.className) == null ? void 0 : _g.split("language-")[1];
};
const MarkdownCodeRender = ({ children }) => {
  const language = getLanguage(children);
  if (!language) {
    return /* @__PURE__ */ jsx("blockquote", { className: "py-1 px-4 bg-neutral-100 text-red-600 border-l-4 border-neutral-500 italic quote relative text-xl my-4", children });
  }
  return /* @__PURE__ */ jsx(Prism, { language, style: atomDark, children: children[0].props.children });
};
const MarkdownInlineCodeRender = ({ inline, children }) => {
  if (!inline) {
    return children;
  }
  return /* @__PURE__ */ jsx("span", { className: "text-red-600 font-bold", children });
};
MarkdownInlineCodeRender.propTypes = {
  inline: PropTypes.bool
};
const MarkdownHeadingRender = ({ level, children }) => {
  switch (level) {
    case 1:
      return /* @__PURE__ */ jsx("h1", { className: "text-black font-bold text-4xl mb-8 mt-10", children });
    case 2:
      return /* @__PURE__ */ jsx("h2", { className: "text-black font-bold text-3xl mb-8 mt-10", children });
    case 3:
      return /* @__PURE__ */ jsx("h3", { className: "text-black font-bold text-2xl mb-6 mt-8", children });
    default:
      return /* @__PURE__ */ jsx("h4", { className: "text-black font-bold text-xl mb-4 mt-6", children });
  }
};
MarkdownHeadingRender.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.array.isRequired
};
const MarkdownParagraphRender = ({ children }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  if (children.length === 1 && ((_b = (_a = children[0]) == null ? void 0 : _a.props) == null ? void 0 : _b.alt) && ((_d = (_c = children[0]) == null ? void 0 : _c.props) == null ? void 0 : _d.src) && ((_f = (_e = children[0]) == null ? void 0 : _e.props) == null ? void 0 : _f.src.includes(".mp4"))) {
    return /* @__PURE__ */ jsx("div", { className: "article-video article-image--gatsby text-grey-darker text-lg mt-2", children });
  }
  if (children.length === 1 && ((_h = (_g = children[0]) == null ? void 0 : _g.props) == null ? void 0 : _h.alt) && ((_j = (_i = children[0]) == null ? void 0 : _i.props) == null ? void 0 : _j.src) && !((_l = (_k = children[0]) == null ? void 0 : _k.props) == null ? void 0 : _l.src.includes("http"))) {
    return /* @__PURE__ */ jsx("div", { className: "article-image article-image--gatsby text-grey-darker text-lg mt-2", children });
  }
  if (children.length === 1 && ((_n = (_m = children[0]) == null ? void 0 : _m.props) == null ? void 0 : _n.alt) && ((_p = (_o = children[0]) == null ? void 0 : _o.props) == null ? void 0 : _p.src)) {
    return /* @__PURE__ */ jsx("div", { className: "article-image flex justify-center text-grey-darker text-lg mt-2", children });
  }
  return /* @__PURE__ */ jsx("p", { className: "text-grey-darker text-lg mt-2", children });
};
MarkdownParagraphRender.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired
};
const MarkdownListRender = ({ children }) => {
  return /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside text-grey-darker text-lg", children });
};
MarkdownListRender.propTypes = {
  children: PropTypes.array.isRequired
};
const MarkdownBlockQuotehRender = ({ children }) => {
  return /* @__PURE__ */ jsx("blockquote", { className: "py-1 px-4 bg-neutral-100 text-grey-darker border-l-4 border-neutral-500 italic quote relative text-xl my-4", children });
};
MarkdownBlockQuotehRender.propTypes = {
  children: PropTypes.array.isRequired
};
const MarkdownLinkRender = ({ href, children }) => {
  if (href && href[0] === "/") {
    return /* @__PURE__ */ jsx(
      Link,
      {
        to: href,
        className: "text-lg text-blue-700 hover:text-blue-800 hover:underline",
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      target: "_blank",
      rel: "noopener noreferrer",
      href,
      className: "text-lg text-blue-700 hover:text-blue-800 hover:underline",
      children
    }
  );
};
MarkdownLinkRender.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
};
const Video = ({ url, title }) => /* @__PURE__ */ jsx("video", { controls: true, autoPlay: true, muted: true, loop: true, className: "video", children: /* @__PURE__ */ jsx("source", { src: url, title, type: "video/mp4" }) });
Video.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string
};
const MarkdownImageRender = ({ baseArticleUrl, src, alt = "" }) => {
  if (src.includes(".mp4")) {
    return /* @__PURE__ */ jsx(Video, { url: `${baseArticleUrl}/${src}`, title: alt });
  }
  return /* @__PURE__ */ jsxs("div", { className: "article-image article-image--gatsby text-grey-darker text-lg mt-2", children: [
    /* @__PURE__ */ jsx("img", { src: `${baseArticleUrl}/${src}`, alt }),
    /* @__PURE__ */ jsx("span", { className: "italic text-base", children: alt })
  ] });
};
MarkdownImageRender.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  markdownImage: PropTypes.object,
  markdownVideo: PropTypes.object
};
const assetRenderer = (baseArticleUrl) => (props) => {
  return /* @__PURE__ */ jsx(MarkdownImageRender, { ...props, baseArticleUrl });
};
const Markdown = ({ source, baseArticleUrl }) => {
  return /* @__PURE__ */ jsx(
    ReactMarkdown,
    {
      rehypePlugins: [rehypeRaw],
      components: {
        pre: MarkdownCodeRender,
        code: MarkdownInlineCodeRender,
        h1: MarkdownHeadingRender,
        h2: MarkdownHeadingRender,
        h3: MarkdownHeadingRender,
        h4: MarkdownHeadingRender,
        h5: MarkdownHeadingRender,
        h6: MarkdownHeadingRender,
        p: MarkdownParagraphRender,
        ul: MarkdownListRender,
        blockquote: MarkdownBlockQuotehRender,
        a: MarkdownLinkRender,
        img: assetRenderer(baseArticleUrl),
        gif: assetRenderer(baseArticleUrl),
        video: assetRenderer(baseArticleUrl)
      },
      children: source
    }
  );
};
const Article$1 = ({ title, excerpt, slug, date, keywords = "" }) => {
  return /* @__PURE__ */ jsxs("section", { className: "max-w-xl rounded overflow-hidden shadow-lg border border-gray-200", children: [
    /* @__PURE__ */ jsxs(Link, { to: `/${slug}`, className: "block px-6 py-4 hover:text-blue-800 ", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl", children: title }),
      date && /* @__PURE__ */ jsxs("span", { className: "text-gray-700 text-xs", children: [
        "Publié le ",
        format(new Date(date), "dd MMMM yyyy", { locale })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-gray-900 text-base mt-2", children: /* @__PURE__ */ jsx(Markdown, { source: excerpt, escapeHtml: false }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-6 py-4", children: keywords && keywords.split(",").map((keyword, i) => /* @__PURE__ */ jsxs(
      "span",
      {
        className: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2",
        children: [
          "#",
          keyword
        ]
      },
      i
    )) })
  ] });
};
Article$1.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  keywords: PropTypes.string
};
const ArticlesList = ({ articles, withLink = true }) => {
  return /* @__PURE__ */ jsxs("ul", { className: "flex flex-col h-full justify-center py-12 px-1 lg:justify-start lg:py-24 lg:overflow-y-auto article-list", children: [
    articles.map((article) => /* @__PURE__ */ jsx("li", { className: "my-4", children: /* @__PURE__ */ jsx(Article$1, { ...article }) }, article.id)),
    withLink && /* @__PURE__ */ jsx("li", { className: "my-4 w-auto", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/blog",
        className: "text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsx("span", { children: " Voir tous mes articles" }),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "fill-current h-6 ml-2",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 32 32",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M16,4.96C9.913,4.96,4.96,9.912,4.96,16S9.913,27.04,16,27.04S27.04,22.088,27.04,16S22.087,4.96,16,4.96z M16,25.12  c-5.028,0-9.12-4.092-9.12-9.12S10.972,6.88,16,6.88s9.12,4.092,9.12,9.12S21.028,25.12,16,25.12z" }),
                /* @__PURE__ */ jsx("polygon", { points: "13.098,11.368 17.966,16 13.098,20.632 14.421,22.022 20.753,16 14.421,9.977 " })
              ]
            }
          )
        ]
      }
    ) })
  ] });
};
ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired,
  withLink: PropTypes.bool
};
const Profile = "/assets/profil-index-h9FvRa4A.webp";
const Profil$1 = ({ name, company, companyLink, hashtags, articles = null }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full py-12 lg:h-screen lg:flex-row lg:py-0", children: [
    /* @__PURE__ */ jsxs("section", { className: "flex flex-1 items-center justify-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          width: "200",
          height: "200",
          "data-main-image": "",
          sizes: "(min-width: 200px) 200px, 100vw",
          decoding: "async",
          src: Profile,
          alt: "gkueny",
          className: "w-12 h-12 mr-1 px-1 lg:px-0 lg:w-48 lg:h-48 lg:mr-6 rounded-full"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "text-4xl", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-gray-900 leading-relaxed", children: [
          name,
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-2xl text-blue-500 hover:text-blue-800", children: /* @__PURE__ */ jsx("a", { target: "_blank", href: companyLink, rel: "noopener noreferrer", children: company }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-gray-600", children: hashtags.map((hashtag) => `#${hashtag} `) })
      ] })
    ] }),
    articles && /* @__PURE__ */ jsx("section", { className: "flex flex-1 flex-col items-center justify-center", children: /* @__PURE__ */ jsx(ArticlesList, { articles }) })
  ] });
};
Profil$1.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  companyLink: PropTypes.string.isRequired,
  hashtags: PropTypes.arrayOf(PropTypes.string.isRequired),
  articles: ArticlesList.propTypes.articles
};
const fetchArticle = async (slug) => {
  const articlesFilesNames = await fs.readdirSync(
    `${process.cwd()}/public/blog/articles`
  );
  const articleFileName = articlesFilesNames.find(
    (articlesFileName) => articlesFileName.split(".")[1] === slug
  );
  if (!articleFileName) {
    return null;
  }
  const index = parseInt(articleFileName.split(".")[0], 10);
  const file = fs.readFileSync(
    `${process.cwd()}/public/blog/articles/${articleFileName}`
  );
  return { article: matter(file.toString()), index };
};
const fetchArticles = async () => {
  const articlesFilesNames = await fs.readdirSync(
    `${process.cwd()}/public/blog/articles`
  );
  const articlesFilesNamesOrdered = articlesFilesNames.sort((a, b) => {
    const numberA = parseInt(a.split(".")[0], 10);
    const numberB = parseInt(b.split(".")[0], 10);
    return numberA - numberB;
  });
  const articlesFiles = await Promise.all(
    articlesFilesNamesOrdered.map(async (articleFileName) => {
      return new Promise((res) => {
        fs.readFile(
          `${process.cwd()}/public/blog/articles/${articleFileName}`,
          (_, data) => {
            const parsedFile = matter(data.toString());
            res(parsedFile);
          }
        );
      });
    })
  );
  return articlesFiles;
};
const getSlug = (title) => {
  return createSlug(title).toLowerCase();
};
const formatArticle = (article, index) => {
  const contentSlug = getSlug(article.data.title);
  return {
    id: contentSlug,
    title: article.data.title,
    date: new Date(article.data.date),
    slug: contentSlug,
    excerpt: article.data.excerpt,
    keywords: article.data.keywords,
    credit: article.data.credit ? article.data.credit : null,
    content: article.content,
    baseArticleUrl: "/assets"
  };
};
const getArticles = async () => {
  const articles = await fetchArticles();
  return articles.map((article, index) => {
    return formatArticle(article);
  }).reverse();
};
const getArticle = async (slug) => {
  const response = await fetchArticle(slug);
  if (!response || !response.article) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  return formatArticle(response.article, response.index);
};
function headers$2() {
  return {
    "Cache-Control": "max-age=43200, stale-while-revalidate=43200, s-maxage=86400"
  };
}
const links$2 = () => {
  return [
    { page: "/blog" },
    {
      rel: "preload",
      href: Profile,
      as: "image"
    }
  ];
};
let loader$2 = async () => {
  const articles = await getArticles();
  return {
    articles: articles.slice(0, 2)
  };
};
function Index$1() {
  const { articles } = useLoaderData();
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(
    Profil$1,
    {
      name: "gkueny",
      company: "- Lead mobile developer @ZETurf",
      companyLink: "https://apps.apple.com/fr/app/zeturf-paris-hippiques-turf/id1516592235",
      hashtags: ["react-native", "react", "symfony", "typescript"],
      articles
    }
  ) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1,
  headers: headers$2,
  links: links$2,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const ProfilHeaderBlog = "data:image/webp;base64,UklGRnIFAABXRUJQVlA4IGYFAADwGwCdASpgAGAAPtFYpE2oJS+pLjQLmfAaCWIAxYSwUh/N79BLhff2+jNe2vfvf4YfAXWY7OUAr8nlu/3+/npkam5K+scY0Ur7dcBNWJLKqBEms2kj24u9/p3jE/8ZY2bobEPWM/azNI9DRfjQUFO6TchuYbSphkcF+dse/yfEZUWodq6c+YsM/M9C8eOAm4BATVdQpX0AXimPNblLuzlFQaodszoAvlaRkOZrGb34H7vVI1v8p5h9DlwXUw/9UTL5GHBW/taskBGrnZJhBDpW3gDHxDm7irE0vVnoX3Cdggu20/Wy3UYAAP7fUMUhsFf/cEwsF23684EXi1j0ni33wr7RAZcueYKNjHmj6Ecsy+5FuuKUd0X+mJPCkMgTXJ8rOD54+zQTT2rhaa5PqbqTSlPXpVra6w8Dl/lf17jf2Hkr6MWttgqsxJl9q7Tp2NixJTtRR74xwvTU4pZG8MM+7b/tCA39apghVyVo7kCoPuQGnualtI6+PWdvcQMDytYQeoSc0kTt2b1C4THXZ5iGtiAo6nfH/ku820evJBd7vy+wc4/ou+XbOpLRX+LbDduBM6g2rgjy3v6FIOxQapEAcsEbh6MGVrT1KdcVqmjEBksLKYLW53wrd61vHYf1VmteyJf+ygdoqXQirBHw/SmR6HPKVQAZGTDpaT+kfa1CnzSRYfcQ3CB/SJxI4d5kDPLoXI/5HIM9JyN9Hm0duBi2wGJUhEEIEmU/k57bOpLl6GFxZ59xWF0Es29zVhYDKLwSAYPPupakGteBYhVnKbLu2oJ95IXLKLSf7gNMVPjATJC+vObWx2iYrtm271NsEInYO+ZE89ZqRDEEU4EnOI337UF6EVhQw68LG4UspU5QLYr0emHRL60oMsMZJPLcY2jF+rfODpZJew4fgChMpcS3kOf1MR90wNWes6IiolE3mffXyqaJVzj0RR3B7AM/0xOaSbVaMLPhyOO/gZShjGJqJ9d+QEjTml1UvT5KKOFpZa87DesKXkU9cx7Nb+T3jqvpJgc4aW4plPdpbbimFzEJhn3DNJUQurwS8lVMaPtP+IabvIIZZZti/iFJOhBQnH1vR0BU+BJmktBZSolZ8MQAnRGY180lLgMZpzvuDgo2k+beWIgR+MOPk+xfJOobg9yPiJLjAe+6NfkJaOC79N0/9ZDtG03z4JufZ/jQ1eJSokem1nFckYFOGkZG9feVMrqbFVz4GvifKvM5l2ablz1KIwdiUEntZE3BQxg8w5lniDSUKEeXe9JhOqzc/zuj7WlGZ1FONKsSbyTw411bkIGLWD79s9R53IY2aDBwd1Ry0roN0KGGACqikYJnSnlOGQG34PXo4XGQUqsQwhpAyY1OUMvqdShQigw/PusFAIfu5WPfKtAcxut5TdQXBG2X34H4AQmwjDeQTidL/EcAf8qXshlBHrl6GDOtJ/oG+2cyGC434eHQIBU4k6ioHnmzXApwXk7fY6FUKZ9GfPq+wTiAcyedV+HNBKaG/iwxUa0YOxDwdDwVqh8xuDx6tD7gC59ZL6uSCVjbxQZLzX9ToSJlfI5praLebvNHhtfcBcLVGzGc1IaWZaUJo/gwdMFoVRFS8o7Zi/HqZ3waloH5fbAeBO/fC7nX3nVutzR3ZOQeaJYS1ScJqdVQjt/8FA7G4hVMN0ziAQWlRzV7eYBqc+anB2oQlNjjNmoj/rMjT1oH3nPLVWBTUTVnR7UXTBhJ8F+2y1TcVZA5iFrz8paVNWO80sR0X8xOX1Lovtkc0P5ta85vb7hcsDO54/esRhmsS1LUL3tL0y4IkUPqn7ea1cpnbFuDue5CTde7WqbNd/4TwjYRaAAAAA==";
const Header = ({ title = null, breadcrumb = [] }) => {
  return /* @__PURE__ */ jsxs("header", { className: "flex flex-col py-4 px-6 justify-center header lg:px-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-start max-w-3xl w-full mx-auto", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", children: [
        /* @__PURE__ */ jsx("meta", { name: "name", content: "Accueil" }),
        /* @__PURE__ */ jsx(
          "img",
          {
            width: "48",
            height: "48",
            sizes: "(min-width: 48px) 48px, 100vw",
            src: ProfilHeaderBlog,
            className: "w-12 h-12 mr-6 rounded-full",
            alt: "gkueny"
          }
        )
      ] }),
      breadcrumb.map((path, i) => {
        if (i === breadcrumb.length - 1 && !title) {
          return /* @__PURE__ */ jsx("div", { className: "text-2xl", children: /* @__PURE__ */ jsx("h1", { className: "text-gray-900 leading-none", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: path.link,
              className: "hover:text-blue-800 hover:underline",
              children: path.title
            }
          ) }) }, i);
        }
        return /* @__PURE__ */ jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "text-2xl", children: /* @__PURE__ */ jsx("h2", { className: "text-gray-900 leading-none", children: /* @__PURE__ */ jsx(
            Link,
            {
              to: path.link,
              className: "hover:text-blue-800 hover:underline",
              children: path.title
            }
          ) }) }),
          i < breadcrumb.length - 1 && /* @__PURE__ */ jsx("div", { className: "mx-2", children: "-" })
        ] }, i);
      })
    ] }),
    title && /* @__PURE__ */ jsx("div", { className: "max-w-3xl w-full mx-auto pb-4 pt-10", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl text-gray-900 leading-none", children: title }) })
  ] });
};
Header.propTypes = {
  title: PropTypes.string,
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  )
};
const Pagination = ({ currentPage, nbPages }) => {
  const pages = [...Array(nbPages)];
  return /* @__PURE__ */ jsx("footer", { className: "flex justify-center", children: /* @__PURE__ */ jsx("ul", { className: "flex pl-0 list-none rounded my-2", children: pages.map((_, i) => {
    const page = i + 1;
    const link = i > 0 ? `/${page}` : "";
    return /* @__PURE__ */ jsx(
      "li",
      {
        className: `relative block leading-tight border border-gray-300 text-blue-700  hover:bg-gray-200 ${currentPage === page ? "bg-gray-200" : "bg-white"}${page === 1 ? " rounded-l" : ""}${page === nbPages ? " rounded-r" : ""}${page < nbPages ? " border-r-0" : ""}`,
        children: /* @__PURE__ */ jsx(Link, { to: `/blog${link}`, className: "block page-link py-2 px-3", children: page })
      },
      page
    );
  }) }) });
};
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  nbPages: PropTypes.number.isRequired
};
const links$1 = () => {
  return [
    {
      rel: "preload",
      href: ProfilHeaderBlog,
      as: "image"
    }
  ];
};
function meta$1({ params }) {
  const title = "Blog | Gaëtan Kueny";
  return [
    {
      title: params.page ? `Blog page ${params.page} | Gaëtan Kueny` : title
    },
    {
      property: "og:title",
      content: title
    },
    {
      property: "twitter:title",
      content: title
    }
  ];
}
function headers$1() {
  return {
    "Cache-Control": "max-age=43200, stale-while-revalidate=43200, s-maxage=86400"
  };
}
const articleByPage = 5;
let loader$1 = async ({ params }) => {
  const page = params.page ? parseInt(params.page, 10) : 1;
  const articles = await getArticles();
  const nbPages = Math.ceil(articles.length / articleByPage);
  const skip = (page - 1) * articleByPage;
  return {
    currentPage: page,
    nbPages,
    articles: articles.slice(skip, skip + articleByPage)
  };
};
function Index() {
  const { articles, nbPages, currentPage } = useLoaderData();
  return /* @__PURE__ */ jsx(
    Layout,
    {
      header: /* @__PURE__ */ jsx(
        Header,
        {
          breadcrumb: [
            {
              title: "Accueil",
              link: "/"
            },
            {
              title: "Blog",
              link: "/blog"
            }
          ]
        }
      ),
      footer: /* @__PURE__ */ jsx(Pagination, { currentPage, nbPages }),
      padding: true,
      children: /* @__PURE__ */ jsx("section", { className: "flex flex-1 flex-col items-center justify-center", children: /* @__PURE__ */ jsx(ArticlesList, { articles, withLink: false }) })
    }
  );
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  headers: headers$1,
  links: links$1,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  headers: headers$1,
  links: links$1,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const Profil = "data:image/webp;base64,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";
const links = () => {
  return [
    { page: "/blog" },
    {
      rel: "preload",
      href: Profil,
      as: "image"
    }
  ];
};
function meta({ data: { article } }) {
  const title = article.title;
  const description = article.excerpt;
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      property: "og:title",
      content: title
    }
  ];
}
function headers() {
  return {
    "Cache-Control": "max-age=43200, stale-while-revalidate=43200, s-maxage=86400"
  };
}
let loader = async ({ params }) => {
  const article = await getArticle(params["*"]);
  if (!article) {
    throw new Error();
  }
  return {
    article
  };
};
const Article = () => {
  const { article } = useLoaderData();
  const { title, slug, date, content, keywords, credit, baseArticleUrl } = article;
  return /* @__PURE__ */ jsxs(
    Layout,
    {
      header: /* @__PURE__ */ jsx(
        Header,
        {
          title,
          link: `/${slug}`,
          breadcrumb: [
            {
              title: "Accueil",
              link: "/"
            },
            {
              title: "Blog",
              link: "/blog"
            }
          ]
        }
      ),
      padding: true,
      children: [
        /* @__PURE__ */ jsx("article", { className: "flex flex-col", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center px-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl w-full leading-normal lg:leading-loose", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-700 text-xs", children: [
            "Publié le ",
            format(new Date(date), "dd MMMM yyyy", { locale })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "py-4", children: keywords && keywords.split(",").map((keyword, i) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2",
              children: [
                "#",
                keyword
              ]
            },
            i
          )) }),
          /* @__PURE__ */ jsx(Markdown, { baseArticleUrl, source: content })
        ] }) }) }),
        /* @__PURE__ */ jsx("section", { className: "max-w-3xl w-full my-8 mx-6 pl-2 border-l-4 border-gray-500", children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "italic text-base",
            dangerouslySetInnerHTML: { __html: credit }
          }
        ) }),
        /* @__PURE__ */ jsx("section", { className: "flex flex-1 justify-start my-12 px-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center max-w-3xl w-full mx-auto", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              width: "80",
              height: "80",
              sizes: "(min-width: 80px) 80px, 100vw",
              src: Profil,
              alt: "gkueny",
              className: "flex-none w-20 h-20 mr-5 px-1 rounded-full"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-gray-900 text-xl leading-relaxed", children: [
              "À propos de l'auteur - gkueny",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-lg text-blue-500 hover:text-blue-800", children: /* @__PURE__ */ jsx(
                "a",
                {
                  target: "_blank",
                  href: "https://www.occitech.fr",
                  rel: "noopener noreferrer",
                  children: "@Occitech"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "flex flex-1 flex-col items-center justify-center text-gray-800", children: "Développeur depuis maintenant 6 ans, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            title: "Retourner en haut de la page",
            className: "go-top w-12 h-12 bg-gray-700 text-white fixed hidden rounded-full",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-6 h-6 m-auto",
                x: "0px",
                y: "0px",
                width: "451.847px",
                height: "451.846px",
                viewBox: "0 0 451.847 451.846",
                fill: "#fff",
                children: /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("path", { d: "M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0   L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4   c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z" }) })
              }
            )
          }
        )
      ]
    }
  );
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Article,
  headers,
  links,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BDajD-SV.js", "imports": ["/assets/components-DEsfW1mq.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-q5jIG7d5.js", "imports": ["/assets/components-DEsfW1mq.js"], "css": [] }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DEm3WHbK.js", "imports": ["/assets/components-DEsfW1mq.js", "/assets/Markdown-Dh-sYPXL.js", "/assets/List-eksNQhAg.js"], "css": [] }, "routes/blog": { "id": "routes/blog", "parentId": "root", "path": "blog", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CnmT0SPD.js", "imports": ["/assets/components-DEsfW1mq.js", "/assets/Markdown-Dh-sYPXL.js", "/assets/Header-DA-2nZkL.js", "/assets/List-eksNQhAg.js"], "css": [] }, "routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_-FultCxBf.js", "imports": ["/assets/components-DEsfW1mq.js", "/assets/Markdown-Dh-sYPXL.js", "/assets/Header-DA-2nZkL.js"], "css": [] }, "routes/blog/$page": { "id": "routes/blog/$page", "parentId": "root", "path": "blog/:page", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_page-CoV4emP0.js", "imports": ["/assets/index-CnmT0SPD.js", "/assets/components-DEsfW1mq.js", "/assets/Markdown-Dh-sYPXL.js", "/assets/Header-DA-2nZkL.js", "/assets/List-eksNQhAg.js"], "css": [] }, "routes/blog/index": { "id": "routes/blog/index", "parentId": "root", "path": "blog", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CnmT0SPD.js", "imports": ["/assets/components-DEsfW1mq.js", "/assets/Markdown-Dh-sYPXL.js", "/assets/Header-DA-2nZkL.js", "/assets/List-eksNQhAg.js"], "css": [] } }, "url": "/assets/manifest-e2fd9b64.js", "version": "e2fd9b64" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/blog/$page": {
    id: "routes/blog/$page",
    parentId: "root",
    path: "blog/:page",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/blog/index": {
    id: "routes/blog/index",
    parentId: "root",
    path: "blog",
    index: true,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
