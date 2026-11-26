import { type User } from "../../../src/types.ts";

import { selectUserByUsername } from "../../db/queries.ts";

import { verifyPassword } from "./password.ts";

var passport = require("passport");
var LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(
    (
      username: string,
      password: string,
      callback: (
        error: unknown | null,
        user?: User | false,
        context?: { message: string } | null,
      ) => void,
    ) => {
      const user = selectUserByUsername(username);
      if (!user) {
        return callback(null, false, {
          message: "Incorrect username or password.",
        });
      }

      verifyPassword(password, user)
        .catch(callback)
        .then((passwordIsValid) => {
          if (passwordIsValid) {
            return callback(null, user);
          }
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
        });
    },
  ),
);

export default passport;
