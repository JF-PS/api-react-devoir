"use strict";
import { Model } from "sequelize";
import ISerialNumber from "../interfaces/i-serial_number";

module.exports = (sequelize: any, DataTypes: any) => {
  class SerialNumber extends Model<ISerialNumber> implements ISerialNumber {
    id!: number;
    name!: string;

    static associate(models: any) {
      SerialNumber.hasMany(models.Vehicle, {
        foreignKey: "serial_number_id",
        as: "vehicle",
      });
    }
  }
  SerialNumber.init(
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
      modelName: "SerialNumber",
    }
  );
  return SerialNumber;
};
