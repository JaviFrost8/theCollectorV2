export function getWeekKey() {
  const now = new Date();
  const day = now.getUTCDay();
  const dayToSubtract = day === 0 ? 6 : day - 1;

  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDay() - dayToSubtract);

  const date = String(monday.getUTCDate()).padStart(2, '0');
  const month = String(monday.getUTCMonth()).padStart(2, '0');
  const year = String(monday.getUTCFullYear());

  return `${date}-${month}-${year}`;
}
