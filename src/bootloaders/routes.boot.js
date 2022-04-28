import authRouter from "../routes/auth.js";
import formRouter from "../routes/beck.js";

export default (app) =>
  new Promise((resolve) => {
    app.server.use("/auth", authRouter);
    app.server.use("/beck", formRouter);
    resolve(app);
  });
