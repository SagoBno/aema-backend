import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import userAnswerCases from '../../uses-cases/user-answer/index.js';
import validateAvailability from '../../uses-cases/beck/validateAvailability.js';

const create = async (req, res, next) => {
  try {
    const [userAnswer] = await userAnswerCases.getByUserId(req.user.id);

    if (userAnswer && !req.cookies.FEATURE_FLAG_ALWAYS_AVAILABLE_TO_SEND_USERS_ANSWERS) {
      const availability = validateAvailability(userAnswer.createdAt);
      if (!availability) {
        return res.status(403).json({
          errors: [
            {
              code: 403,
              message: 'You are not yet enabled to fill out the following form.',
            },
          ],
        });
      }
    }

    const bulkCreatedAt = new Date();
    const userAnswers = req.body.answers?.map((answer) => ({
      answerId: answer.id,
      userId: req.user.id,
      value: answer.value,
      createdAt: bulkCreatedAt,
    }));

    await userAnswerCases.create(userAnswers, req.user.id);

    return res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED);
  } catch (error) {
    return next(error);
  }
};

export default create;
