async function create(user) {
  const createdUser = await app.db.User.create(user);
  return createdUser;
}

async function find(userEmail) {
  const user = await app.db.User.findOne({
    where: {
      email: userEmail,
    },
    raw: true,
  });
  return user;
}

async function getAll(userId) {
  const users = await app.db.User.findAll({
    where: { userId },
  });
  return users;
}

async function update(user, userEmail) {
  const updatedUser = await app.db.User.update(user, {
    where: {
      email: userEmail,
    },
  });
  return updatedUser;
}

async function remove(userAnswerId) {
  const deletedUserAnswer = await app.db.User.destroy({
    where: {
      userId: userAnswerId,
    },
  });
  return deletedUserAnswer;
}

export default {
  create,
  find,
  getAll,
  update,
  remove,
};
