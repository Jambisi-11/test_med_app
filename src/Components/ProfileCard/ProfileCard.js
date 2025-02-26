
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

const ProfileCard = () => {
    const [userDetails, setUserDetails] = useState({ role: "" });
    const [updatedDetails, setUpdatedDetails] = useState({ role: "" });
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    // Fetch user profile on component mount
    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        } else {
            fetchUserProfile();
        }
    }, [navigate]);

    // Function to fetch user profile data from the API
    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");

            const response = await fetch(`${API_URL}/api/auth/user`, {
                headers: {
                    "Authorization": `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                    "Email": email,
                },
            });

            if (response.ok) {
                const user = await response.json();
                setUserDetails(user);
                setUpdatedDetails(user);
            } else {
                throw new Error("Failed to fetch user profile");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Enable edit mode
    const handleEdit = () => {
        setEditMode(true);
    };

    // Handle input changes in edit mode
    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission when saving changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
    
            // ✅ Ensure role is included in the request
            const userDataWithRole = {
                ...updatedDetails,
                role: updatedDetails.role || userDetails.role || "Patient" // Default to "Patient"
            };
    
            const response = await fetch(`${API_URL}/api/auth/update`, {  
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                    "Email": email,
                },
                body: JSON.stringify(userDataWithRole),
            });
    
            const responseData = await response.json();
            console.log("Update Response Data:", responseData);
    
            if (response.ok) {
                sessionStorage.setItem("name", responseData.name);
                sessionStorage.setItem("phone", responseData.phone);
                sessionStorage.setItem("role", responseData.role); // ✅ Store role in session
                setUserDetails(responseData);
                setEditMode(false);
                alert("Record was successfully updated!");
                fetchUserProfile();
            } else {
                throw new Error(`Failed to update profile: ${responseData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Update Error:", error);
            alert("An error occurred while updating the profile.");
        }
    };
    
    return (
        <div className="profile-container">
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedDetails.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="tel"
                            name="phone"
                            value={updatedDetails.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={updatedDetails.email}
                            disabled
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div className="profile-details">
                    <h1>Welcome, {userDetails.name}</h1>
                    <p><strong>Phone:</strong> {userDetails.phone}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;