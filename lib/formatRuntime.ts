export function formatRuntime(minutes: number | null) {
  if (!minutes) return '-';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}min`;
  } else if (hours > 0 && mins === 0) {
    return `${hours}h`;
  } else {
    return `${mins}min`;
  }
}
