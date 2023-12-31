const currencySymbol = {
  EUR: "€",
};
export const formatCurrencyAmount = (
  amount: number,
  currency: string = "EUR",
  locale: string = "de-DE"
) => {
  return (
    amount
      .toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/\.(?=.*\.)/, ",") +
    " " +
    currencySymbol[currency]
  );
};

export const formatAmountToCent = (amount: number): number => {
  return amount * 100;
};

export const formatCentToAmount = (amount: number): number => {
  return amount / 100;
};
