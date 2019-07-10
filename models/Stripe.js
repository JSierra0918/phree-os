module.exports = function(sequelize, Sequelize) {
 
    var Stripe = sequelize.define('Stripe', {
 
        StripeUserId: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        StripeRefreshToken: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });
    Stripe.associate = function(models) {
  
        Stripe.belongsTo(models.User, {
          onDelete: "cascade"
        });

      };

 
    return Stripe;
 
}