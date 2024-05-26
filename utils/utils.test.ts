import { describe, expect, test } from "vitest";
import { formatCurrencyAmount } from "./utils";

describe("Utils", () => {
  test("format amount of money to currency amount string", () => {
    expect(formatCurrencyAmount(0)).toBe("0,00 €");
    expect(formatCurrencyAmount(1)).toBe("1,00 €");
    expect(formatCurrencyAmount(999)).toBe("999,00 €");
    expect(formatCurrencyAmount(1000)).toBe("1.000,00 €");
    expect(formatCurrencyAmount(1000000)).toBe("1.000.000,00 €");
    expect(formatCurrencyAmount(50.5)).toBe("50,50 €");
  });
});
