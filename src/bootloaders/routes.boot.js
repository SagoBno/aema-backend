import authRouter from "../routes/auth.js";
import formRouter from "../routes/beck.js";

export default (app) => {
  app.use("/auth", authRouter);
  app.use("/beck", formRouter);
};
