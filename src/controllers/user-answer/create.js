import { ReasonPhrases, StatusCodes } from "http-status-codes";

import userAnswerCases from "../../uses-cases/user-answer/index.js";

const create = async (req, res, next) => {
  try {
    const userAnswers = req.body.answers?.map((answer) => ({
      answerId: answer.id,
      userId: req.user.id,
      value: answer.value,
    }));

    await userAnswerCases.create(userAnswers, req.user.id);

    return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  } catch (error) {
    return next(error);
  }
};

export default create;
