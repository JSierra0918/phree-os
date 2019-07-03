module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('User', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        storename: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        stripeKey: {
            type: Sequelize.STRING,
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        } 
    });

    User.associate = function(models) {
  
        User.hasMany(models.Category, {
          onDelete: "cascade"
        });
        // User.hasMany(models.URLresult, {
        //     onDelete: "cascade"
        // });
        // User.hasMany(models.IMGresult, {
        //     onDelete: "cascade"
        // });
      };
 
    return User;
 
}