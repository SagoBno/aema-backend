import userRepository from '../../repositories/user.js';
import nodeCryptoUtils from '../../utils/nodeCrypto.js';

const create = async (userParam) => {
  const salt = nodeCryptoUtils.createSalt();
  const hashedPassword = await nodeCryptoUtils.encrypt(
    userParam.password,
    salt,
  );
  return userRepository.create({
    parentFirstName: userParam.parentFirstName,
    parentLastName: userParam.parentLastName,
    parentBirthday: userParam.parentBirthday,
    email: userParam.email,
    password: hashedPassword,
    salt,
    genre: userParam.genre,
    childFirstName: userParam.childFirstName,
    childLastName: userParam.childLastName,
    childBirthday: userParam.childBirthday,
  });
};

export default create;
