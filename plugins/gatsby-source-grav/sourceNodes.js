const axios = require("axios").default;
const createSlug = require("slug");
const types = require("./types");

const getImagesFromMarkdown = (URL, text, contentSlug, index) => {
  const regex = /\((.)*\.(png|jpeg|jpg|mp4)\)/g;
  const found = text.match(regex);

  if (!found) {
    return [];
  }

  const images = found.map((image, i) => {
    return {
      id: `${contentSlug}-${i}`,
      url: `${URL}/user/pages/01.home/${
        index < 10 ? `0${index}` : index
      }.${contentSlug}/${image.substring(1, image.length - 1)}`,
      initialUrl: image,
      isVideo: image.includes(".mp4)"),
    };
  });

  return images;
};

const processResult = (
  URL,
  result,
  index,
  nodeType,
  createNodeId,
  createContentDigest
) => {
  const nodeId = createNodeId(`${nodeType}${result.id}`);
  const nodeContent = JSON.stringify(result);

  const medias = getImagesFromMarkdown(URL, result.content, result.slug, index);

  const nodeData = {
    ...result,
    images: medias.filter((media) => !media.isVideo),
    videos: medias.filter((media) => media.isVideo),
    image: result.image
      ? {
          id: "image-article",
          url: `${URL}/user/pages/01.home/${
            index < 10 ? `0${index}` : index
          }.${result.slug}/${result.image}`,
          initialUrl: result.image,
          isVideo: false,
        }
      : null,
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

const fetchArticles = async (URL) => {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        "return-as": "json",
      },
    });

    return response.data.children.map((article) => {
      const contentSlug = `${createSlug(article.header.title)}`.toLowerCase();

      return {
        id: contentSlug,
        title: article.header.title,
        date: new Date(article.header.date),
        slug: contentSlug,
        excerpt: article.header.excerpt,
        keywords: article.header.keywords,
        image: article.header.image ? article.header.image : null,
        credit: article.header.credit ? article.header.credit : null,
        content: article.content,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = async (
  { actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  const URL = pluginOptions.url;
  const { createNode } = actions;

  const data = await fetchArticles(URL);

  let i = 1;
  for (const result of data) {
    const nodeData = processResult(
      URL,
      result,
      i,
      types.ARTICLE,
      createNodeId,
      createContentDigest
    );
    createNode(nodeData);
    i++;
  }

  return;
};
