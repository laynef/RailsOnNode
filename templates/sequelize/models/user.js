'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        underscored: true,
    });
    User.associate = function (models) {
    // associations can be defined here
    };
    return User;
};
