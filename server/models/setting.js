
module.exports = (db, DataTypes) => {
  let Setting = db.define("setting",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      places: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      separator: {
        type: DataTypes.STRING,
        allowNull: false
      },
      decimal: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })

  return { name: 'Setting', schema: Setting }
}
