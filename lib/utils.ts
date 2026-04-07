import dayjs from "dayjs";

export function formatCurrency(value: number, currency: string = 'GBP'): string {
  try {
    // Ensure we have a valid number
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Invalid number provided');
    }

    // Format as UK currency with exactly 2 decimal places
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  } catch (error) {
    // Fallback formatting if Intl.NumberFormat fails
    console.warn('Currency formatting failed, using fallback:', error);

    // Simple fallback: ensure 2 decimal places and add £ symbol
    const fallbackValue = typeof value === 'number' && !isNaN(value) ? value : 0;
    return `${currency}${fallbackValue.toFixed(2)}`;
  }
}

export const formatSubscriptionDateTime = (value?: string): string => {
  if (!value) return "Not provided";
  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate.format("MM/DD/YYYY") : "Not provided";
};

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};