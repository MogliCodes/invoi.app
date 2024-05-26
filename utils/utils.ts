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
