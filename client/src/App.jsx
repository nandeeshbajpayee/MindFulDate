import React, { useState } from "react";
import HomePage from "./components/HomePage";
import Error404 from "./components/Error404";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AllUsers from "./components/AllUsers/AllUsers";
import ViewProfile from "./components/ViewProfile/ViewProfile";
import Protected from "./Protected";
import Confess from "./pages/confess/Confess";
import ConfessByMe from "./pages/confessbyme/ConfessByMe";
import ConfessionsForMe from "./pages/confessionforme/ConfessionForMe";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        {isAuthenticated ? (
          <>
            <Route path="/users" element={<Protected Component={AllUsers} />} />
            <Route path="/users/:userId" element={<Protected Component={ViewProfile} />} />
            <Route path="/confess/:userId" element={<Protected Component={Confess} />} />
            <Route path="/confessbyme" element={<Protected Component={ConfessByMe} />} />
            <Route path="/confessforme" element={<Protected Component={ConfessionsForMe} />} />
          </>
        ) : (
          <Navigate to="/auth/login" />
        )}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default App;
