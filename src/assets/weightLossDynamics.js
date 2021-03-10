import { normalizeWeight } from './normalizeWeight';

export function weightLossDynamics(diff) {
  let result = null;
  if (diff > 0) {
    result = `<span class="weighting__dynamics weighting__dynamics_plus">+${normalizeWeight(
      diff,
    )}</span>`;
  } else if (diff < 0) {
    result = `<span class="weighting__dynamics weighting__dynamics_minus">-${normalizeWeight(
      Math.abs(diff),
    )}</span>`;
  } else {
    result = `<span class="weighting__dynamics weighting__dynamics_unchanged">${normalizeWeight(
      diff,
    )}</span>`;
  }
  return result;
}
