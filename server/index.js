const express = require('express')
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Database & Models & Api & Auth
const db = require('./config/database')
require('./models')
const flash = require('connect-flash');
const passport = require('passport')
const api = require("./api")
const expressSession = require('express-session')

app.use(expressSession({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

require('./config/auth')(passport)

app.use("/api", api)

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)

  db
    .sync()
    .then( () => {
      consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
      })
    })
    .catch(err => {
      throw new Error(err);
    });
}
start()
