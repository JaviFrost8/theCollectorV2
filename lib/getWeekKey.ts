export function getWeekKey() {
  const now = new Date();

  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);

  const date = String(monday.getDate()).padStart(2, '0');
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const year = monday.getFullYear();

  return `${date}-${month}-${year}`;
}
