# Factory Management Web Application

This project is a web application for managing a factory. It consists of a Node.js + Express-based server, a MongoDB database in the backend, and ReactJs in the frontend. The web application allows users to perform various operations related to employees, departments, and shifts within the factory.

## Prerequisites

- Visual Studio Code <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="24" height="24">

- NodeJS <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="124" height="124">

- MongoDB <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="124" height="124">

## Installation

### Client

1. Open a new terminal.
2. Navigate to the client directory: `cd client`.
3. Install dependencies: `npm/yarn install`.
4. Run the client: npm/yarn start.

### Server

1. Open a new terminal.
2. Navigate to the server directory: `cd api`.
3. Install dependencies: `npm/yarn install`.
4. Create a `.env` file in the server directory.
5. In the `.env` file, set the following variables:
   - `PORT`: The port number on which the server will run (e.g., `PORT=8800`).
   - `MONGO_DB_URI`: The MongoDB connection URI for connecting to the database (e.g., `MONGODB_URI=mongodb://localhost:27017/mydatabase`).
   - `JWT_SECRET_KEY`:This key used for authentication and authorization.
     Here is how you can generate this key:
     1.Open a terminal.
     2.Type the following command and press Enter to generate a random JWT secret key
     require('crypto').randomBytes(32).toString('hex')
     3.Copy the generated secret key.
     4.Open the .env file in the server directory.
     5.Set the JWT_SECRET_KEY variable by pasting the generated secret key.
     For example:
     JWT_SECRET_KEY=generated_secret_key
6. Save the `.env` file.
7. Run the server: `node server.js`.

## Usage

- Once a user is logged in, their full name will be displayed on every page.
- Each page includes a "Log-Out" link that redirects the user back to the Log-In page.
- Users have a limited number of actions per day. Each action a user performs, such as retrieving the list of employees or creating a new department, will reduce their action credit. When the user reaches the maximum allowed actions, they will be redirected out of the system for that day.

## Employees Page

This page displays a table with all employees' data, including their full names, departments, and a list of their shifts (date and time). The table provides links to edit an employee's data or department. Additionally, a "New Employee" button redirects to the "Add Employee" page. A dropdown menu allows filtering the employees by department.

### Viewing Employees

- On the "Employees" page, you will see a table displaying the following information for each employee:
  - Full Name: Clicking on an employee's name will take you to the "Edit Employee" page, where you can update their details.
  - Department: Clicking on a department name will take you to the "Edit Department" page for that department.
  - Shifts: Displays the shifts of the employee, including the date, starting hour, and ending hour.

### Filtering Employees by Department

- To filter employees by department, use the dropdown menu labeled "Department" at the top of the table.
- By default, all departments are selected, and the table shows all employees from all departments.
- Selecting a specific department from the dropdown menu will filter the table to display only the employees belonging to that department.

### Adding a New Employee

- At the bottom of the page, you will find a "New Employee" button.
- Clicking on the "New Employee" button will take you to the "New Employee" page, where you can add a new employee to the system.

## Edit Employee Page

This page displays a form with the selected employee's data for editing. It includes fields for the employee's personal information and a table of their shifts. The page also provides an option to register the employee for an existing shift.

## Editing Employee Details

1. Navigate to the "Employees" page.
2. Click on the name of the employee you want to edit. This will take you to the "Edit Employee" page.
3. On the "Edit Employee" page, you will see a form with the following fields:

- First Name: Enter or update the employee's first name.
- Last Name: Enter or update the employee's last name.
- Start Work Year: Enter or update the employee's start work year.
- Department: The department to which the employee belongs. To change the department, select a new department from the dropdown menu.
- Is Manager: To change the employee manager status , select a new state (Yes/No) from the dropdown menu.
  After making the necessary changes, click the "Update" button to update the employee's details.

## Viewing and Managing Shifts

- On the "Edit Employee" page, you will see a table displaying the employee's shifts.
- The table includes the following columns:
- Date: The date of the shift.
- Starting Hour: The starting hour of the shift.
- Ending Hour: The ending hour of the shift.
- To register the employee for a new shift, Select the shift you want to allocate to the employee by clicking on corresponding row in the table.
- The selected shift will be highlighted.
- Click the "ADD" button to allocate the selected shift to the employee.

## New Employee Page

This page presents an empty form for creating a new employee, including their department. It includes fields for the employee's personal information and a "Save" button to save the data in the server.

## Creating a New Employee

1. On the "New Employee" page, you will see a form with the following fields:

- First Name: Enter the first name of the employee in the corresponding text field.
- Last Name: Enter the last name of the employee in the corresponding text field.
- Start Work Year: Enter the start year of the employee's work in the corresponding text field.
- Department: Select the department to which the employee belongs from the dropdown menu.
- Is Manager: Select whether the employee is a manager or not from the dropdown menu.

2. Fill in all the required fields with the appropriate information.
3. Once all the necessary fields are filled, click the "Save" button to create the new employee.
4. The employee's information will be saved in the server, and a success message will be displayed confirming the creation of the employee.
5. The page will be redirected to the "Home" page, where you can view the updated list of employees.

Note: If any error occurs during the creation of the employee, an error message will be displayed, indicating the issue.

## Canceling the Creation of a New Employee

