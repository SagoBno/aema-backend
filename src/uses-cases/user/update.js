import userRepository from '../../repositories/user.js';
import cryptoUtils from '../../utils/crypto.js';

function checkPassword(user, dbUser) {
  return cryptoUtils.encrypt(
    user.password,
    user.salt,
    (err, hashedPassword) => {
      if (err) {
        return err;
      }
      if (!cryptoUtils.compare(dbUser.password, hashedPassword)) {
        return 'Contraseña incorrecta';
      }
      return 'Contraseña correcta';
    },
  );
}

const update = async (user, userEmail) => {
  if (user.password) {
    const dbUser = await userRepository.find(userEmail);
    console.log(dbUser, 'dbUser');
    const validPassword = checkPassword(user, dbUser);
    console.log(validPassword, 'validPassword');
  }
  return userRepository.update(user, userEmail);
};

export default update;
