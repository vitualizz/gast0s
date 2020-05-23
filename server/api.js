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

// === Info Cash (Token)
router.get('/cash', passport.authenticate('jwt', {session: false }), async (req, res) => {
  await
    User.findByPk(req.user.id)
        .then( user => {
          user.getMoney().then( cash => res.json({cash}))
        })
})

// === Create  (Token)
router.post('/cash', passport.authenticate('jwt', {session: false }), async (req, res) => {
  await
    User.findByPk(req.user.id)
        .then( user => {
          req.body.forEach( money => {
            const { name, symbol, amount, expense, date } = money
            user.createMoney({ name, symbol, amount, expense, date })
          })
        })
  res.json({body: req.body})
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

// === Create Cash Settings (Token)
router.post('/settings/cash', passport.authenticate('jwt', {session: false }), async (req, res) => {
  await
    Money.destroy({where: { userId: req.user.id, expense: req.body[0].expense } })
    User.findByPk(req.user.id)
        .then( user => {
          req.body.forEach( money => {
            const { name, symbol, amount, expense, date } = money
            user.createMoney({ name, symbol, amount, expense, date })
          })
        })
  res.json({body: req.body})
})

module.exports = router
