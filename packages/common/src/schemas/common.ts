import type { TValidationError } from "../shared/types/schemas/common";

export function convertJsonSchemaErrorsToDestructableObject(
  validation_errors: TValidationError[]
): Record<string, string> {
  return validation_errors.reduce((acc: Record<string, string>, error) => {
    return Object.assign(acc, {
      [error.path[0]]: `${error.path[0]} ${error.message}`,
    });
  }, {});
}
