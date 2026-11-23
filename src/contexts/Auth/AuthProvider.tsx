import { useState, type PropsWithChildren } from "react";

import { type User, type WithId } from "@/types";

import { AuthContext } from "./AuthContext";
import WelcomeModal from "./WelcomeModal";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<WithId<User> | null>(null)
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      setShowWelcomeModal,
    }}>
      {user == null && <WelcomeModal
        open={showWelcomeModal}
        setOpen={setShowWelcomeModal}
      />}
      {children}
    </AuthContext.Provider>
  );
}
