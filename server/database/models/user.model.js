
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id_user: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'standard'
        },
        folderAccess: {
            type: DataTypes.STRING
        }
    })
    // User.sync({ force: true }).then(() => console.log('USER MODEL CREATED')).catch((err) => console.log('ERROR ' + err))
    return User
}

