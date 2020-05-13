const fs = require('fs');
const Sequelize = require('sequelize');

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    let model = require("./" + file)(Sequelize);
    global[model.name] = model.schema;
  });
