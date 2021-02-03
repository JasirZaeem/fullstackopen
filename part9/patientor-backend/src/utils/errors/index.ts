export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const invalidOrMissingMessage = (
  fieldName: string,
  erroneousValue: unknown
): string => {
  return `Invalid or missing ${fieldName} ${erroneousValue as string}`;
};
