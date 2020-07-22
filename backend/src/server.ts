import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import cors from 'cors';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
// Rota para mostrar os avatares
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// global exepection handling
// 0 '_' é para setar underline como uma variavel que nao vai utilizar, configurado no eslintrc.json
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('👾Server started on port 3333!');
});
