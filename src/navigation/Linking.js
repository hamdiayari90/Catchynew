const config = {
  screens: {
    Home: {
      path: "Home",
    },
    Profil: {
      path: "Profil",
    },
    Promotion: {
      path: "Promotion",

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
