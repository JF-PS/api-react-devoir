"use strict";
import { Model } from "sequelize";
import IAdPicture from "../interfaces/i-ad-pictures";

module.exports = (sequelize: any, DataTypes: any) => {
  class AdPicture extends Model<IAdPicture> implements IAdPicture {
    id!: number;
    ad_id!: number;
    source!: string;

    static associate(models: any) {
      AdPicture.belongsTo(models.Ad, {
        as: "picture",
        foreignKey: "ad_id",
      });
    }
  }
  AdPicture.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ad_id: DataTypes.INTEGER,
      source: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AdPicture",
    }
  );
  return AdPicture;
};
