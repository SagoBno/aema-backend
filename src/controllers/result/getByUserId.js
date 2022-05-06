import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import validateAvailability from '../../uses-cases/beck/validateAvailability.js';
import resultCases from '../../uses-cases/result/index.js';

const getByUserId = async (req, res) => {
  try {
    const { date } = req.query;

    const results = await resultCases.getByUserId(req.user.id, { date });

    const [result] = results;

    validateAvailability(result);
    return res.status(StatusCodes.OK).json({ results });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
};

export default getByUserId;
