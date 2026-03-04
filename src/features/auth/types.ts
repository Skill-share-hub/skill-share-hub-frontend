import type { LogFormData, RegFormData } from "./validations";

type LoginKeys = keyof LogFormData;
type RegisterKeys = keyof RegFormData;

export type LoginInput = {
  name: LoginKeys;
  label: string;
  type: string;
};

export type RegisterInput = {
  name: RegisterKeys;
  label: string;
  type: string;
};