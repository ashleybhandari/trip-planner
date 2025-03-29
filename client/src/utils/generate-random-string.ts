// Generates a random string of the given length
export function generateRandomString(length: number) {
  return Math.random()
    .toString(36)
    .slice(2, length + 2);
}
