export function isValidEmail(email_address: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return emailRegex.test(email_address);
}

export function isValidPassword(password: string): boolean {
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  return passwordRegex.test(password);
}

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}