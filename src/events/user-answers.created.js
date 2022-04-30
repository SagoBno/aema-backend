import { URL } from "url";

import ResultController from "../controllers/Result.js";

const { pathname } = new URL(import.meta.url);
const fileName = pathname.split("/").pop();
const eventName = fileName.slice(0, -3);

export const handler = async (userAnswers, userId) => {
  const total = userAnswers.reduce(
    (acc, { dataValues: { value } }) => value + acc,
    0
  );
  return await ResultController.create({
    total,
    userId,
  });
};

const userAnswersCreated = (...payload) =>
  app.eventBus.dispatch(eventName, payload);

export default userAnswersCreated;
