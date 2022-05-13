import crypto from 'crypto';

const createSalt = () => crypto.randomBytes(16);

const encrypt = (password, salt, callback) => crypto.pbkdf2(
  password,
  salt,
  310000,
  32,
  'sha256',
  callback,
);

const compare = (userPassword, dbPassword) => crypto.timingSafeEqual(userPassword, dbPassword);

export default {
  encrypt,
  compare,
  createSalt,
};
