import userAnswerRepository from '../../repositories/user-answer.js';

const remove = async (userAnswerId) => {
  await userAnswerRepository.delete(userAnswerId);
};

export default remove;
