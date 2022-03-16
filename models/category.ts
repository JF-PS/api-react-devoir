"use strict";
import { Model } from "sequelize";
import ICategory from "../interfaces/i-category";

module.exports = (sequelize: any, DataTypes: any) => {
  class Category extends Model<ICategory> implements ICategory {
    id!: number;
    name!: string;

    static associate(models: any) {
      Category.hasMany(models.Vehicle, {
        foreignKey: "category_id",
        as: "vehicle",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
