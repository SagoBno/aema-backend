import express from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ensureLoggedIn } from "connect-ensure-login";

import UserAnswerController from "../controllers/UserAnswer.js";
import ResultController from "../controllers/result.js";

const beckRouter = express.Router();

beckRouter.post("/", async (req, res, next) => {
    try {
        let total = 0;
        await Promise.all(req.body.answers.map(
            (answer) => {
                total += answer.value;
                return UserAnswerController.create(answer);
            }
        ));
        const hola = await ResultController.create({
            total
        });
        console.log(hola);
        return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
    } catch (error) {
        return next(error);
    }
});

beckRouter.get("/:userId", ensureLoggedIn("/auth/login"), async (req, res) => {
    try {
        const userAnswers = await UserAnswerController.getAll(req.params.userId);
        return res.status(StatusCodes.OK).send({ userAnswers });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST)
            .send(ReasonPhrases.BAD_REQUEST);
    }
});

beckRouter.patch("/", ensureLoggedIn("/auth/login"), async (req, res) => {
    try {
        const updatedUserAnswer = await UserAnswerController.update(req.body);
        return res.status(StatusCodes.OK).send({ updatedUserAnswer });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST)
            .send(ReasonPhrases.BAD_REQUEST);
    }
});

beckRouter.delete("/:userAnswerId", ensureLoggedIn("/auth/login"), async (req, res) => {
    try {
        await UserAnswerController.delete(req.params.userAnswerId);
        return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST)
            .send(ReasonPhrases.BAD_REQUEST);
    }
});

export default beckRouter;
