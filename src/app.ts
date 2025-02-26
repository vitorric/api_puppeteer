/* eslint-disable import/first */
import './core/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import morgan from 'morgan';

import routes from '@infra/http/routes';

const app = express();

const server = createServer(app);

app.use(
  cors(),
  helmet(),
  morgan('dev'),
  express.json({ limit: '1000MB' }),
  express.urlencoded({ limit: '2000MB', extended: true })
);

routes(app);

export default server;
