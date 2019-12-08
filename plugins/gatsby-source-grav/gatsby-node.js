const axios = require("axios").default;
const slug = require("slug");
const path = require("path");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const ADMIN_URL = "http://admin.gkueny.test:8888";

exports.sourceNodes = async (
  { actions, store, cache, createNodeId, createContentDigest },
  pluginOptions
) => {
  const URL = pluginOptions.url;
  const { createNode } = actions;

  const data = await fetchArticles(
    URL,
    store,
    cache,
    createNode,
    createNodeId,
    createContentDigest
  );

  for (const nodeData of data) {
    createNode(nodeData);
  }

  return;
};

// /user/pages/01.home/utiliser-firebase-avec-react/

const fetchArticles = async (
  URL,
  store,
  cache,
  createNode,
  createNodeId,
  createContentDigest
) => {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        "return-as": "json",
      },
    });

    const articles = [];
    for (const article of response.data.children) {
      const articleProcessed = await processArticle(
        { ...article.header, text: article.content },
        store,
        cache,
        createNode,
        createNodeId,
        createContentDigest
      );
      articles.push(articleProcessed);
    }

    return articles;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const processArticle = async (
  content,
  store,
  cache,
  createNode,
  createNodeId,
  createContentDigest
) => {
  const contentSlug = `${slug(content.title)}`.toLowerCase();
  const nodeId = createNodeId(`grav-content-${contentSlug}`);

  const contentWithAdditionnalInfos = {
    ...content,
    slug: contentSlug,
    id: nodeId,
    parent: null,
    children: [],
  };

  const contentWithFiles = await downloadMediaFiles(
    contentWithAdditionnalInfos,
    store,
    cache,
    createNode,
    createNodeId
  );

  const nodeContent = JSON.stringify(contentWithFiles);

  const nodeData = {
    ...contentWithFiles,
    internal: {
      type: `Article`,
      content: nodeContent,
      contentDigest: createContentDigest(contentWithFiles),
    },
  };

  return nodeData;
};

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

  const posts = pages.data.allArticle.nodes;
  const postsPerPage = 3;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/components/Blog/Blog.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach(({ id, slug: contentSlug }, i) => {
    createPage({
      path: `/${contentSlug}`,
      component: path.resolve("./src/components/Articles/Article/Article.js"),
      context: {
        id: id,
      },
    });
  });
};

const downloadMediaFiles = async (
  content,
  store,
  cache,
  createNode,
  createNodeId
) => {
  const images = getImagesFromMarkdown(content.text, content.slug);

  if (!images) {
    return { ...content, images: [] };
  }

  const fileNodes = [];

  for (const image of images) {
    let fileNode = { id: null };

    try {
      fileNode = await createRemoteFileNode({
        url: image.url,
        parentNodeId: content.id,
        store,
        cache,
        createNode,
        createNodeId,
        auth: {},
      });

      fileNodes.push(fileNode);
    } catch (e) {
      console.error(e);
    }
  }

  return {
    ...content,
    images: fileNodes.map((fileNode, i) => {
      return { image___NODE: fileNode.id, intialImage: images[i].name };
    }),
  };
};

const getImagesFromMarkdown = (text, contentSlug) => {
  const regex = /\((.)*\.png\)/g;
  const found = text.match(regex);

  if (!found) {
    return null;
  }

  const images = found.map(image => {
    return {
      url: `${ADMIN_URL}/user/pages/01.home/${contentSlug}/${image.substring(
        1,
        image.length - 1
      )}`,
      name: image,
    };
  });

  return images;
};
