const fs = require('fs');
const Sequelize = require('sequelize')
const db = require('../config/database')

fs.readdirSync(__dirname)
  .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach(file => {
    let model = require("./" + file)(db, Sequelize);
    global[model.name] = model.schema;
  });

Setting.belongsTo(User)
User.hasOne(Setting, { foreignKey: 'userId'})

Money.belongsTo(User)
User.hasMany(Money, { foreignKey: 'userId'})
Schedule.hasMany(Money, { foreignKey: 'scheduleId' })

Schedule.belongsTo(User)
User.hasMany(Schedule, { foreignKey: 'userId' })
