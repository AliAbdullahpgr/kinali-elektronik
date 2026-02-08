const numberFormatterTR = new Intl.NumberFormat("tr-TR");

export function formatNumberTR(value: number): string {
  return numberFormatterTR.format(value);
}

const currencyFormatters = new Map<string, Intl.NumberFormat>();

export function formatCurrencyTR(value: number, currency = "TRY"): string {
  const formatterKey = currency.toUpperCase();
  if (!currencyFormatters.has(formatterKey)) {
    currencyFormatters.set(
      formatterKey,
      new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: formatterKey,
        maximumFractionDigits: 2,
      })
    );
  }
  return currencyFormatters.get(formatterKey)!.format(value);
}
