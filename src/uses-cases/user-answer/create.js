import userAnswerRepository from '../../repositories/user-answer.js';
import userAnswersCreated from '../../events/user-answers.created.js';

const create = async (userAnswers, userId) => {
  const createdUserAnswers = await userAnswerRepository.createMultiple(
    userAnswers,
  );

  userAnswersCreated(createdUserAnswers, userId);
};

export default create;
