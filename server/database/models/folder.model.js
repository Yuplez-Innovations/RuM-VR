
module.exports = (sequelize, DataTypes) => {
    const Folder = sequelize.define("folders", {
        id_folder: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    // Folder.sync({ force: true }).then(() => console.log('FOLDER MODEL CREATED')).catch((err) => console.log('ERROR ' + err))
    return Folder
}

