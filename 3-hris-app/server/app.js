const express = require("express");
const EmployeeController = require("./controllers/EmployeeController");
const errorHandlers = require("./helpers/ErrorHandlers");
const app = express();
const cors = require("cors");
const port = 3000 || process.env.PORT;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/v1/employee", EmployeeController.getEmployee);
app.post("/api/v1/employee", EmployeeController.postEmployee);
app.get("/api/v1/employee/:emp_code", EmployeeController.getEmployeeByID);
app.put("/api/v1/employee/:emp_code", EmployeeController.putEmployee);

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});

app.use(errorHandlers);
