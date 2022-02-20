import SwaggerUI from 'swagger-ui-express';

const baseConfig: SwaggerUI.JsonObject = {
  openapi: '3.0.0',
  info: {
    title: 'Express Typescript Starter',
    version: '1.0.0',
    contact: {
      name: 'Ephemeral Astronaut',
      email: 'troglodytto@gmail.com',
      url: 'https://troglodytto.github.io',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {},
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [{ url: '/api/v1' }],
  paths: {},
};

export default baseConfig;
