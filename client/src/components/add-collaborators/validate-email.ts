export function validateEmail(email: string) {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return email.match(emailRegex);
}
