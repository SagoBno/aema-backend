import resultRepository from '../../repositories/result.js';

const createByUserAnswers = (userAnswers, userId) => {
  let createdAt;
  const total = userAnswers.reduce(
    (acc, { value, createdAt: userAnswerCreatedAt }) => {
      createdAt ??= userAnswerCreatedAt;
      return value + acc;
    },
    0,
  );
  return resultRepository.create({
    total,
    userId,
    createdAt,
  });
};

export default createByUserAnswers;
