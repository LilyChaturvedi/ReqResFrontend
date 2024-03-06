import { useContext, useState } from "react";

import "./App.css";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import NavBar from "./component/NavBar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { authContext } from "./AuthWrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Signup />} />
    </Routes>

    // <div className="flex justify-center align-center">
    //   <NavBar />
    // </div>
  );
}

const Layout = () => {
  const token = useContext(authContext);
  //token?.token;
  console.log("authWrapper", token?.token);
  if (token?.token) {
    return (
      <div>
        <NavBar />
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/login" />;
};

export default App;
