const express = require("express")
const router = express.Router()
const passport = require("passport")

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash : true
}))

router.get("/users", async (req, res) => {
  await
    User.findAll()
      .then( users => res.send(users))
      .catch( err => res.status(400).send({ message: err.message }) )
})

router.post("/users", async (req, res) => {
  const { fname, lname, email, password } = req.body
  await
    User.create({ fname, lname, email, password })
      .then( user => res.json({ user, msg: 'Cuenta creada satisfactoriamente.'}))
      .catch( err => res.json({ err, msg: 'Error al crear cuenta.'}))
})

module.exports = router
