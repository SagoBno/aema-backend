import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// import psychologistCases from '../../uses-cases/user/index.js';

const editUserInfo = async (req, res) => {
  if (!req.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(ReasonPhrases.UNAUTHORIZED);
  }
  await app.db.User.update(req.body, {
    where: {
      email: req.user.email,
    },
  });
  return res.status(StatusCodes.OK).send('Perfil actualizado correctamente');
};

export default editUserInfo;
