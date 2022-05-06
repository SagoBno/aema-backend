import { getDiffInWeeks } from '../../utils/dates.js';

const validateAvailability = (lastSubmitDate) => getDiffInWeeks(new Date(), lastSubmitDate) >= 2;

export default validateAvailability;
