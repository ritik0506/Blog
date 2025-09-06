import { createContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Get token from localStorage (if available)
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null); // Set null to indicate no user initially

    // Function to get user details
    const getUserDetails = async () => {
        try {
            if (!token) {
                console.log("No token found, skipping API request.");
                return;
            }

            console.log("Fetching user details with token:", token);

            const response = await axios.post(
                `${backendUrl}/api/user/get-details`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data && response.data.success && response.data.user?.name) {
                console.log("User details fetched successfully:", response.data.user.name);
                setUser(response.data.user.name); // Set user name
                console.log("respomse data of userdetail api"+JSON.stringify(response.data.user.id))
            } else {
                console.error("Failed to get user details:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Unable to fetch user details. Please try again.");
        }
    };

    // Fetch user details when token is available
    useEffect(() => {
        if (token) {
            getUserDetails();
        }
    }, [token]); // Run only when the token changes

    // Function to set token and save it to localStorage
    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    // Logout function to clear token and user info
    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login page
    };

    // For debugging: Show the user and token only on meaningful updates
    useEffect(() => {
        if (user !== null) console.log("Updated User:", user);
    }, [user]);

    const value = {
        assets,
        token,
        setToken: saveToken,
        backendUrl,
        navigate,
        user,
        logout,
    };

    return <BlogContext.Provider value={value}>{props.children}</BlogContext.Provider>;
};

export default BlogContextProvider;
