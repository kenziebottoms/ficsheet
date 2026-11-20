import { useState } from "react";
import { Login, PersonAdd } from "@mui/icons-material";

import Button from "@/components/Button";
import Input from "@/components/Input";

const AuthForm = ({
  signUp: _signUp = false,
  className = '',
}: {
  signUp?: boolean;
  className?: string;
}) => {
  const [signUp, setSignUp] = useState(_signUp)

  return <div className={`${className} flex flex-col gap-4 rounded-md p-3`}>
    <h3 className="flex flex-row items-center justify-between">
      {signUp ? "Sign Up" : "Log In"}
      <Button
        style="primary"
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
  </div>
}

export default AuthForm