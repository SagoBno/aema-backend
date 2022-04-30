async function create(result) {
  try {
    const createdResult = await app.db.Result.create(result);
    return createdResult;
  } catch (error) {
    throw error;
  }
}

async function getAll() {
  try {
    const result = await app.db.Result.findAll();
    return result;
  } catch (error) {
    throw error;
  }
}

async function update(result) {
  try {
    const updatedResult = await app.db.Result.update(result, {
      where: {
        id: result.id,
      },
    });
    return updatedResult;
  } catch (error) {
    throw error;
  }
}

async function remove(resultId) {
  try {
    const deletedResult = await app.db.Result.destroy({
      where: {
        id: resultId,
      },
    });
    return deletedResult;
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  getAll,
  update,
  remove,
};
