export type LogInFormValues = {
  username: string;
  password: string;
};

export type SignUpFormValues = LogInFormValues & {
  email: string;
  confirmPassword: string;
};
