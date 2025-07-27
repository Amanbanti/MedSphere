import { describe, expect, it } from 'vitest';
import { InvoiceStatus } from '../../src/domain/enums/billing.enums';
import { Invoice } from '../../src/domain/entities/invoice.entity';
import { InvoiceLifecycleService } from '../../src/domain/services/invoice-lifecycle.service';

const NOW = '2026-07-27T12:00:00.000Z';

function draftInvoice(): Invoice {
  return Invoice.register({
    id: 'inv-1',
    organizationId: 'org-1',
    now: NOW,
    patientId: 'pat-1',
    encounterId: null,
    totalAmountCents: 0,
    paidAmountCents: 0,
    currency: 'USD',
    status: InvoiceStatus.DRAFT,
    dueDate: '2026-08-27',
  });
}

describe('InvoiceLifecycleService', () => {
  const service = new InvoiceLifecycleService();

  it('finalizes draft invoice with computed totals', () => {
    const invoice = draftInvoice();
    const result = service.finalize(invoice, NOW, [{ unitPrice: 100, quantity: 2 }], 10, 5);
    expect(result.status).toBe(InvoiceStatus.ISSUED);
    expect(result.totalAmountCents).toBe(20500);
    expect(result.balanceDueCents).toBe(20500);
  });

  it('voids issued invoice', () => {
    const invoice = Invoice.create({
      ...draftInvoice().toProps(),
      status: InvoiceStatus.ISSUED,
      totalAmountCents: 10000,
    });
    expect(service.void(invoice, 'Duplicate')).toBe(InvoiceStatus.VOID);
  });

  it('rejects void without reason', () => {
    const invoice = Invoice.create({ ...draftInvoice().toProps(), status: InvoiceStatus.ISSUED });
    expect(() => service.void(invoice, '  ')).toThrow();
  });

  it('applies partial payment', () => {
    const invoice = Invoice.create({
      ...draftInvoice().toProps(),
      status: InvoiceStatus.ISSUED,
      totalAmountCents: 10000,
      paidAmountCents: 0,
    });
    const result = service.applyPayment(invoice, 4000);
    expect(result.status).toBe(InvoiceStatus.PARTIALLY_PAID);
    expect(result.paidAmountCents).toBe(4000);
    expect(result.balanceDueCents).toBe(6000);
  });

  it('marks paid when fully settled', () => {
    const invoice = Invoice.create({
      ...draftInvoice().toProps(),
      status: InvoiceStatus.PARTIALLY_PAID,
      totalAmountCents: 10000,
      paidAmountCents: 6000,
    });
    const result = service.applyPayment(invoice, 4000);
    expect(result.status).toBe(InvoiceStatus.PAID);
    expect(result.balanceDueCents).toBe(0);
  });
});
