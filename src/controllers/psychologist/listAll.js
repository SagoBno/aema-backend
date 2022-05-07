import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import psychologistCases from '../../uses-cases/psychologist/index.js';

const listAll = async (_, res) => {
  try {
    const psychologists = await psychologistCases.listAll();

    return res.status(StatusCodes.OK).json({ psychologists });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
  }
};

export default listAll;
