import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import __dirname from './utils/index.js';

const app = express();
const PORT = process.env.PORT||3000;
const connection = mongoose.connect('mongodb://localhost:27017/adoptame')

const swaggerOptions={
  definition:{
    openapi:'3.0.1',
    info:{
      title:'Documentacion de las Apis',
      description:'api de mascotas con swagger'
    }
  },
  apis:["./docs/Users/Users.yaml"]
}

const spec = swaggerJsDoc(swaggerOptions)
app.use('/apidoc', swaggerUiExpress.serve,swaggerUiExpress.setup(spec))

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))


