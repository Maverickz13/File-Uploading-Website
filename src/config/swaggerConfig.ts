import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';

const configureSwagger = (app: any) => {
  //Swagger options
  const swaggerOpt = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'File Upload and Download Utility',
        version: '1.0.0',
        description: 'API decoumentation for File Upload and Download Utility'
      }
    },
    apis: ['src/routes/*.ts']
  }

  const swaggerSpecs = swaggerJsdoc(swaggerOpt);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}

export default configureSwagger;