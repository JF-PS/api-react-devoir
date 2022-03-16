"use strict";
import { Model } from "sequelize";
import IBrand from "../interfaces/i-brand";

module.exports = (sequelize: any, DataTypes: any) => {
  class Brand extends Model<IBrand> implements IBrand {
    id!: number;
    name!: string;

    static associate(models: any) {
      Brand.hasMany(models.Vehicle, {
        foreignKey: "brand_id",
        as: "vehicle",
      });
    }
  }
  Brand.init(
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
      modelName: "Brand",
    }
  );
  return Brand;
};
