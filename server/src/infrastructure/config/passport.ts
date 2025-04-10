import passport from 'passport';
import { Request } from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './app';
import { NotFoundException } from '../../shared/utils/appError';
import { ProviderEnum } from '../../domain/enums/accountProvider';
import { processUserAccountFlow } from '../../application/services/auth';

passport.use(
    new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
        passReqToCallback: true,
    }, async (_req: Request, _accessToken: string, _refreshToken: string, profile: any, done: Function) => {
        try {
            const { email, sub: googleId, picture } = profile._json as { email: string; sub: string; picture: string };
            console.log(profile, "profile");
            console.log(googleId, "googleId");
            if (!googleId) {
                throw new NotFoundException("Google ID (sub) is missing.")
            }

            const { user } = await processUserAccountFlow({
                provider: ProviderEnum.GOOGLE,
                displayName: profile.displayName,
                providerId: googleId,
                picture: picture,
                email: email,
            });
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
));

passport.serializeUser((user:any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});