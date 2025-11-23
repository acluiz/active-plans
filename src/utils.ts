export const isActiveSubscription = (dateStr: string) => {
  const lastPayment = new Date(dateStr);
  const today = new Date();

  const diffMs = today.getTime() - lastPayment.getTime();
  const maxDays = 30;

  const thirtyDaysMs = maxDays * 24 * 60 * 60 * 1000;

  return diffMs <= thirtyDaysMs;
};
