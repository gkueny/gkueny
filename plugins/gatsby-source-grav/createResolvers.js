const { createRemoteFileNode } = require("gatsby-source-filesystem");

const imageResolvers = (
  image,
  store,
  cache,
  createNode,
  createNodeId,
  reporter
) => {
  return {
    type: "MarkdownImage",
    id: createNodeId(`MarkdownImage${image.id}`),
    initialUrl: image.initialUrl,
    image: createRemoteFileNode({
      url: image.url,
      store,
      cache,
      createNode,
      createNodeId,
      reporter,
    }),
  };
};

const videoResolvers = (video, createNodeId) => {
  return {
    type: "MarkdownVideo",
    id: createNodeId(`MarkdownVideo${video.id}`),
    initialUrl: video.initialUrl,
    url: video.url,
  };
};

module.exports = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;
  createResolvers({
    Article: {
      markdownImages: {
        resolve: ({ images }) =>
          images.map((image) =>
            imageResolvers(
              image,
              store,
              cache,
              createNode,
              createNodeId,
              reporter
            )
          ),
      },
      markdownVideos: {
        resolve: ({ videos }) =>
          videos.map((video) => videoResolvers(video, createNodeId)),
      },
      url: { resolve: ({ slug }) => "/" + slug },
      credit: { resolve: ({ credit }) => credit },
      image: {
        resolve: ({ image }) =>
          image
            ? imageResolvers(
                image,
                store,
                cache,
                createNode,
                createNodeId,
                reporter
              )
            : null,
      },
    },
  });
};
