"use strict";
import { Model } from "sequelize";
import ISubCategory from "../interfaces/i-sub_category";

module.exports = (sequelize: any, DataTypes: any) => {
  class SubCategory extends Model<ISubCategory> implements ISubCategory {
    id!: number;
    name!: string;

    static associate(models: any) {
      SubCategory.hasMany(models.Vehicle, {
        foreignKey: "sub_category_id",
        as: "vehicle",
      });
    }
  }
  SubCategory.init(
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
      modelName: "SubCategory",
    }
  );
  return SubCategory;
};
