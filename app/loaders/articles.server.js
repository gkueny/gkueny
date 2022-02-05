import createSlug from "slug";

const BASE_URl = "https://gkueny-admin.herokuapp.com";

const fetchArticles = async () => {
  const res = await fetch(`${BASE_URl}?return-as=json`);
  const data = await res.json();

  return data.children;
};

const getSlug = (title) => {
  return createSlug(title).toLowerCase();
};

const formatArticle = (article, index) => {
  const contentSlug = getSlug(article.header.title);

  return {
    id: contentSlug,
    title: article.header.title,
    date: new Date(article.header.date),
    slug: contentSlug,
    excerpt: article.header.excerpt,
    keywords: article.header.keywords,
    credit: article.header.credit ? article.header.credit : null,
    content: article.content,
    baseArticleUrl: `${BASE_URl}/user/pages/01.home/${
      index < 10 ? `0${index}` : index
    }.${contentSlug}`,
  };
};

export const getArticles = async () => {
  const articles = await fetchArticles();

  return articles.map((article, index) => {
    return formatArticle(article, index);
  });
};

export const getArticle = async (slug) => {
  const articles = await fetchArticles();

  const article = articles.find(
    (article) => getSlug(article.header.title) === slug
  );

  if (!article) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const index = articles.indexOf(article) + 1;

  return formatArticle(article, index);
};
