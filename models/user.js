module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        netid: {type: DataTypes.STRING, unique: true},
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Course);
                User.hasMany(models.Checkin);
            }
        },
        setterMethods: {
            netid: function(netid) {
                return this.setDataValue('netid', netid.toLowerCase());
            }
        }
    });
    return User;
};
