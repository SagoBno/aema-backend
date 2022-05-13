import userRepository from '../../repositories/user.js';

const find = (email) => userRepository.find(email);
export default find;
