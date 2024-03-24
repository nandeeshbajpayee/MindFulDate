import React, { useState } from "react";
import rightLogin from "../Login/login-right.png";
import { message } from "antd";
import { IoChevronBackCircle } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { apiConnector } from "../../Operations/apiConnector";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    profilePhoto: null, // Updated to allow file upload
    interestedIn: "",
    bio:"",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    console.log("File selected:", e.target.files[0]);
    setFormData({
      ...formData,
      profilePhoto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("profilePhoto", formData.profilePhoto);
      formDataToSend.append("interestedIn", formData.interestedIn);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);

      const res = await apiConnector(
        "post",
        "http://localhost:8000/auth/register",
        formDataToSend
      );
      if (res.data.success) {
        message.success("Register Successful");
        navigate("/users");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="login-wrapper w-full h-screen flex bg-gradient-to-r from-pink-800 to-white">
      <div className="container p-35 sm:w-[50%] resize-x rounded flex flex-col justify-center z-20 w-0 overflow-y-scroll">
        <h1 className="sm:text-4xl text-2xl font-bold text-center my-8 bg-gradient-to-r from-white-500 to-pink-800 text-transparent bg-clip-text">
          Register
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-max mx-auto p-12 sm:text-2xl text-base"
          encType="multipart/form-data" // Set enctype for file upload
        >
          <div className="mb-8 flex">
            <label
              htmlFor="username"
              className="block mb-1 font-semibold text-slate-200"
            >
              Username*
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="sm:w-full px-3 py-2 border-pink-200 bg-transparent border-b-2 text-grey-600 outline-none"
              required
            />
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-slate-200"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b-2 text-grey-600 outline-none"
              required
            />
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="name"
              className="block mb-1 font-semibold text-slate-200"
            >
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b-2 text-grey-600 outline-none"
              required
            />
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="age"
              className="block mb-1 font-semibold text-slate-200"
            >
              Age*
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b-2 text-grey-600 outline-none"
              required
            />
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="gender"
              className="block mb-1 font-semibold text-slate-200"
            >
              Gender*
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b- text-grey-600 outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="profilePhoto"
              className="block mb-1 font-semibold text-slate-200"
            >
              Profile Photo
            </label>
            <input
              type="file" // Set input type to file for profile photo upload
              id="profilePhoto"
              name="profilePhoto"
              onChange={handleChangeImage} // Bind handleChangeImage for file input
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b-2 text-grey-600 outline-none"
            />
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="interestedIn"
              className="block mb-1 font-semibold text-slate-200"
            >
              Interested In
            </label>
            <select
              id="interestedIn"
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleChange}
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b- text-grey-600 outline-none"
              required
            >
              <option value="">Select Interest</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="bio"
              className="block mb-1 font-semibold text-slate-200"
            >
              Bio/Status*
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b-2 text-grey-600 outline-none"
              required
            />
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-slate-200"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b-2 text-grey-600 outline-none"
              required
            />
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="phone"
              className="block mb-1 font-semibold text-slate-200"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border-pink-200 bg-transparent border-b-2 text-grey-600 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
      <img
        src={rightLogin}
        alt=""
        className="sm:w-[52%]  w-full rounded-l-[30%] z-10 w"
      />
    </div>
  );
};

export default Register;

