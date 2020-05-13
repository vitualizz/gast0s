const fs = require('fs');
const Sequelize = require('sequelize')
const db = require('../config/database')

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    let model = require("./" + file)(db, Sequelize);
    global[model.name] = model.schema;
  });
