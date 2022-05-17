import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

import 'dayjs/locale/es.js';

dayjs.locale('es');

dayjs.extend(utc);

export const formatDate = (date, format = 'ddd, MMM D, YYYY h:mm A') => dayjs(date).format(format);

export const getDiffInWeeks = (dateA, dateB) => dayjs.utc(dateA).diff(dayjs.utc(dateB), 'week');

export const subtractWeeks = (date, weeksToSubtract) => dayjs.utc(date).subtract(weeksToSubtract, 'week');
