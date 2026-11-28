import { createContext } from "react";

import { type AuthContextValue } from "@/types";

export const AuthContext = createContext({
  user: null,
  setUser: () => { },
  setShowWelcomeModal: () => { },
  availableYears: [],
  setAvailableYears: () => { },
} as AuthContextValue);
