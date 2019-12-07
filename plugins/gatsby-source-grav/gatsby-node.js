const axios = require("axios").default;
const slug = require("slug");
const path = require("path");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  const URL = pluginOptions.url;
  const { createNode } = actions;

  const data = await fetchArticles(URL, createNodeId, createContentDigest);

  data.forEach(article => {
    createNode(article);
  });

  return;
};

const fetchArticles = async (URL, createNodeId, createContentDigest) => {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        "return-as": "json",
      },
    });
    return response.data.children.map(article => {
      return processArticle(
        { ...article.header, text: article.content },
        createNodeId,
        createContentDigest
      );
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const processArticle = (content, createNodeId, createContentDigest) => {
  const nodeId = createNodeId(`grav-content-${content.title}`);
  const nodeContent = JSON.stringify(content);
  const nodeData = Object.assign({}, content, {
    slug: `${slug(content.title)}`.toLowerCase(),
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `Article`,
      content: nodeContent,
      contentDigest: createContentDigest(content),
    },
  });
  return nodeData;
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allArticle {
        nodes {
          id
          slug
        }
      }
    }
  `);

  pages.data.allArticle.nodes.forEach(({ id, slug }, i) => {
    createPage({
      path: `/${slug}`,
      component: path.resolve("./src/components/Articles/Article/Article.js"),
      context: {
        id: id,
      },
    });
  });
};
