import React, { useState, useEffect } from 'react';
import { apiConnector } from '../../Operations/apiConnector';

const ConfessionsByMe = () => {
    const cookie = document.cookie;
    const lidx = cookie.lastIndexOf("=");
    const userId = cookie.substring(lidx + 1);

    const [confessions, setConfessions] = useState([]);
    const [usernames, setUsernames] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfessions = async () => {
            try {
                const response = await apiConnector("post", `http://localhost:8000/confess/by_me`, { userId }, {
                    "Content-Type": "application/json"
                });
                setConfessions(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching confessions:", error);
            }
        };

        fetchConfessions();
    }, [userId]);

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const userIds = confessions.flatMap(confession => confession.to);
                const uniqueUserIds = [...new Set(userIds)]; // Get unique user IDs
                const usernamesObj = {};

                for (const id of uniqueUserIds) {
                    const response = await apiConnector("get", `http://localhost:8000/users/${id}`);
                    usernamesObj[id] = response.data.username;
                }

                setUsernames(usernamesObj);
            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        };

        fetchUsernames();
    }, [confessions]);

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Confessions By Me</h2>
            <div>
                {loading ? (
                    <p>Loading confessions...</p>
                ) : confessions.length === 0 ? (
                    <p>You haven't confessed to anyone yet.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confession</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {confessions.map((confession, index) => (
                                <React.Fragment key={index}>
                                    {confession.to.map((userId, i) => (
                                        <tr key={`${index}-${i}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">{usernames[userId]}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{confession.msg[i]}</td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ConfessionsByMe;
