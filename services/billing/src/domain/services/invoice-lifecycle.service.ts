import { calculateBalanceDue, calculateInvoiceTotals } from '@medsphere/shared';
import { InvoiceStatus } from '../enums/billing.enums';
import { InvalidStateError } from '../errors/billing.errors';
import type { Invoice } from '../entities/invoice.entity';

const FINALIZE_FROM = new Set<InvoiceStatus>([InvoiceStatus.DRAFT]);
const VOID_FROM = new Set<InvoiceStatus>([
  InvoiceStatus.DRAFT,
  InvoiceStatus.ISSUED,
  InvoiceStatus.PARTIALLY_PAID,
]);
const PAYMENT_FROM = new Set<InvoiceStatus>([
  InvoiceStatus.ISSUED,
  InvoiceStatus.PARTIALLY_PAID,
]);

export interface LineItemInput {
  unitPrice: number;
  quantity: number;
}

export class InvoiceLifecycleService {
  assertCanFinalize(invoice: Invoice): void {
    if (!FINALIZE_FROM.has(invoice.status)) {
      throw new InvalidStateError(
        `Cannot finalize invoice in status ${invoice.status}`,
      );
    }
  }

  assertCanVoid(invoice: Invoice): void {
    if (!VOID_FROM.has(invoice.status)) {
      throw new InvalidStateError(`Cannot void invoice in status ${invoice.status}`);
    }
  }

  assertCanApplyPayment(invoice: Invoice): void {
    if (!PAYMENT_FROM.has(invoice.status)) {
      throw new InvalidStateError(
        `Cannot apply payment to invoice in status ${invoice.status}`,
      );
    }
  }

  computeTotals(
    lineItems: LineItemInput[],
    taxAmount = 0,
    discountAmount = 0,
  ): ReturnType<typeof calculateInvoiceTotals> {
    const lineTotals = lineItems.map((li) => li.unitPrice * li.quantity);
    return calculateInvoiceTotals(lineTotals, taxAmount, discountAmount);
  }

  finalize(
    invoice: Invoice,
    now: string,
    lineItems: LineItemInput[],
    taxAmount = 0,
    discountAmount = 0,
  ): { status: InvoiceStatus; totalAmountCents: number; balanceDueCents: number } {
    this.assertCanFinalize(invoice);
    const totals = this.computeTotals(lineItems, taxAmount, discountAmount);
    const totalCents = Math.round(totals.total * 100);
    return {
      status: InvoiceStatus.ISSUED,
      totalAmountCents: totalCents,
      balanceDueCents: totalCents,
    };
  }

  void(invoice: Invoice, reason: string): InvoiceStatus {
    this.assertCanVoid(invoice);
    if (!reason.trim()) {
      throw new InvalidStateError('Void reason is required');
    }
    return InvoiceStatus.VOID;
  }

  applyPayment(
    invoice: Invoice,
    paymentAmountCents: number,
  ): { status: InvoiceStatus; paidAmountCents: number; balanceDueCents: number } {
    this.assertCanApplyPayment(invoice);
    const newPaid = invoice.paidAmountCents + paymentAmountCents;
    const balanceDue = Math.max(0, invoice.totalAmountCents - newPaid);
    let status = InvoiceStatus.PARTIALLY_PAID;
    if (balanceDue === 0) {
      status = InvoiceStatus.PAID;
    }
    return { status, paidAmountCents: newPaid, balanceDueCents: balanceDue };
  }

  writeOff(invoice: Invoice): InvoiceStatus {
    if (invoice.status === InvoiceStatus.VOID || invoice.status === InvoiceStatus.PAID) {
      throw new InvalidStateError(`Cannot write off invoice in status ${invoice.status}`);
    }
    return InvoiceStatus.WRITTEN_OFF;
  }
}

export function deriveInvoiceBalance(totalCents: number, paidCents: number): number {
  return Math.round(calculateBalanceDue(totalCents / 100, paidCents / 100) * 100);
}
