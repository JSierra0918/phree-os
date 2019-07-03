    
module.exports = function(sequelize, Sequelize) {
 
    var Category = sequelize.define('Category', {
 
        categoryName: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });

    Category.associate = function(models) {
  
        Category.belongsTo(models.Category, {
          onDelete: "cascade"
        });
        Category.hasMany(models.Item, {
            onDelete: "cascade"
        });

      };
 
    return Category;
 
}