type Currency = "EUR" | "USD" | "GBP"; // Add more currency codes as needed

const currencySymbol: Record<Currency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  // Add other currencies and their symbols here
};
export const formatCurrencyAmount = (
  amount: number,
  currency: Currency = "EUR",
  locale: string = "de-DE"
) => {
  if (!currencySymbol[currency]) {
    throw new Error(`Currency symbol for ${currency} not found`);
  }

  const formattedAmount = amount.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Check if Intl is available and use it to get the correct decimal separator
  const decimalSeparator =
    typeof Intl !== "undefined"
      ? new Intl.NumberFormat(locale)
          .formatToParts(1.1)
          .find((part) => part.type === "decimal")?.value || "."
      : ".";

  const formattedAmountWithComma = formattedAmount.replace(
    decimalSeparator,
    ","
  );

  return `${formattedAmountWithComma} ${currencySymbol[currency]}`;
};

export const formatAmountToCent = (amount: number): number => {
  return amount * 100;
};

export const formatCentToAmount = (amount: number): number => {
  return amount / 100;
};

export function isInvoiceDue(invoice: Invoice): boolean {
  const dueDate = new Date(invoice.date);
  dueDate.setDate(dueDate.getDate() + 14);
  return dueDate < new Date();
}

export function getStatusPillBgClasses(invoice: Invoice) {
  if (invoice.status === "paid") {
    return "bg-green-400 text-green-900";
  }
  if (isInvoiceDue(invoice)) {
    return "bg-red-400 text-red-900";
  }

  return "bg-amber-200 text-amber-900";
}
