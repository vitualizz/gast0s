const Bcrypt = require("bcrypt")

module.exports = (db, DataTypes) => {
  let User = db.define("user",
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
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING
      }
    })

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await Bcrypt.hashSync(user.password, 10)
    user.password = hashedPassword;
  })

  User.prototype.comparePassword = function (candidatePassword, cb) {
    Bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) { return cb(err); }
      cb(null, isMatch);
    })
  }

  return { name: 'User', schema: User };
};
