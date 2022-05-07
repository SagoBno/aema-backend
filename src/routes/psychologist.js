import express from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import psychologistController from '../controllers/psychologist/index.js';

const psychologistRouter = express.Router();

psychologistRouter.get(
  '/',
  ensureLoggedIn('/auth/login'),
  psychologistController.listAll,
);

export default psychologistRouter;
