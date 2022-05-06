import { Op } from 'sequelize';

async function create(userAnswer) {
  const createdUserAnswer = await app.db.UserAnswer.create(userAnswer);
  return createdUserAnswer;
}

async function createMultiple(userAnswers) {
  const createdUserAnswer = await app.db.UserAnswer.bulkCreate(userAnswers);
  return createdUserAnswer;
}

async function find(userAnswerId) {
  const userAnswer = await app.db.UserAnswer.findByPk(userAnswerId);
  return userAnswer;
}

async function getByUserId({ userId, createdAt }) {
  const userAnswers = await app.db.UserAnswer.findAll({
    where: {
      userId,
      ...(createdAt ? {
        createdAt: {
          [Op.eq]: new Date(createdAt),
        },
      } : {}),
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  });
  return userAnswers;
}

async function update(userAnswer) {
  const updatedUserAnswer = await app.db.UserAnswer.update(userAnswer, {
    where: {
      userId: userAnswer.userId,
    },
  });
  return updatedUserAnswer;
}

async function remove(userAnswerId) {
  const deletedUserAnswer = await app.db.UserAnswer.destroy({
    where: {
      userId: userAnswerId,
    },
  });
  return deletedUserAnswer;
}

export default {
  create,
  createMultiple,
  find,
  getByUserId,
  update,
  remove,
};
