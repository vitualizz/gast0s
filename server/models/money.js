module.exports = (db, DataTypes) => {
  let Money = db.define("money",
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
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expense: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true
      }
    })

  return { name: 'Money', schema: Money }
}
