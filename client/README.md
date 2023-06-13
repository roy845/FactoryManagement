# Factory Management Web Application

This project is a web application for managing a factory. It consists of a Node.js + Express-based server, a MongoDB database in the backend, and ReactJs in the frontend. The web application allows users to perform various operations related to employees, departments, and shifts within the factory.

## Prerequisites

-VS Code

-NodeJS

-MongoDB

## Installation

### Client

1. Open a new terminal.
2. Navigate to the client directory: `cd client`.
3. Install dependencies: `npm/yarn install`.

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

### Running the Server

1. Open a new terminal.
2. Navigate to the server directory: `cd api`.
3. Run the server: `node server.js`.

### Running the Client

1. Open a new terminal.
2. Navigate to the client directory: `cd client`.
3. Run the client: `npm/yarn start`.

## App description

- Once a user is logged in, their full name will be displayed on every page.
- Each page includes a "Log-Out" link that redirects the user back to the Log-In page.
- Users have a limited number of actions per day. Each action a user performs, such as retrieving the list of employees or creating a new department, will reduce their action credit. When the user reaches the maximum allowed actions, they will be redirected out of the system for that day.
