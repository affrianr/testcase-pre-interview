"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employee.belongsTo(models.position, {
        foreignKey: "job_position",
        as: "position",
      });
      employee.belongsTo(models.employee, {
        foreignKey: "manager",
        as: "manager_employee",
      });
    }
  }
  employee.init(
    {
      emp_code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Name is required`,
          },
          notNull: {
            msg: `Name is required`,
          },
        },
      },
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      employment_type: DataTypes.STRING,
      join_date: DataTypes.DATEONLY,
      job_position: DataTypes.INTEGER,
      manager: DataTypes.STRING,
      last_updated: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "employee",
      tableName: "employee",
      timestamps: false,
    }
  );
  return employee;
};
