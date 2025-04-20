import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const setupSwaggerDocs = (app, port) => {
    const options = {
        definition: {
          openapi: '3.0.0',
          info: {
            title: 'Workout Tracker API',
            version: '1.0.0',
            description: 'API for tracking workouts using Wger and custom data',
          },
          servers: [
            {
              url: `http://localhost:${port}/api`,
            },
          ],
        },
        apis: ['./routes/*.js'], // 👈 Path to the files with JSDoc comments
      };
      
      const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwaggerDocs;
