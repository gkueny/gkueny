module.exports = {
  siteMetadata: {
    title: "Gaëtan Kueny",
    description:
      "Développeur depuis maintenant 2 ans et demi, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php.",
    author: "@gkueny",
    siteUrl: "https://gkueny.fr",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-sass",
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
        matomoUrl: "https://matomo.gkueny.fr",
        siteUrl: "https://gkueny.fr",
      },
    },
    {
      resolve: "gatsby-plugin-csp",
      options: {
        disableOnDev: true,
        mergeScriptHashes: false, // you can disable scripts sha256 hashes
        mergeStyleHashes: false, // you can disable styles sha256 hashes
        directives: {
          "script-src": "'self' 'unsafe-inline' *.gkueny.fr",
          "style-src": "'self' 'unsafe-inline' *.gkueny.fr blob:",
          "img-src": "'self' data: gkueny-admin.herokuapp.com *.gkueny.fr",
          "media-src": "'self' data: gkueny-admin.herokuapp.com *.gkueny.fr",
          "default-src":
            "'self' 'unsafe-inline' gkueny-admin.herokuapp.com *.gkueny.fr",
          "connect-src": "'self' gkueny-admin.herokuapp.com *.gkueny.fr",
          "default-src":
            "'self' 'unsafe-inline' gkueny-admin.herokuapp.com *.gkueny.fr",
        },
      },
    },
    "gatsby-plugin-meta-redirect",
  ],
};
