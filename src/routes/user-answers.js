import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ensureLoggedIn } from "connect-ensure-login";

import UserAnswerController from "../controllers/UserAnswer.js";
import userAnswersCreated from "../events/user-answers.created.js";

const userAnswersRouter = express.Router();

userAnswersRouter.post(
  "/",
  ensureLoggedIn("/auth/login"),
  async (req, res, next) => {
    try {
      const userAnswers = req.body.answers.map((answer) => ({
        answerId: answer.id,
        userId: req.user.id,
        value: answer.value,
      }));

      const createdUserAnswers = await UserAnswerController.createMultiple(
        userAnswers
      );

      userAnswersCreated(createdUserAnswers, req.user.id);

      return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    } catch (error) {
      return next(error);
    }
  }
);

userAnswersRouter.get(
  "/:userId",
  ensureLoggedIn("/auth/login"),
  async (req, res) => {
    try {
      const userAnswers = await UserAnswerController.getAll(req.params.userId);
      return res.status(StatusCodes.OK).send({ userAnswers });
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }
  }
);

userAnswersRouter.patch(
  "/",
  ensureLoggedIn("/auth/login"),
  async (req, res) => {
    try {
      const updatedUserAnswer = await UserAnswerController.update(req.body);
      return res.status(StatusCodes.OK).send({ updatedUserAnswer });
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }
  }
);

userAnswersRouter.delete(
  "/:userAnswerId",
  ensureLoggedIn("/auth/login"),
  async (req, res) => {
    try {
      await UserAnswerController.delete(req.params.userAnswerId);
      return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }
  }
);

export default userAnswersRouter;
