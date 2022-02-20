import express from 'express';
import {
  json as jsonParser,
  urlencoded as urlencodedParser,
} from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import AppError from './utils/error';
import errorHandler from './middleware/error';
import logger from './middleware/logger';
import router from './api/v1/router';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.use(
  jsonParser({
    type: 'application/json',
  })
);

app.use(
  urlencodedParser({
    extended: true,
  })
);

app.use(logger);

app.use('/api/v1', router);

app.all('*', (req, res, next) => {
  const error = new AppError(404, 'Not found');
  return next(error);
});

app.use(errorHandler);

export default app;
