module.exports = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownImage {
      id: ID!
      initialUrl: String!
      image: File!
    }

    type MarkdownVideo {
      id: ID!
      initialUrl: String!
      url: String!
    }

    type Article implements Node {
      title: String!
      url: String!
      date: String!
      excerpt: String!
      keywords: String!
      content: String!
      markdownImages: [MarkdownImage]
      markdownVideos: [MarkdownVideo]
    }
  `;

  createTypes(typeDefs);
};
