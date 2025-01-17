import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { customerAuthService } from '../../services/customer'

export const socialMediaLogin = async () => {
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,
  } = process.env

  passport.use(
    new Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/customers/auth/google/callback`,
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any,
      ) {
        const socialMediaUid = profile.id
        const email = profile.emails[0].value
        const name = profile.displayName
        await customerAuthService.registerGoogle({
          socialMediaUid,
          email,
          name,
        })
        return done(null, profile)
      },
    ),
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/api/customers/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'email'],
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any,
      ) {
        const socialMediaUid = profile.id
        const email = profile.emails[0].value
        const photos = profile.photos[0].value
        const name = profile.displayName
        await customerAuthService.registerGoogle({
          socialMediaUid,
          email,
          name,
        })
        return done(null, profile)
      },
    ),
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}
