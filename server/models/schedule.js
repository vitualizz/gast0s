module.exports = (db, DataTypes) => {
  let Schedule = db.define("schedule",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      data: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    })

  return { name: 'Schedule', schema: Schedule }
}
