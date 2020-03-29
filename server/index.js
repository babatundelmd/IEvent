import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import { config } from 'dotenv';
import Debug from 'debug';
import swaggerUi from'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

config();

const debug = Debug('dev');

const PORT = process.env.PORT || 6000;

const options = {
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./server/index.js'],
    basePath: '/',
    swaggerDefinition: {
      // Like the one described here: https://swagger.io/specification/#infoObject
      info: {
        description: 'Events API with autogenerated swagger doc',
        swagger: '2.0',
        title: 'Law API',
        contact: {
            name: "Adeyemi Adekorede Adeseyi"
          },
       servers: ["http://localhost:5000"],
       version: '1.0.0',
      },
    },
};
const specs = swaggerJsdoc(options);

const app = express();
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false, }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *  get:
 *    description: Use to test if app is working
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/', (request, response) => {
  response.status(200).send('Welcome to Events app');
});

app.use('*', (request, response) => {
  response.status(404).send('Not Found');
});

app.listen(PORT, () => debug(`Server started on port ${PORT}`));

export default app;