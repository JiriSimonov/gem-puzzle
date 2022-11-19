export function getRundomNum(min, max) {
  const round = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(round);
}
