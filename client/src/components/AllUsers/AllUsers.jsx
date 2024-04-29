import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
// import { useHistory } from 'react-router-dom';
import { apiConnector } from "../../Operations/apiConnector";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import NavBar from "../NavBar/NavBar";
import MiniNavBar from "../MiniNavBar/MiniNavBar";


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

  const handleConfess = async (e, userId) => {
    try {
      navigate(`/confess/${userId}`);
    } catch (error) {
      console.error('Error navigating to confession page:', error);
    }
    e.stopPropagation()
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

  const handleSendRequest = (e, userId) => {
    // Implement send request logic here
    e.stopPropagation()
  };

  return (
    <>
      <div >
        <MiniNavBar />
        <NavBar />

        <div
          className="container mx-au  to py-8 p-10 bg-cover bg-center"
          style={{ backgroundSize: " cover", height: '100vh', width: '100%', paddingBlock: '8rem', marginInline: '1rem' }}
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.id} className="flex flex-col max-w-xs mx-auto m-4 rounded-xl shadow-lg hover:cursor-pointer hover:scale-105 ease-out duration-300 bg-white" onClick={() => handleViewProfile(user._id)}>
                <div className='h-40 w-40 mx-auto rounded-xl overflow-hidden'>
                  <img src={user.profilePhoto} alt="Profile" className="object-cover w-full h-full" />
                </div>
                <div className='p-4'>
                  <h2 className="text-lg font-semibold mb-2 text-customColor ">{user.name}</h2>
                  <p className="text-sm text-gray-600">
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Age:</strong> {user.age}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Gender:</strong> {user.gender}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button className=" px-2 py-2 mr-2 rounded-md text-customColor  hover:bg-customColor hover:text-white border-customColor border-solid border-2  ease-in ease-out duration-300  transition-colors "
                      // style={{ backgroundColor: "#f98484" }}
                      onClick={(e) => handleConfess(e, user._id)}>
                      Confess
                    </button>
                    <button className="px-2 py-2 rounded-md text-customColor  hover:bg-customColor hover:text-white border-customColor border-solid border-2 ease-in ease-out duration-300 transition-colors"
                      // style={{ backgroundColor: "#f98484" }}
                      onClick={(e) => handleSendRequest(e, user._id)}>
                      Send Request
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div >;

    </>

  );
};

export default AllUsers;
