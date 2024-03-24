import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
// import { useHistory } from 'react-router-dom';
import { apiConnector } from "../../Operations/apiConnector";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // const history = useHistory();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiConnector("get", "http://localhost:8000/users");

        setUsers(res.data);
        // console.log("UserData: ",res.data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewProfile = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleConfess = async (userId) => {
    try {
        navigate(`/confess/${userId}`);
    } catch (error) {
        console.error('Error navigating to confession page:', error);
    }
};


  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      Cookies.remove('authToken');
      Cookies.remove('loginedUser');
      // console.log(Cookies.get('loginedUser'));
      // document.cookie = `authToken=''; path=/;`;
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendRequest = (userId) => {
    // Implement send request logic here
  };

  return (
    <div className="container mx-auto py-8 p-10">
      <div className="w-full h-max  p-[4px] text-[1.4rem]  inline-block">
        <button onClick={handleLogout} className="text-white p-2 bg-violet-700 rounded-md">LogOut</button>
      </div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-md p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => handleViewProfile(user._id)}
              >
                View Profile
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                onClick={() => handleConfess(user._id)}
              >
                Confess
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
                onClick={() => handleSendRequest(user._id)}
              >
                Send Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
