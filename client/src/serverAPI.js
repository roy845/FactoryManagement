import axios from "axios";
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
  addEmployeeToShiftUpdateShift:
    "http://localhost:8800/api/shift/addEmployeeToShift/",
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

export const getAllEmployees = () => {
  try {
    return axios.get(API_URLS.getAllEmployees);
  } catch (error) {
    throw error;
  }
};
export const getAllDepartments = () => {
  try {
    return axios.get(API_URLS.getAllDepartments);
  } catch (error) {
    throw error;
  }
};
export const getAllManagers = () => {
  try {
    return axios.get(API_URLS.getAllManagers);
  } catch (error) {
    throw error;
  }
};
export const getAllShifts = () => {
  try {
    return axios.get(API_URLS.getAllShifts);
  } catch (error) {
    throw error;
  }
};
export const updateDepartment = (id, updatedDepartment) => {
  try {
    return axios.put(`${API_URLS.editDepartment}${id}`, updatedDepartment);
  } catch (error) {
    throw error;
  }
};
export const updateEmployee = (id, updatedEmployee) => {
  try {
    return axios.put(`${API_URLS.updateEmployee}${id}`, updatedEmployee);
  } catch (error) {
    throw error;
  }
};
export const updateShift = (id, selectedEmployee, updatedShift) => {
  try {
    return axios.put(
      `${API_URLS.updateShift}${id}/${selectedEmployee}`,
      updatedShift
    );
  } catch (error) {
    throw error;
  }
};
export const createEmployee = (newEmployee) => {
  try {
    return axios.post(API_URLS.createEmployee, newEmployee);
  } catch (error) {
    throw error;
  }
};
export const createShift = (newShift) => {
  try {
    return axios.post(API_URLS.addShift, newShift);
  } catch (error) {
    throw error;
  }
};
export const removeEmployeeFromShift = (shiftId, employeeId) => {
  try {
    return axios.post(`${API_URLS.removeEmployeeFromShift}${shiftId}`, {
      employeeId: employeeId,
    });
  } catch (error) {
    throw error;
  }
};
export const deleteEmployee = (id) => {
  try {
    return axios.delete(`${API_URLS.deleteEmployee}${id}`);
  } catch (error) {
    throw error;
  }
};
export const addEmployeeToShift = (id, shiftID) => {
  try {
    return axios.post(`${API_URLS.addEmployeeToShift}${id}/${shiftID}`);
  } catch (error) {
    throw error;
  }
};
export const addEmployeeToShiftUpdateShift = (id, employeeId) => {
  try {
    return axios.post(`${API_URLS.addEmployeeToShiftUpdateShift}${id}`, {
      employeeId: employeeId,
    });
  } catch (error) {
    throw error;
  }
};
export const deleteDepartment = (id) => {
  try {
    return axios.delete(`${API_URLS.deleteDepartment}${id}`);
  } catch (error) {
    throw error;
  }
};
export const createDepartment = (newDepartment) => {
  try {
    return axios.post(API_URLS.createDepartment, newDepartment);
  } catch (error) {
    throw error;
  }
};
export const addEmployeeToDepartment = (id, employeeId) => {
  try {
    return axios.post(`${API_URLS.addEmployeeToDepartment}${id}`, {
      employeeId: employeeId,
    });
  } catch (error) {
    throw error;
  }
};
export const getDepartment = (id) => {
  try {
    return axios.get(`${API_URLS.getDepartment}${id}`);
  } catch (error) {
    throw error;
  }
};
export const getAllAvailableEmployeesForShift = (id) => {
  try {
    return axios.get(`${API_URLS.getAllAvailableEmployeesForShift}${id}`);
  } catch (error) {
    throw error;
  }
};
export const getShift = (id) => {
  try {
    return axios.get(`${API_URLS.getShift}${id}`);
  } catch (error) {
    throw error;
  }
};
export const getEmployee = (id) => {
  try {
    return axios.get(`${API_URLS.getEmployee}${id}`);
  } catch (error) {
    throw error;
  }
};
export const getAllUsers = () => {
  try {
    return axios.get(`${API_URLS.getAllUsers}`);
  } catch (error) {
    throw error;
  }
};
export const logAction = () => {
  try {
    return axios.post(API_URLS.logAction);
  } catch (error) {
    throw error;
  }
};
export const login = (email, username) => {
  try {
    return axios.post(API_URLS.login, { email, username });
  } catch (error) {
    throw error;
  }
};

export default API_URLS;
