import userRepository from '../../repositories/user.js';

const create = (userId, { date } = {}) => userRepository.getByUserId({
  userId,
  createdAt: date,
});

export default create;
