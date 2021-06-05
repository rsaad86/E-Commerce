// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag });
ProductTag.belongsTo(Product);
Product.hasMany(ProductTag);

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag });
ProductTag.belongsTo(Tag);
Tag.hasMany(ProductTag);

//Export the models for use in routes
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
