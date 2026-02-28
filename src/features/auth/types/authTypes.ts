
export type RegisterError = {
  name?:string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type RegisterKeys = keyof RegisterError;

export type RegisterInput = {
  name: RegisterKeys;
  label: string;
  type: string;
};

export type LoginError = {
  email?:string;
  password?:string;
}

type LoginKeys = keyof LoginError;

export type LoginInput = {
  name : LoginKeys;
  label:string;
  type:string;
}