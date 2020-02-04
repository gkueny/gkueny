exports.createPages = async ({ actions }) => {
  const { createRedirect } = actions;

  const redirections = [
    { oldUrl: "react-lecon-1", newUrl: "introduction-a-react" },
    { oldUrl: "react-lecon-2", newUrl: "decouverte-du-state" },
    {
      oldUrl: "react-lecon-3",
      newUrl: "en-savoir-un-peu-plus-sur-le-cycle-de-vie-dun-composant-react",
    },
    {
      oldUrl: "react-lecon-4",
      newUrl: "implementer-redux-dans-une-application-react",
    },
    { oldUrl: "react-lecon-5", newUrl: "persister-ses-donnees" },
    { oldUrl: "react-lecon-6", newUrl: "naviguer-dans-son-application-react" },
    { oldUrl: "react-lecon-7", newUrl: "un-dernier-mot-sur-react" },
    {
      oldUrl: "feuille-de-route-react",
      newUrl: "feuille-de-route-dune-application-react",
    },
    {
      oldUrl: "react-tchat",
      newUrl: "utiliser-firebase-avec-react",
    },
    {
      oldUrl: "react-admin",
      newUrl: "proteger-son-application",
    },
  ];

  redirections.forEach(({ oldUrl, newUrl }) => {
    createRedirect({
      fromPath: `/${oldUrl}`,
      toPath: `/${newUrl}`,
      isPermanent: true,
    });
  });
};
