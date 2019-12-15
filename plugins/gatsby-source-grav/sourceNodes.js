const axios = require("axios").default;
const createSlug = require("slug");
const types = require("./types");

const ADMIN_URL = "https://gkueny-admin.herokuapp.com";

const getImagesFromMarkdown = (text, contentSlug) => {
  const regex = /\((.)*\.(png|jpeg|jpg|mp4)\)/g;
  const found = text.match(regex);

  if (!found) {
    return [];
  }

  const images = found.map(image => {
    return {
      id: contentSlug,
      url: `${ADMIN_URL}/user/pages/01.home/${contentSlug}/${image.substring(
        1,
        image.length - 1
      )}`,
      initialUrl: image,
      isVideo: image.includes(".mp4)"),
    };
  });

  return images;
};

const processResult = (result, nodeType, createNodeId, createContentDigest) => {
  const nodeId = createNodeId(`${nodeType}${result.id}`);
  const nodeContent = JSON.stringify(result);

  const medias = getImagesFromMarkdown(result.content, result.slug);

  const nodeData = {
    ...result,
    images: medias.filter(media => !media.isVideo),
    videos: medias.filter(media => media.isVideo),
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: nodeType,
      content: nodeContent,
      contentDigest: createContentDigest(result),
    },
  };

  return nodeData;
};

module.exports = async (
  { actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  const URL = pluginOptions.url;
  const { createNode } = actions;

  const data = await fetchArticles(URL);

  for (const result of data) {
    const nodeData = processResult(
      result,
      types.ARTICLE,
      createNodeId,
      createContentDigest
    );
    createNode(nodeData);
  }

  return;
};

const fetchArticles = async URL => {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        "return-as": "json",
      },
    });

    return response.data.children.map(article => {
      const contentSlug = `${createSlug(article.header.title)}`.toLowerCase();

      return {
        id: contentSlug,
        title: article.header.title,
        slug: contentSlug,
        date: article.header.date,
        excerpt: article.header.excerpt,
        keywords: article.header.keywords,
        content: article.content,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
