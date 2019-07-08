
module.exports = function(sequelize, Sequelize) {
 
    var Item = sequelize.define('Item', {
 
        itemname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        price: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
 
        quantity: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        counter: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            defaultValue: 1
            
        },


    });

    Item.associate = function(models) {
  
        Item.belongsTo(models.Category, {
          onDelete: "cascade"
        });

      };
 
    return Item;
 
}