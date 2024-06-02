import { describe, expect, test } from "vitest";
import { formatCurrencyAmount, isInvoiceDue } from "./utils";

describe("Utils", () => {
  test("format amount of money to currency amount string", () => {
    expect(formatCurrencyAmount(0)).toBe("0,00 €");
    expect(formatCurrencyAmount(1)).toBe("1,00 €");
    expect(formatCurrencyAmount(999)).toBe("999,00 €");
    expect(formatCurrencyAmount(1000)).toBe("1.000,00 €");
    expect(formatCurrencyAmount(1000000)).toBe("1.000.000,00 €");
    expect(formatCurrencyAmount(50.5)).toBe("50,50 €");
  });

  test("isInvoiceDue", () => {
    const invoice = {
      _id: "66525918c1468d419e713fdb",
      nr: "2024-001",
      client: "CLient",
      title: "Rechnung Januar 2024",
      date: new Date(),
      performancePeriodStart: "2024-05-25T00:00:00.000Z",
      performancePeriodEnd: "2024-05-25T00:00:00.000Z",
      items:
        '[{"position":1,"description":"<p>Wartung und Pflege</p>","hours":7000,"factor":"4.00","total":28000}]',
      total: 28000,
      taxes: 5320,
      totalWithTaxes: 33320,
      user: "6652501f2d7789c03fe430b0",
      isReverseChargeInvoice: false,
      project: "",
      status: "",
      storagePath: "",
    };
    expect(isInvoiceDue(invoice)).toBe(false);
  });
});
