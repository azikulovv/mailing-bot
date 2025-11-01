export function isValidPhoneNumber(text: string): boolean {
  return /^\+?\d{7,15}$/.test(text.trim());
}
