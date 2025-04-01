// Formats a number as a price in USD
export function formatAsUsd(amount?: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount ?? 0);
}
