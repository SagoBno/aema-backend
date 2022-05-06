import express from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';

import resultController from '../controllers/result/index.js';

const resultsRouter = express.Router();

resultsRouter.get(
  '/me',
  ensureLoggedIn('/auth/login'),
  resultController.getByUserId,
);

export default resultsRouter;
