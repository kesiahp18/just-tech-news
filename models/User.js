const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

//define table columns and configuration
User.init(
    {
        id: {
            //sequelize DataTypes object provides the type of object
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //do not allow any duplicate email values in this table
            unique: true,
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //sets the password length minimum
                len: [4]
            }
        }
    },
    {
        //TABLE CONFIGURATION OPTIONS HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
        sequelize,
        //pass in imported sequelize connection (the direct connection to database)
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //don't pluralize name of databas table
        underscored: true,
        //make it so model name stays lowercase in the database
        modelName: 'user'
    }
)

module.exports = User;