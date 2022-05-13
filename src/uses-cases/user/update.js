import userRepository from '../../repositories/user.js';
import nodeCryptoUtils from '../../utils/nodeCrypto.js';

const update = async (userParam, userEmail) => {
  const user = userParam;
  if (user.newPassword && user.oldPassword) {
    const dbUser = await userRepository.find(userEmail);
    const hashedPassword = await nodeCryptoUtils.encrypt(
      user.oldPassword,
      dbUser.salt,
    );
    if (!nodeCryptoUtils.compare(dbUser.password, hashedPassword)) {
      return 'Contraseña incorrecta';
    }
    const salt = nodeCryptoUtils.createSalt();
    const hashedNewPassword = await nodeCryptoUtils.encrypt(user.newPassword, salt);
    user.password = hashedNewPassword;
    user.salt = salt;
    delete user.oldPassword;
    delete user.newPassword;
  }
  return userRepository.update(user, userEmail);
};

export default update;
