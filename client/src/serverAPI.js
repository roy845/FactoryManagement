const API_URLS = {
  login: "http://localhost:8800/api/auth/login",
  getAllDepartments: "http://localhost:8800/api/department/getAllDepartments",
  logAction: "http://localhost:8800/api/users/logAction",
  editDepartment: "http://localhost:8800/api/department/updateDepartment/",
  getAllManagers: "http://localhost:8800/api/employee/getAllManagers",
  getDepartment: "http://localhost:8800/api/department/getDepartment/",
  getAllEmployees: "http://localhost:8800/api/employee/getAllEmployees/",
  addEmployeeToDepartment:
    "http://localhost:8800/api/department/addEmployeeToDepartment/",
  deleteDepartment: "http://localhost:8800/api/department/deleteDepartment/",
  getEmployee: "http://localhost:8800/api/employee/getEmployee/",
  updateEmployee: "http://localhost:8800/api/employee/updateEmployee/",
  getAllShifts: "http://localhost:8800/api/shift/getAllShifts/",
  deleteEmployee: "http://localhost:8800/api/employee/deleteEmployee/",
  addEmployeeToShift: "http://localhost:8800/api/employee/addEmployeeToShift/",
  createDepartment: "http://localhost:8800/api/department/addDepartment",
  createEmployee: "http://localhost:8800/api/employee/addEmployee",
  addShift: "http://localhost:8800/api/shift/addShift",
  removeEmployeeFromShift:
    "http://localhost:8800/api/shift/removeEmployeeFromShift/",
  updateShift: "http://localhost:8800/api/shift/updateShift/",
  getShift: "http://localhost:8800/api/shift/getShift/",
  getAllAvailableEmployeesForShift:
    "http://localhost:8800/api/employee/getAllAvailableEmployeesForShift/",
  getAllUsers: "http://localhost:8800/api/users/getAllUsers",
};

export default API_URLS;
