import { Router } from "express";
import passport from "passport";
import { config } from "../../infrastructure/config/app";
import { googleLoginCallback } from "../controllers/auth";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`

const authRoute = Router();

authRoute.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);

authRoute.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: failedUrl,
    }),
    googleLoginCallback,
)

export default authRoute;