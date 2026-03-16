export function getWeekKey() {
  const now = new Date();

  const day = now.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;

  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diff);

  const date = String(monday.getUTCDate()).padStart(2, '0');
  const month = String(monday.getUTCMonth() + 1).padStart(2, '0');
  const year = monday.getUTCFullYear();

  return `${date}-${month}-${year}`;
}
