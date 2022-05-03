import userAnswerRepository from "../../repositories/user-answer.js";

const getByUserId = async (userId) => {
  const userAnswers = await userAnswerRepository.getAll(userId);
  return userAnswers;
};

export default getByUserId;
