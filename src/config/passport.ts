import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import myEnv from './../envVar'

const configurePassport = () => {
  passport.use(
    new Strategy({
      clientID: myEnv.CLIENT_ID,
      clientSecret: myEnv.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
      (accessToken, refreshToken, profile, callback) => {
        callback(null, profile)
      })
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}
export default configurePassport;