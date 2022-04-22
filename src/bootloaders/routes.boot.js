import authRouter from "../routes/auth.js";

export default (app) => {
  app.use("/auth", authRouter);
};
