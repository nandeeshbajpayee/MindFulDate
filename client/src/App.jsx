import React from "react";
import HomePage from "./components/HomePage";
import Error404 from "./components/Error404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AllUsers from "./components/AllUsers/AllUsers";
import ViewProfile from "./components/ViewProfile/ViewProfile";
import Protected from "./Protected";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path='/users' element={<Protected Component={AllUsers}/>}/>
        <Route path='/users/:userId' element={<ViewProfile/>}/>
        <Route path="/*" element={<Error404 />} />
      </Routes>
    
    </Router>
  );
};

export default App;
