"use strict";
import { Model } from "sequelize";
import IVehicle from "../interfaces/i-vehicle";

module.exports = (sequelize: any, DataTypes: any) => {
  class Vehicle extends Model<IVehicle> implements IVehicle {
    id!: number;
    category_id!: number;
    sub_category_id!: number;
    brand_id!: number;
    serial_number_id!: number;
    gas_id!: number;
    horsepower_id!: number;
    year!: string;
    date_circulation!: string;
    kilometers!: number;

    static associate(models: any) {
      Vehicle.hasOne(models.Ad, {
        foreignKey: "vehicle_id",
        as: "ad",
      });

      Vehicle.belongsTo(models.Gas, {
        foreignKey: "gas_id",
        as: "gas",
      });

      Vehicle.belongsTo(models.SerialNumber, {
        foreignKey: "serial_number_id",
        as: "serialNumber",
      });

      Vehicle.belongsTo(models.Horsepower, {
        foreignKey: "horsepower_id",
        as: "horsepower",
      });

      Vehicle.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      Vehicle.belongsTo(models.SubCategory, {
        foreignKey: "sub_category_id",
        as: "subCategory",
      });

      Vehicle.belongsTo(models.Brand, {
        foreignKey: "brand_id",
        as: "brand",
      });
    }
  }
  Vehicle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_id: DataTypes.INTEGER,
      sub_category_id: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      serial_number_id: DataTypes.INTEGER,
      gas_id: DataTypes.INTEGER,
      horsepower_id: DataTypes.INTEGER,
      year: DataTypes.STRING,
      date_circulation: DataTypes.STRING,
      kilometers: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
