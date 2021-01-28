const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    //set up methos to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

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
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
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