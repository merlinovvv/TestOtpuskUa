export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatPrice(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    uah: "грн",
    usd: "$",
  };

  const formatted = amount.toLocaleString("uk-UA");
  return `${formatted} ${symbols[currency.toLowerCase()] || currency}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
