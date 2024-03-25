const { Op } = require("sequelize");
const { employee, position } = require("../models");

class EmployeeController {
  static async getEmployee(req, res, next) {
    try {
      let { page, sort, filters } = req.query;
      console.log(page);
      // pagination
      if (!Number(page)) {
        page = 1;
      }
      let limit = 5;

      let options = {
        limit,
        offset: (+page - 1) * limit,
        include: [
          { model: employee, as: "manager_employee", attributes: ["name"] },
          { model: position, as: "position", attributes: ["name"] },
        ],
      };

      //sorting
      if (!sort) {
        sort = "emp_code";
      }
      if (sort !== "" && typeof sort !== "undefined") {
        // validate req query
        if (sort.charAt(0) !== "-") {
          options.order = [[sort, "ASC"]];
        } else {
          options.order = [
            [sort.slice(1), "DESC"], // remove minus(-)
          ];
        }
      }
      if (filters !== "" && typeof filters !== "undefined") {
        if (Object.keys(filters).length > 0) {
          const filterOptions = {};

          Object.keys(filters).forEach((key) => {
            const query = filters[key].split(",").map((item) => ({
              [Op.eq]: item,
            }));

            filterOptions[key] = { [Op.or]: query };
          });

          options.where = filterOptions;
        }
      }
      console.log(options);

      const { count, rows } = await employee.findAndCountAll(options);
      if (!count) {
        throw { code: 404, message: "Employee not found" };
      }

      let result = {
        total: count,
        size: limit,
        totalPage: Math.ceil(count / limit),
        currentPage: +page,
        data: rows,
      };
      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully get all employee data",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  static async postEmployee(req, res, next) {
    try {
      let {
        name,
        email,
        address,
        phone,
        employment_type,
        join_date,
        job_position,
        manager,
      } = req.body;
      const findLastEmpCode = await employee.max("emp_code");
      let lastEmpCode = parseInt(findLastEmpCode.substring(1));
      let newCode = lastEmpCode + 1;
      let newEmpCode = "A" + newCode.toString().padStart(4, "0");
      let last_updated = join_date;
      const NewEmployee = await employee.create({
        emp_code: newEmpCode,
        name,
        email,
        address,
        phone,
        employment_type,
        join_date,
        job_position,
        manager,
        last_updated,
      });

      res.status(201).json({
        success: true,
        status: 201,
        message: "Successfully add new employee",
        data: {
          emp_code: NewEmployee.emp_code,
          name: NewEmployee.name,
          email: NewEmployee.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async putEmployee(req, res, next) {
    try {
      let { emp_code } = req.params;
      let newData = req.body;
      let getTime = new Date().toISOString();
      let last_updated = getTime.split("T")[0];
      newData.last_updated = last_updated;
      const findEmployee = await employee.findByPk(emp_code);
      // console.log(findEmployee);
      if (!findEmployee) {
        throw { code: 404, message: "Employee not found" };
      }
      for (const key in newData) {
        console.log(key);
        if (Object.hasOwnProperty.call(newData, key) && key !== "emp_code") {
          findEmployee[key] = newData[key];
        }
      }
      // console.log(findEmployee, "<<<<<< data baru");
      // console.log(last_updated);
      await findEmployee.save();
      res.status(200).json({
        success: true,
        status: 200,
        message: "Successfully update employee data",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEmployeeByID(req, res, next) {
    try {
      let { emp_code } = req.params;
      const findEmployee = await employee.findOne({
        where: { emp_code },
        include: [
          { model: employee, as: "manager_employee", attributes: ["name"] },
          { model: position, as: "position", attributes: ["name"] },
        ],
      });

      res.status(200).json({
        success: true,
        status: 200,
        message: `Succesffully retrieve employee detail with emp_code: ${emp_code}`,
        data: findEmployee,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EmployeeController;
