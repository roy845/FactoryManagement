import axios from "axios";
const BASE_URL = "http://localhost:8800/";
const API_URLS = {
  login: `${BASE_URL}api/auth/login`,
  getAllDepartments: `${BASE_URL}api/department/getAllDepartments`,
  logAction: `${BASE_URL}api/users/logAction`,
  editDepartment: `${BASE_URL}api/department/updateDepartment/`,
  getAllManagers: `${BASE_URL}api/employee/getAllManagers`,
  getDepartment: `${BASE_URL}api/department/getDepartment/`,
  getAllEmployees: `${BASE_URL}api/employee/getAllEmployees/`,
  addEmployeeToDepartment: `${BASE_URL}api/department/addEmployeeToDepartment/`,
  deleteDepartment: `${BASE_URL}api/department/deleteDepartment/`,
  getEmployee: `${BASE_URL}api/employee/getEmployee/`,
  updateEmployee: `${BASE_URL}api/employee/updateEmployee/`,
  getAllShifts: `${BASE_URL}api/shift/getAllShifts/`,
  deleteEmployee: `${BASE_URL}api/employee/deleteEmployee/`,
  addEmployeeToShift: `${BASE_URL}api/employee/addEmployeeToShift/`,
  addEmployeeToShiftUpdateShift: `${BASE_URL}api/shift/addEmployeeToShift/`,
  createDepartment: `${BASE_URL}api/department/addDepartment`,
  createEmployee: `${BASE_URL}api/employee/addEmployee`,
  addShift: `${BASE_URL}api/shift/addShift`,
  removeEmployeeFromShift: `${BASE_URL}api/shift/removeEmployeeFromShift/`,
  updateShift: `${BASE_URL}api/shift/updateShift/`,
  getShift: `${BASE_URL}api/shift/getShift/`,
  getAllAvailableEmployeesForShift: `${BASE_URL}api/employee/getAllAvailableEmployeesForShift/`,
  getAllUsers: `${BASE_URL}api/users/getAllUsers`,
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
