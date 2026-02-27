
export type ErrorType = {
  email?: string;
  password?: string;
  confPassword?: string;
};

type FormKeys = keyof ErrorType;

export type InputType = {
  name: FormKeys;
  label: string;
  type: string;
};