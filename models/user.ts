"use strict";
import { Model } from "sequelize";
import IUser from "../interfaces/i-user";

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUser> implements IUser {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    validation!: boolean;
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      validation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
