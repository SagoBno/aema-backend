import userRepository from '../../repositories/user.js';

const getAll = () => userRepository.getAll();
export default getAll;
