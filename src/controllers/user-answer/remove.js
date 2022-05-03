import { ReasonPhrases, StatusCodes } from "http-status-codes";

import userAnswerCases from "../../uses-cases/user-answer/index.js";

const remove = async (req, res) => {
  try {
    await userAnswerCases.remove(req.params.userAnswerId);
    return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
};

export default remove;
