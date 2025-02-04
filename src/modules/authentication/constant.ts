import { ILoginFormValues } from "./model";

export const initialFormValues: ILoginFormValues = {
  username: "",
  password: "",
};

export const minimumPasswordLength = 4;
export const maximumPasswordLength = 30;

export const minimumUsernameLength = 4;
export const maximumUsernameLength = 30;

export const minimumPasswordLengthValidationMessage =
  "Password must be at least 4 symbols long.";
export const maximumPasswordLengthValidationMessage =
  "Password must be at most 30 symbols long.";

export const minimumUsernameValidationMessage =
  "Username must be at least 4 symbols long.";
export const maximumUsernameValidationMessage =
  "Username must be at most 30 symbols long.";
