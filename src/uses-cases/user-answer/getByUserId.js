import userAnswerRepository from '../../repositories/user-answer.js';

const getByUserId = async (userId, { date } = {}) => {
  const userAnswers = await userAnswerRepository.getByUserId({ userId, createdAt: date });
  return userAnswers;
};

export default getByUserId;
