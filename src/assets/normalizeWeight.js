export function normalizeWeight(weight) {
  weight = weight.toString().replace(/\s/g, '');
  return Number(weight).toFixed(2);
}
