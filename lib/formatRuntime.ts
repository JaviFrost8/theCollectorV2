export function formatRuntime(minutes: number | null) {
  if (!minutes) return '';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
}
