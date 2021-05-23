const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Category;
