export function snakeCaseToTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/_/g, '')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
