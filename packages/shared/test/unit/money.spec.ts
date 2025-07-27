import { describe, expect, it } from 'vitest';
import {
  addMoney,
  allocatePayment,
  calculateBalanceDue,
  calculateInvoiceTotals,
  calculateLineTotal,
  multiplyMoney,
  subtractMoney,
} from '@medsphere/shared';

describe('money math', () => {
  it('adds amounts with cent precision', () => {
    expect(addMoney(10.01, 0.02)).toBe(10.03);
  });

  it('subtracts amounts', () => {
    expect(subtractMoney(100, 33.33)).toBe(66.67);
  });

  it('multiplies line totals', () => {
    expect(multiplyMoney(49.99, 3)).toBe(149.97);
  });

  it('calculates line total from unit price and quantity', () => {
    expect(calculateLineTotal(25.5, 4)).toBe(102);
  });

  it('calculates invoice totals with tax and discount', () => {
    const result = calculateInvoiceTotals([100, 50], 12, 10);
    expect(result.subtotal).toBe(150);
    expect(result.total).toBe(152);
  });

  it('calculates balance due', () => {
    expect(calculateBalanceDue(200, 75)).toBe(125);
    expect(calculateBalanceDue(50, 100)).toBe(0);
  });

  it('allocates payment to invoice balance', () => {
    expect(allocatePayment(100, 40)).toEqual({ applied: 40, remainder: 0 });
    expect(allocatePayment(30, 50)).toEqual({ applied: 30, remainder: 20 });
  });
});
