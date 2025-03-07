import createSlug from "slug";
import fs from "fs";
import matter from "gray-matter";

export const fetchArticle = async (slug) => {
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

export const fetchArticles = async () => {
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

export const getSlug = (title) => {
  return createSlug(title).toLowerCase();
};

export const formatArticle = (article, index) => {
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
    baseArticleUrl: "/assets",
  };
};

export const getArticles = async () => {
  const articles = await fetchArticles();

  return articles
    .map((article, index) => {
      return formatArticle(article, index);
    })
    .reverse();
};

export const getArticle = async (slug) => {
  const response = await fetchArticle(slug);

  if (!response || !response.article) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return formatArticle(response.article, response.index);
};
