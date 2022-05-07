export const getEmailIPkey = (username, ip) => `${username}_${ip}`;

export const getRetrySeconds = (rateLimiterInfo, maxAttempts) => {
  let retrySeconds = 0;

  if (
    rateLimiterInfo !== null
    && rateLimiterInfo.consumedPoints > maxAttempts
  ) {
    retrySeconds = Math.round(rateLimiterInfo.msBeforeNext / 1000) || 1;
  }
  return retrySeconds;
};