1. On the "New Employee" page, click the "Cancel" button at the bottom.
2. This will navigate you back to the "Home" page without saving the new employee.

## Departments Page

This page displays a table with all departments' data, including the department name, manager name, and a list of employees working in that department. The table provides links to edit a department's data or an employee's data. Additionally, a "New Department" button redirects to the "Add Department" page.

### Viewing Departments

1. Navigate to the "Departments" page.
2. The page will display a table with the following columns:
   - Department Name: Clicking on the department name will take you to the edit page for that department.
   - Manager Name: Clicking on the manager's name will take you to the edit page for that employee.
   - Employees: Lists all employees within the department. Clicking on an employee's name will take you to the edit page for that employee.
3. You can scroll through the table to view all the departments and their details.

## Edit Department Page

This page displays a form with the selected department's data for editing. It includes fields for the department's information and a dropdown menu to add employees who do not currently belong to that department. The page also provides options to update the department's data or delete the department.

### Editing Department Details

1. Navigate to the "Departments" page.
2. Click on the department you want to edit. This will take you to the "Edit Department" page.
3. On the "Edit Department" page, you will see the following options:
   - Department Name: You can update the name of the department by entering a new value in the text field.
   - Manager: Select a new manager for the department from the dropdown list. If you want to remove the current manager, select "None".
   - Employees do not belong: Select an employee from the dropdown list to add them to the department.
4. After making the necessary changes, click the "UPDATE" button to save the updates to the department.

### Adding an Employee to the Department

1. On the "Edit Department" page, select an employee from the "Employees do not belong" dropdown list.
2. Click the "ADD" button to add the selected employee to the department.
3. A success message will be displayed, confirming the assignment of the employee to the department.

### Deleting the Department

1. On the "Edit Department" page, click the "DELETE" button at the bottom.
2. This will delete the department permanently.
3. A success message will be displayed, confirming the deletion of the department.

## New Department Page

This page presents an empty form for creating a new department. It includes fields for the department's information and a "Save" button to save the data in the server.

### Adding a New Department

1. On the "Departments" page, click the "New Department" button at the bottom of the page.
2. This will navigate you to the "New Department" page where you can create a new department.
3. Fill in the required details for the new department, such as the department name.
4. Click the "Save" button to save the new department.

## Canceling the Creation of a New Department

1. On the "New Department" page, click the "Cancel" button at the bottom.
2. This will navigate you back to the "Department" page without saving the new department.

## Shifts Page

This page displays a list of shifts and their details, including the date, starting hour, ending hour, and allocated employees. You can also remove employees from each shift.

## Viewing Shifts

- On the "Shifts" page, you will see a table displaying the shifts and their details.
- Each row represents a shift and includes the following information:
- Date: Clicking on the date will navigate you to the "Edit Shift" page for that specific shift.
- Starting Hour: The starting hour of the shift.
- Ending Hour: The ending hour of the shift.
- Allocated Employees: A list of employees allocated to the shift.
- To remove an employee from a shift, click on the Trash can icon next to the employee's name. This action will remove the employee from the shift and update the shift's information.
- A success message will be displayed upon successful removal of an employee from a shift.

## Creating a New Shift

At the bottom of the page, you will find a "NEW SHIFT" button. Click on this button to navigate to the "New Shift" page and create a new shift.

## New Shift Page

This page allows users to create new shifts.

### Creating a New Shift

1. Navigate to the "New Shift" page.
2. Fill in the necessary details for the new shift, such as the date, starting hour, and ending hour.
3. Click the "Save" button to create the new shift.

## Canceling the Creation of a New Shift

1. On the "New Shift" page, click the "Cancel" button at the bottom.
2. This will navigate you back to the "Shifts" page without saving the new shift.

## Update Shift Page

This page allows users to update an existing shift with new details and allocate employees to the shift.

### Updating a Shift

1. Navigate to the "Update Shift" page.
2. The current details of the shift will be pre-filled in the form.
3. Modify the necessary fields, such as the date, starting hour, and ending hour.
4. Click the "UPDATE" button to save the changes.

### Allocating Employees to a Shift

1. On the "Update Shift" page, view the list of available employees.
2. Select the employees you want to allocate to the shift by clicking on their corresponding row in the table.
3. The selected employees will be highlighted.
4. Click the "ADD" button to allocate the selected employees to the shift.

Note: Only available employees are shown in the table. If there are no available employees, a message will be displayed indicating that no employees are available.

## Canceling the Updation of a Shift

1. On the "Update Shift" page, click the "Cancel" button at the bottom.
2. This will navigate you back to the "Shifts" page without update the shift.

## Users Page

This page displays a table with information about all users. It includes the user name, the maximum number of allowed actions, and the current number of actions allowed for the day.

## Viewing Users

- On the "Users" page, you will see a table displaying the users and their action details.
- Each row represents a user and includes the following information:
- Username: The username of the user.
- Current Number of Actions: The current number of actions performed by the user.
- Maximum Number of Actions: The maximum number of actions allowed for the user per day.

## System Users

- Only registered users are allowed to log in to the web application. All users are pre-declared in advance in the database.
- Each action a user takes within the system is logged in a JSON file on the server.
- Users are limited to a maximum number of actions per day. When a user reaches the maximum limit, they will be logged out until the following day.
