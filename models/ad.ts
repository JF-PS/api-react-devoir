"use strict";
import { Model } from "sequelize";
import IAd from "../interfaces/i-ad";

module.exports = (sequelize: any, DataTypes: any) => {
  class Ad extends Model<IAd> implements IAd {
    id!: number;
    title!: string;
    description!: string;
    vehicle_id!: number;
    picture_id!: number;
    user_id!: number;
    type_id!: number;
    address!: string;
    price!: number;

    static associate(models: any) {
      Ad.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Ad.belongsTo(models.Vehicle, {
        foreignKey: "vehicle_id",
        as: "vehicle",
      });

      Ad.belongsTo(models.AdType, {
        foreignKey: "type_id",
        as: "type",
      });

      Ad.hasOne(models.AdPicture, {
        as: "adPicture",
        foreignKey: "ad_id",
      });

      Ad.hasMany(models.AdPicture, {
        as: "AdPictures",
        foreignKey: "ad_id",
      });
    }
  }

  Ad.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      vehicle_id: DataTypes.INTEGER,
      picture_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      address: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Ad",
    }
  );
  return Ad;
};
