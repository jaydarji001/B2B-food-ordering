export const GST_RATE = 0.05; // fixed 5% per assignment spec

export function gstAmount(price) {
  return Math.round(price * GST_RATE * 100) / 100;
}

export function finalPrice(price) {
  return Math.round((price + gstAmount(price)) * 100) / 100;
}

export function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
