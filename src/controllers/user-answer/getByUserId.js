import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import userAnswerCases from '../../uses-cases/user-answer/index.js';

const getByUserId = async (req, res) => {
  try {
    const { date } = req.query;

    const userAnswers = await userAnswerCases.getByUserId(req.user.id, { date });
    return res.status(StatusCodes.OK).json({ userAnswers });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
};

export default getByUserId;
