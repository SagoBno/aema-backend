import { Op } from 'sequelize';

async function create(result) {
  const createdResult = await app.db.Result.create(result);
  return createdResult;
}

async function getByUserId({ userId, createdAt }) {
  const result = await app.db.Result.findAll({
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
  return result;
}

async function update(result) {
  const updatedResult = await app.db.Result.update(result, {
    where: {
      id: result.id,
    },
  });
  return updatedResult;
}

async function remove(resultId) {
  const deletedResult = await app.db.Result.destroy({
    where: {
      id: resultId,
    },
  });
  return deletedResult;
}

const resultRepository = {
  create,
  getByUserId,
  update,
  remove,
};

export default resultRepository;
