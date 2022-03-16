"use strict";
import { Model } from "sequelize";
import IAdType from "../interfaces/i-ad-type";

module.exports = (sequelize: any, DataTypes: any) => {
  class AdType extends Model<IAdType> implements IAdType {
    id!: number;
    name!: string;

    static associate(models: any) {
      AdType.hasMany(models.Ad, {
        foreignKey: "type_id",
        as: "ad",
      });
    }
  }
  AdType.init(
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
      modelName: "AdType",
    }
  );
  return AdType;
};
