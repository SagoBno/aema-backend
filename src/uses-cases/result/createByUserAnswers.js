import resultRepository from '../../repositories/result.js';

const createByUserAnswers = (userAnswers, userId) => {
  const total = userAnswers.reduce(
    (acc, { dataValues: { value } }) => value + acc,
    0,
  );
  return resultRepository.create({
    total,
    userId,
  });
};

export default createByUserAnswers;
