import React from 'react'; // Import React
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import '../Styles/AdminPage.css'; // Import CSS file for styling

// Functional component for the admin dashboard
function AdminDashboard() {
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to navigate to the 'create' route for adding a new user
  const handleAddUser = () => {
    navigate('/create');
  };

  // Function to navigate to the 'addProject' route for adding a new project
  const handleAddProject = () => {
    navigate('/addProject');
  };

  // Function to navigate to the 'resourceAllocation' route for resource allocation
  const handleResourceAllocation = () => {
    navigate('/resourceAllocation');
  };

  // JSX to render the admin dashboard with buttons for various actions
  return (
    <div className="admin-box">
      <div className="admin-dashboard-container">
        <h2 className="admin-heading">Admin Dashboard</h2>
        <div className="admin-buttons">
          <button className="admin-button" onClick={handleAddUser}>Add User</button>
          <button className="admin-button" onClick={handleAddProject}>Add Project</button>
          <button className="admin-button" onClick={handleResourceAllocation}>Allocate Resources</button>
        </div>
      </div>
    </div>
  );
}

// Export the AdminDashboard component
export default AdminDashboard;
