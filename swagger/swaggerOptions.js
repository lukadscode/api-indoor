const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Votre API",
      version: "1.0.0",
      description: "Documentation de l'API",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // Chemins vers vos fichiers
};

module.exports = options;
