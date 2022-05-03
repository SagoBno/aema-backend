import { URL } from 'url';

import resultCases from '../uses-cases/result/index.js';

const { pathname } = new URL(import.meta.url);
const fileName = pathname.split('/').pop();
const eventName = fileName.slice(0, -3);

export const handler = async (userAnswers, userId) => resultCases
  .createByUserAnswers(userAnswers, userId);

const userAnswersCreated = (...payload) => app.eventBus.dispatch(eventName, payload);

export default userAnswersCreated;
