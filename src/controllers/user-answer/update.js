import { ReasonPhrases, StatusCodes } from "http-status-codes";

import userAnswerCases from "../../uses-cases/user-answer/index.js";

const update = async (req, res) => {
  try {
    const updatedUserAnswer = await userAnswerCases.update(req.body);
    return res.status(StatusCodes.OK).send({ updatedUserAnswer });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
};

export default update;
