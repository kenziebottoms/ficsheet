import { type User } from "../../../src/types.ts";

import { selectUserByUsername } from "../../db/queries.ts";

import { verifyPassword } from "./password.ts";

var passport = require("passport");
var LocalStrategy = require("passport-local");

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(
  new LocalStrategy(
    (
      username = "",
      password = "",
      callback: (
        error: unknown | null,
        user?: User | false,
        context?: { message: string } | null,
      ) => void,
    ) => {
      if (!username) {
        return callback(null, false, {
          message: "Please provide a username.",
        });
      }
      if (!password) {
        return callback(null, false, {
          message: "Please provide a password.",
        });
      }
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
