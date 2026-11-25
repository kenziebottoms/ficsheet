import { useState, type SubmitEventHandler } from "react";
import { Login, PersonAdd } from "@mui/icons-material";

import Button from "@/components/Button";
import Input from "@/components/Input";

import { submitLogInForm, submitSignUpForm } from './api'

const AuthForm = ({
  signUp: _signUp = false,
  className = '',
  onCompleted = () => { }
}: {
  signUp?: boolean;
  className?: string;
  onCompleted?: () => void;
}) => {
  const [signUp, setSignUp] = useState(_signUp)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    setError(null)

    // Prevent the browser from reloading the page
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries()) as Record<string, string>;

    if (signUp && formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.")
    }

    if (formData.email) {
      return submitSignUpForm({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).then(onCompleted)
    } else {

      return submitLogInForm({
        username: formData.username,
        password: formData.password
      }).then(onCompleted)
    }
  }

  return <form onSubmit={handleSubmit} className={`${className} flex flex-col gap-4 rounded-md p-3`}>
    <h3 className="flex flex-row items-center justify-between">
      {signUp ? "Sign Up" : "Log In"}
      <Button
        style="secondary"
        onClick={() => setSignUp(!signUp)}
        icon={signUp ? Login : PersonAdd}
      >
        {signUp ? "Log in" : "Sign up"}
      </Button>
    </h3>
    {signUp && <Input
      name="email"
      type="email"
      label="Email"
    />}
    <Input
      name="username"
      type="text"
      label="Username"
    />
    <Input
      name="password"
      type="password"
      label="Password"
    />
    {signUp && <Input
      name="confirmPassword"
      type="password"
      label="Confirm Password"
    />}

    {error !== null && <div className="text-secondary">{error}</div>}

    <Button
      style="primary"
      type="submit"
      icon={signUp ? PersonAdd : Login}
    >
      {signUp ? "Sign up" : "Log in"}
    </Button>
  </form>
}

export default AuthForm