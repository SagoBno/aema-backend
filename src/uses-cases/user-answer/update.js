import userAnswerRepository from "../../repositories/user-answer.js";

const update = async (userAnswer) => {
  const updatedUserAnswer = await userAnswerRepository.update(userAnswer);
  return updatedUserAnswer;
};

export default update;
