import { useEffect, useState, type PropsWithChildren } from "react";

import { whoAmI } from "@/api";

import { type User, type WithId } from "@/types";

import { AuthContext } from "./AuthContext";
import WelcomeModal from "./WelcomeModal";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<WithId<User> | null>(null)
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)

  useEffect(() => {
    whoAmI().then((response) => {
      setUser(response.user)
      setAvailableYears(response.availableYears)
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      setShowWelcomeModal,
      availableYears,
      setAvailableYears,
    }}>
      {user == null && <WelcomeModal
        open={showWelcomeModal}
        setOpen={setShowWelcomeModal}
      />}
      {children}
    </AuthContext.Provider>
  );
}
