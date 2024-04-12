import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import axios from 'axios'; // Import Axios for making HTTP requests
import '../Styles/Feedback.css'; // Import CSS file for styling

// Functional component for the feedback page
function Feedback() {
  const navigate = useNavigate(); // Hook to navigate to different routes

  // State variables to hold user details
  const [userRole, setUserRole] = useState(''); // State for user role
  const [userId, setUserId] = useState(''); // State for user ID
  const [userFirstName, setUserFirstName] = useState(''); // State for user first name

  // Effect hook to fetch user data when component mounts
  useEffect(() => {
    // Fetch user email from session storage
    const responseEmail = sessionStorage.getItem('responseEmail');
    
    // If email is present, send request to backend to fetch user details
    if (responseEmail) {
      fetchUserData(responseEmail);
    }
  }, []);

  // Function to fetch user data from backend
  const fetchUserData = async (email) => {
    try {
      // Send GET request to backend API to fetch user details
      const response = await axios.get(`http://localhost:5000/api/users/userdetails/${email}`);
      const userData = response.data; // Extract user data from response
      setUserRole(userData.role); // Set user role in state
      setUserId(userData.id); // Set user ID in state
      setUserFirstName(userData.firstName); // Set user first name in state

      // Based on the user's role, navigate to respective pages
      navigateToRole(userData.role);
    } catch (error) {
      console.error('Error fetching user data:', error); // Log error if fetching user data fails
    }
  };

  // Function to navigate to respective feedback form based on user role
  const navigateToRole = (role) => {
    switch (role) {
      case 'Intern':
        navigate('/internfeedbackform', { state: { userId } });
        break;
      case 'Senior Developer':
        navigate('/generalfeedbackform', { state: { userId } });
        break;
      case 'Consultant':
        navigate('/consultantfeedbackform', { state: { userId } });
        break;
      case 'Tribe Master':
        navigate('/tribemasterfeedbackform', { state: { userId } });
        break;
      default:
        console.error('Invalid role:', role); // Log error if role is invalid
    }
  };

  // JSX to render the feedback page
  return (
    <div className="feedback-box">
      <div className="feedback-dashboard-container">
        {/* Display user's role and welcome message */}
        <h2 className="feedback-heading">Role of the User: {userRole}</h2>
        <p>Welcome, {userFirstName}!</p>
      </div>
    </div>
  );
}

export default Feedback; // Export the Feedback component
