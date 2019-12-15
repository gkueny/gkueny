const path = require("path");
const createSchemaCustomization = require("./createSchemaCustomization");
const sourceNodes = require("./sourceNodes");
const createResolvers = require("./createResolvers");

exports.createSchemaCustomization = createSchemaCustomization;
exports.sourceNodes = sourceNodes;
exports.createResolvers = createResolvers;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allArticle(sort: { fields: [date], order: DESC }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  const articles = pages.data.allArticle.nodes;
  const articlesPerPage = 3;
  const numPages = Math.ceil(articles.length / articlesPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/blog" : `/blog/${i + 1}`,
      component: path.resolve("./src/components/Blog/Blog.js"),
      context: {
        limit: articlesPerPage,
        skip: i * articlesPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  articles.forEach(({ id, slug: contentSlug }, i) => {
    createPage({
      path: `/${contentSlug}`,
      component: path.resolve("./src/components/Articles/Article/Article.js"),
      context: {
        id: id,
      },
    });
  });
};
