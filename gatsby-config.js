module.exports = {
  siteMetadata: {
    title: `Gaëtan Kueny`,
    description: `Développeur depuis maintenant 2 ans et demi, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php.`,
    author: `@gkueny`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"),
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/images/profil.jpg`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-grav",
      options: {
        url: "http://admin.gkueny.test:8888",
      },
    },
  ],
};
