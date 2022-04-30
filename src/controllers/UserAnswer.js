async function create(userAnswer) {
  try {
    const createdUserAnswer = await app.db.UserAnswer.create(userAnswer);
    return createdUserAnswer;
  } catch (error) {
    throw error;
  }
}

async function createMultiple(userAnswers) {
  try {
    const createdUserAnswer = await app.db.UserAnswer.bulkCreate(userAnswers);
    return createdUserAnswer;
  } catch (error) {
    throw error;
  }
}

async function find(userAnswerId) {
  try {
    const userAnswer = await app.db.UserAnswer.findByPk(userAnswerId);
    return userAnswer;
  } catch (error) {
    throw error;
  }
}

async function getAll(userId) {
  try {
    const userAnswers = await app.db.UserAnswer.findAll({
      where: { userId },
    });
    return userAnswers;
  } catch (error) {
    throw error;
  }
}

async function update(userAnswer) {
  try {
    const updatedUserAnswer = await app.db.UserAnswer.update(userAnswer, {
      where: {
        userId: userAnswer.userId,
      },
    });
    return updatedUserAnswer;
  } catch (error) {
    throw error;
  }
}

async function remove(userAnswerId) {
  try {
    const deletedUserAnswer = await app.db.UserAnswer.destroy({
      where: {
        userId: userAnswerId,
      },
    });
    return deletedUserAnswer;
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  createMultiple,
  find,
  getAll,
  update,
  remove,
};
