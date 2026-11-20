/** Chart values are percentages of a 10K axis. */
export function formatPeriodValue(percent: number): string {
  return `${((percent / 100) * 10).toFixed(1)}K`;
}
