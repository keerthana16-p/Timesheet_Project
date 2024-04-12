import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ResourceAllocation.css';

function ResourceAllocation() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    projectName: '',
    userName: '',
    email:'',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:5000/api/projects/projectdetails')
      .then(response => {
        setProjects(response.data.projects);
      })
      .catch(error => {
        setError('Error fetching projects. Please try again later.');
      })
      .finally(() => setLoading(false));
  };

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users/userdetails')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => {
        setError('Error fetching users. Please try again later.');
      })
      .finally(() => setLoading(false));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUserSelection = (e) => {
    const selectedUserName = e.target.value
    setFormData({
      ...formData,
      userName: selectedUserName
    });
  };

  const handleProjectSelection = (e) => {
    const selectedProjectName = e.target.value;
    setFormData({
      ...formData,
      projectName: selectedProjectName
    });
  };

  const handleEmailSelection = (e) => {
    const selectedEmail = e.target.value;
    setFormData({
      ...formData,
      email: selectedEmail
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("allocated data",formData)
    axios.post('http://localhost:5000/api/resources/allocate-resources', formData)
      .then(response => {
        setFormData({
          projectName: '',
          userName: '',
          email:'',
          startDate: '',
          endDate: ''
        });
      })
      .catch(error => {
        setError('Error allocating resources. Please try again later.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="resource-allocation-container">
      <h2>Resource Allocation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectId">Select Projects:</label>
          <select id="projectId" name="projectId" value={formData.projectId} onChange={handleProjectSelection} required>
            <option value="">Select Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.name}>{project.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="userId">Select Users:</label>
          <select id="userId" name="userId"  value={formData.userId} onChange={handleUserSelection} required>
            {users.map(user => (
              <option key={user.id} value={user.firstName}>{user.firstName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Select Email:</label>
          <select id="email" name="email"  value={formData.email} onChange={handleEmailSelection} required>
            {users.map(user => (
              <option key={user.id} value={user.email}>{user.email}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} required />
        </div>
        <button type="submit">Allocate Resources</button>
      </form>
    </div>
  );
}

export default ResourceAllocation;
