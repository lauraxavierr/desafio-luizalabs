import { Router }  from 'express'; 
import swaggerUI from "swagger-ui-express";

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionController';
import authMiddleware from './app/middlewares/auth';
import CEPController from './app/controller/CEPController'
import swaggerDocument from './config/swagger';


const routes = new Router();

routes.post('/signup', UserController.store); // cadastro

routes.post('/signin', SessionController.store); //login

routes.put('/cep/:user_id', authMiddleware, CEPController.index);

routes.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default routes;