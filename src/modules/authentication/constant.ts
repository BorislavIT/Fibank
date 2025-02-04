import { requiredFieldMessage } from "../../shared/constant";
import { ILoginFormValues } from "./model";

import * as Yup from "yup";

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

export const signInSchema = Yup.object().shape({
  username: Yup.string()
    .min(minimumUsernameLength, minimumUsernameValidationMessage)
    .max(maximumUsernameLength, maximumUsernameValidationMessage)
    .required(requiredFieldMessage),
  password: Yup.string()
    .min(minimumPasswordLength, minimumPasswordLengthValidationMessage)
    .max(maximumPasswordLength, maximumPasswordLengthValidationMessage)
    .required(requiredFieldMessage),
});
