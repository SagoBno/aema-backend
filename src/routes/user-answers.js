import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ensureLoggedIn } from "connect-ensure-login";

import userAnswerController from "../controllers/user-answer/index.js";

const userAnswersRouter = express.Router();

userAnswersRouter.post(
  "/",
  ensureLoggedIn("/auth/login"),
  userAnswerController.create
);

userAnswersRouter.get(
  "/me",
  ensureLoggedIn("/auth/login"),
  userAnswerController.getByUserId
);

userAnswersRouter.patch(
  "/",
  ensureLoggedIn("/auth/login"),
  userAnswerController.update
);

userAnswersRouter.delete(
  "/:userAnswerId",
  ensureLoggedIn("/auth/login"),
  userAnswerController.remove
);

export default userAnswersRouter;
