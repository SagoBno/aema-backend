import userRepository from '../../repositories/user.js';
import cryptoUtils from '../../utils/crypto.js';

const update = async (userParam, userEmail) => {
  const user = userParam;
  if (user.newPassword && user.oldPassword) {
    userRepository.find(userEmail).then((dbUser) => {
      cryptoUtils.encrypt(user.oldPassword, dbUser.salt, (err, hashedPassword) => {
        if (err) {
          return err;
        }
        if (!cryptoUtils.compare(dbUser.password, hashedPassword)) {
          return 'Contraseña incorrecta';
        }
        const salt = cryptoUtils.createSalt();
        cryptoUtils.encrypt(user.newPassword, salt, (error, hashedNewPassword) => {
          if (error) {
            return error;
          }
          user.password = hashedNewPassword;
          user.salt = salt;
          delete user.oldPassword;
          delete user.newPassword;
          return userRepository.update(user, userEmail);
        });
        return 'Contraseña correcta';
      });
    });
  }
  return userRepository.update(user, userEmail);
};

export default update;
