var Bcrypt = require("bcrypt");
module.exports = (DataTypes) => {
  let User = DATABASE.define("user",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        set(val) {
          let hashedPassword = Bcrypt.hashSync(val, 10);
          return this.setDataValue("password", hashedPassword);
        }
      }
    });

  User.prototype.isValidPassword = async (password) => {
    return await Promise((resolve, reject) => {
      Bcrypt.compare(password, this.password, function (error, isMatch) {
        if (error) {
          reject(error)
        }
        resolve(isMatch)
      });
    })
  }

  return { name: 'User', schema: User };
};
