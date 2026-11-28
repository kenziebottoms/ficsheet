import { type WithId, type User } from "../../../src/types.ts";

import { selectUserByUsername } from "../../db/queries.ts";
import type { ApiError, PassportCallback } from "../../types.ts";

import { verifyPassword } from "./password.ts";

var passport = require("passport");
var LocalStrategy = require("passport-local");

export const VAGUE_INVALID_LOGIN_RESPONSE: ApiError = {
  status: 401,
  message: "Incorrect username or password.",
};

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
    (username: string, password: string, callback: PassportCallback) => {
      if (!username || !password) {
        return callback({
          status: 400,
          message: "Please provide a username and a password.",
        });
      }
      const user = selectUserByUsername(username);
      if (!user) {
        console.log(`No such user '${username}'`);
        return callback(VAGUE_INVALID_LOGIN_RESPONSE);
      }

      console.log(`Verifying password for user '${username}'`);
      verifyPassword(password, user)
        .then((passwordIsValid) => {
          if (!passwordIsValid) {
            console.log(`Invalid password for user '${username}'`);
            return callback(VAGUE_INVALID_LOGIN_RESPONSE);
          }

          return callback(null, {
            id: user.id,
            username: user.username,
          });
        })
        .catch(callback);
    },
  ),
);

/* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 *
 * As the user interacts with the app, subsequent requests will be authenticated
 * by verifying the session.  The same user information that was serialized at
 * session establishment will be restored when the session is authenticated by
 * the `deserializeUser` function.
 */
passport.serializeUser(function (
  user: WithId<User>,
  callback: PassportCallback,
) {
  process.nextTick(function () {
    callback(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (
  user: WithId<User>,
  callback: PassportCallback,
) {
  process.nextTick(function () {
    return callback(null, user);
  });
});

export default passport;
