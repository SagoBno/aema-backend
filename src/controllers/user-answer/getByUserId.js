import { ReasonPhrases, StatusCodes } from "http-status-codes";
import userAnswerCases from "../../uses-cases/user-answer/index.js";

const getByUserId = async (req, res) => {
  try {
    const userAnswers = await userAnswerCases.getByUserId(req.user.id);
    return res.status(StatusCodes.OK).send({ userAnswers });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
};

export default getByUserId;
