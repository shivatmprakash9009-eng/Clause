import { describe, expect, it } from 'vitest';
import { formatPeriodValue } from './format';

describe('formatPeriodValue', () => {
  it('maps percent of a 10K axis to a label', () => {
    expect(formatPeriodValue(100)).toBe('10.0K');
    expect(formatPeriodValue(46)).toBe('4.6K');
    expect(formatPeriodValue(0)).toBe('0.0K');
  });
});
