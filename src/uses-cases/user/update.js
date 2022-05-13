import bcrypt from 'bcrypt';

import userRepository from '../../repositories/user.js';

const update = async (userParam, userEmail) => {
  const user = userParam;
  if (user.password) {
    const dbUser = await userRepository.find(userEmail);
    const rightPassword = bcrypt.compare(user.password, dbUser.password);
    if (!rightPassword) return 'Contraseña incorrecta';
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
  return userRepository.update(user, userEmail);
};

export default update;
