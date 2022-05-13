import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const nodeCrypto = require('node:crypto');

const createSalt = () => nodeCrypto.randomBytes(16);

const encrypt = (password, salt) => new Promise((resolve, reject) => {
  nodeCrypto.pbkdf2(
    password,
    salt,
    310000,
    32,
    'sha256',
    (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    },
  );
});

const compare = (userPassword, dbPassword) => nodeCrypto.timingSafeEqual(userPassword, dbPassword);

export default {
  encrypt,
  compare,
  createSalt,
};
