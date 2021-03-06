const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {
  jwtFromRequest:  ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretJWT || 'secret'
}

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({
      where: {
        id: jwt_payload.id
      }
    })
      .then(user => {
        if (user) {
          return done(null, user)
        } 
          return done(null, false)
        })
          .catch(err => {
            console.log(err)
            return done(err, false)
        })
  }))
}

