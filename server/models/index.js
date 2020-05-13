const fs = require('fs');
const Sequelize = require('sequelize');
const models = {}

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    let model = require("./" + file)(Sequelize);
    models[model.name] = model.schema;
  });

global.MODELS = models
