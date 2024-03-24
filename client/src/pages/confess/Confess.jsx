import React, { useState, useEffect } from "react";
import { apiConnector } from "../../Operations/apiConnector";
import { useParams } from "react-router-dom";
import { message } from "antd";
import './confess.css'

const Confess = () => {
    const cookie = document.cookie;
    const lidx = cookie.lastIndexOf("=");
    const by = cookie.substring(lidx + 1);
    console.log(by)
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [confession, setConfession] = useState({ to: userId, msg: "" ,by });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiConnector(
                    "get",
                    `http://localhost:8000/users/${userId}`
                );
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchData();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfession((prevConfession) => ({
            ...prevConfession,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiConnector("post", `http://localhost:8000/confess`, confession,{
                "Content-Type": "application/json", // Specify content type in headers
            });
            message.success("Confession added successfully");
            setConfession({ to: "", msg: "" }); // Clear the form after successful submission
        } catch (error) {
            console.error("Error confessing:", error);
            message.error("Failed to add confession. Please try again later.");
        }
    };

    return (
        <>
            <div className="container-confess">
                <div className="form-container min-h-screen">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                        <label htmlFor="msg">Your Message: </label>
                        <textarea
                            id="msg"
                            name="msg"
                            placeholder="Your confession message"
                            value={confession.msg}
                            onChange={handleInputChange}
                        ></textarea>
                        <button className="confess-button" type="submit">Confess</button>
                    </form>
                </div>
                <div className="bg-gradient-to-br from-purple-200 to-pink-200 min-h-screen flex justify-center items-center">
                    <div className="max-w-lg mx-auto bg-white shadow-md rounded-md p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">
                            User Profile
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-purple-700">
                                    Basic Information
                                </h2>
                                <div className="dp ">
                                    {user.profilePhoto ? (
                                        <img
                                            src={user.profilePhoto}
                                            alt=""
                                            className="w-[200px] h-[200px] rounded-full"
                                        />
                                    ) : (
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMAU8qdhLKSuXq7Nx9msw64fCyVLke3Irww&usqp=CAU"
                                            alt=""
                                            className="w-[200px] h-[200px] rounded-full"
                                        />
                                    )}
                                </div>

                                <p>
                                    <strong className="text-purple-800">Name:</strong>{" "}
                                    {user.name}
                                </p>
                                <p>
                                    <strong className="text-purple-800">Username:</strong>{" "}
                                    {user.username}
                                </p>
                                <p>
                                    <strong className="text-purple-800">Age:</strong>{" "}
                                    {user.age}
                                </p>
                                <p>
                                    <strong className="text-purple-800">Gender:</strong>{" "}
                                    {user.gender}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-2 text-purple-700">
                                    Contact Information
                                </h2>
                                <p>
                                    <strong className="text-purple-800">Email:</strong>{" "}
                                    {user.email}
                                </p>
                                <p>
                                    <strong className="text-purple-800">Phone:</strong>{" "}
                                    {user.phone}
                                </p>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-2 text-purple-700">
                                About
                            </h2>
                            <p className="text-purple-800">
                                {user.bio || "No bio available"}
                            </p>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-2 text-purple-700">
                                Interests and Preferences
                            </h2>
                            <p>
                                <strong className="text-purple-800">
                                    Interested In:
                                </strong>{" "}
                                {user.interestedIn}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Confess;
