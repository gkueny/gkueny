module.exports = {
  siteMetadata: {
    title: "Gaëtan Kueny",
    description:
      "Développeur depuis maintenant 2 ans et demi, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php.",
    author: "@gkueny",
    siteUrl: "https://gkueny.fr",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        develop: true,
        printRejected: false,
        tailwind: true,
        whitelist: [
          "pre",
          "strong",
          "article",
          "code",
          "article-image",
          "gatsby-image-wrapper",
        ],
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "gkueny",
        short_name: "gkueny",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#fff",
        display: "minimal-ui",
        icon: "src/images/profil.jpg",
      },
    },
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-source-grav",
      options: {
        url: "https://gkueny-admin.herokuapp.com",
      },
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "1",
        matomoUrl: "http://df13b600975f42a5bf463389721c4631.yatu.ws",
        siteUrl: "https://gkueny.fr",
      },
    },
    {
      resolve: "gatsby-plugin-csp",
      options: {
        disableOnDev: false,
        mergeScriptHashes: false, // you can disable scripts sha256 hashes
        mergeStyleHashes: false, // you can disable styles sha256 hashes
        directives: {
          "script-src":
            "'self' 'unsafe-inline' df13b600975f42a5bf463389721c4631.yatu.ws",
          "style-src":
            "'self' 'unsafe-inline' df13b600975f42a5bf463389721c4631.yatu.ws blob:",
          "img-src":
            "'self' data: gkueny-admin.herokuapp.com admin.gkueny.test:8888 df13b600975f42a5bf463389721c4631.yatu.ws",
          "media-src":
            "'self' data: gkueny-admin.herokuapp.com admin.gkueny.test:8888 df13b600975f42a5bf463389721c4631.yatu.ws",
        },
      },
    },
    "gatsby-plugin-meta-redirect",
  ],
};
