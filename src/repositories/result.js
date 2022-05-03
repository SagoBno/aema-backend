async function create(result) {
  const createdResult = await app.db.Result.create(result);
  return createdResult;
}

async function getAll() {
  const result = await app.db.Result.findAll();
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
  getAll,
  update,
  remove,
};

export default resultRepository;
