import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { useAuth } from "./context/auth";
import Home from "./pages/Home";
import DepartmentPage from "./pages/Department";
import RequireAuth from "./components/RequireAuth";
import Shifts from "./pages/Shifts";
import Users from "./pages/Users";
import NewEmployee from "./pages/NewEmployee";
import NewDepartment from "./pages/NewDepartment";
import NewShift from "./pages/NewShift";
import EditDepartment from "./pages/EditDepartment";
import EditEmployee from "./pages/EditEmployee";
import UpdateShift from "./pages/UpdateShift";
import NotFound from "./components/NotFound";

const AppRoutes = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!auth ? <Login /> : <Home />} />

      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Home />} />
        <Route path="/newEmployee" element={<NewEmployee />} />
        <Route path="/editEmployee/:id" element={<EditEmployee />} />
        <Route path="/newDepartment" element={<NewDepartment />} />
        <Route path="/editDepartment/:id" element={<EditDepartment />} />
        <Route path="/editShift/:id" element={<UpdateShift />} />
        <Route path="/newShift" element={<NewShift />} />
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/shifts" element={<Shifts />} />
        <Route path="/users" element={<Users />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
