const config = {
  screens: {
    Acceuil: {
      path: "home",
    },
    Profil: {
      path: "profil",
    },
    Promotion: {
      path: "promotion",

    },
    EventId: {
      path: "eventById/:id",
      parse: {
        id: (id) => `${id}`,
      },
    },
    RespondSurvey: {
      path: "survey/:surveyId",
      parse: {
        surveyId: (surveyId) => `${surveyId}`,
      },
    },
    gallery: {
      path: "gallery",
    },
  },
};

const linking = {
  prefixes: ["tde://catchy"],
  config,
};

export default linking;
