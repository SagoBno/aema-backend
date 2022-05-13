import userRepository from '../../repositories/user.js';

const create = (user) => userRepository.create(user);

export default create;
