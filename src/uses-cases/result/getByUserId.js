import resultRepository from '../../repositories/result.js';

const getByUserId = (userId, { date } = {}) => resultRepository.getByUserId({
  userId,
  createdAt: date,
});

export default getByUserId;
