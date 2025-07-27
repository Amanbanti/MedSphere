/**
 * Money arithmetic utilities — all amounts in minor units (cents) or Decimal strings.
 */

export type MoneyInput = number | string;

function toCents(value: MoneyInput): number {
  const n = typeof value === 'string' ? parseFloat(value) : value;
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid money value: ${value}`);
  }
  return Math.round(n * 100);
}

function fromCents(cents: number): number {
  return Math.round(cents) / 100;
}

export function addMoney(a: MoneyInput, b: MoneyInput): number {
  return fromCents(toCents(a) + toCents(b));
}

export function subtractMoney(a: MoneyInput, b: MoneyInput): number {
  return fromCents(toCents(a) - toCents(b));
}

export function multiplyMoney(amount: MoneyInput, quantity: number): number {
  if (!Number.isFinite(quantity) || quantity < 0) {
    throw new Error(`Invalid quantity: ${quantity}`);
  }
  return fromCents(Math.round(toCents(amount) * quantity));
}

export function calculateLineTotal(unitPrice: MoneyInput, quantity: number): number {
  return multiplyMoney(unitPrice, quantity);
}

export function calculateInvoiceTotals(lineTotals: MoneyInput[], taxAmount = 0, discountAmount = 0): {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
} {
  const subtotalCents = lineTotals.reduce((sum, lt) => sum + toCents(lt), 0);
  const taxCents = toCents(taxAmount);
  const discountCents = toCents(discountAmount);
  const totalCents = subtotalCents + taxCents - discountCents;
  return {
    subtotal: fromCents(subtotalCents),
    tax: fromCents(taxCents),
    discount: fromCents(discountCents),
    total: fromCents(totalCents),
  };
}

export function calculateBalanceDue(total: MoneyInput, paid: MoneyInput): number {
  return fromCents(Math.max(0, toCents(total) - toCents(paid)));
}

export function allocatePayment(invoiceBalance: MoneyInput, paymentAmount: MoneyInput): {
  applied: number;
  remainder: number;
} {
  const balanceCents = toCents(invoiceBalance);
  const paymentCents = toCents(paymentAmount);
  const appliedCents = Math.min(balanceCents, paymentCents);
  return {
    applied: fromCents(appliedCents),
    remainder: fromCents(paymentCents - appliedCents),
  };
}

export function formatMoney(amount: MoneyInput, currency = 'USD'): string {
  const n = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);
}
