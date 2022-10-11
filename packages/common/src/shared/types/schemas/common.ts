export interface TValidationError {
  path: string[]; // the first one is the key
  property: string; // instance.path
  message: string; // what cause an error
  schema: {
    type: string; // type of value to expect
    required?: boolean;
    title?: string; // title that we set
  };
  name: string; // required -> trigger this error
  stack: string; // instance.password is required
}
