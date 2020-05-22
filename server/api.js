const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require('jsonwebtoken')

// ===== AUTH =====

// === Login
router.post('/login', passport.authenticate('login', {session: false}), async (req, res) => {
  const user_id = req.user.id

  const payload = { id: user_id }

  const token = jwt.sign(payload, process.env.secretJWT || 'secret')
  await
    res.status(200).send({payload, data: { token: token }})
})


// === Register
router.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body
  await
    User.create({ fname, lname, email, password })
      .then( user => res.json({ user, msg: 'Cuenta creada satisfactoriamente.'}))
      .catch( err => res.json({ err, msg: 'Error al crear cuenta.'}))
})

// ====== Routes ======

// === Info User (Token)
router.get('/me', passport.authenticate('jwt', {session: false }), async (req, res) => {
  await
    res.status(200).send({user: req.user})
})

// === Create Setting (Token)
router.post('/settings', passport.authenticate('jwt', {session: false }), async (req, res) => {
  const { currency, symbol, places, separator, decimal } = req.body
  await
    User.findByPk(req.user.id)
        .then( user => {
          user.createSetting({ currency, symbol, places, separator, decimal })
              .then( setting => res.json({ setting, msg: 'Configuracion creada' }) )
        })
})

module.exports = router
