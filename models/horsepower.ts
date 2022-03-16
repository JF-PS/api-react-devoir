"use strict";
import { Model } from "sequelize";
import IHorsepower from "../interfaces/i-horsepower";

module.exports = (sequelize: any, DataTypes: any) => {
  class Horsepower extends Model<IHorsepower> implements IHorsepower {
    id!: number;
    name!: string;

    static associate(models: any) {
      Horsepower.hasMany(models.Vehicle, {
        foreignKey: "horsepower_id",
        as: "vehicle",
      });
    }
  }
  Horsepower.init(
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
      modelName: "Horsepower",
    }
  );
  return Horsepower;
};
