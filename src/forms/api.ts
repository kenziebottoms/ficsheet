import { post } from "@/api";

import type { User, WithId } from "@/types";
import type { LogInFormValues, SignUpFormValues } from "./types";

export const submitSignUpForm = (
  formData: Omit<SignUpFormValues, "confirmPassword">,
) =>
  post<Omit<SignUpFormValues, "confirmPassword">, WithId<User>>(
    `signup`,
    formData,
  );

export const submitLogInForm = (formData: LogInFormValues) =>
  post<LogInFormValues, WithId<User>>("login", formData);
