import resultRepository from "../../repositories/result.js";

const createByUserAnswers = async (userAnswers, userId) => {
  const total = userAnswers.reduce(
    (acc, { dataValues: { value } }) => value + acc,
    0
  );
  return await resultRepository.create({
    total,
    userId,
  });
};

export default createByUserAnswers;
