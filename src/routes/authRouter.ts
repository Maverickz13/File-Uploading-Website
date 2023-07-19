import express, { Router } from 'express';
import passport from "passport";
import myEnv from './../envVar';

const authRouter: Router = express.Router();

/**
 * @swagger
 * /auth/login/success:
 *   get:
 *     summary: API to check login user
 *     responses:
 *       '200':
 *         description: Login Successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
authRouter.get('/login/success', (req, resp) => {
    if (req.user) {
        resp.status(200).json({ message: 'Login Successfull', user: req.user });
    } else {
        resp.status(403).json({ error: true, origError: 'Not Authorized' });
    }
});

authRouter.get('/login/failed', (req, resp) => {
    resp.status(401).json({ error: true, origError: 'Login Failed' });
});

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: myEnv.SWAGGER_URL,
        failureRedirect: "/login/failed",
    })
);

authRouter.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

authRouter.get("/logout", (req, resp) => {
    req.logout((err: any) => {
        console.log('logout');
    });
    resp.redirect(myEnv.LOGOUT_URL)
}
);

export default authRouter;
