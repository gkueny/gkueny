const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allPrismicArticle {
        nodes {
          id
          slugs
        }
      }
    }
  `);

  pages.data.allPrismicArticle.nodes.forEach(({ id, slugs }, i) => {
    createPage({
      path: `/${slugs[i]}`,
      component: path.resolve("./src/components/Articles/Article/Article.js"),
      context: {
        id: id,
      },
    });
  });
};
