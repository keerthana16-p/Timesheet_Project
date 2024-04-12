import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Styles/GeneralFeedback.css';

function GeneralFeedbackForm() {
  const [feedback, setFeedback] = useState({
    userName: '', 
    satisfaction: '',
    communication: '',
    goals: '',
    deliverables: '',
    timeliness: '',
    challenges: '',
    projectManagement: '',
    support: '',
    improvements: ''
  });

  useEffect(() => {
    // Fetch user's name based on email stored in session storage
    const email = sessionStorage.getItem('responseEmail');
    if (email) {
      Axios.get(`http://localhost:5000/api/users/userdetails/${email}`)
        .then(response => {
          const userName = response.data.firstName; // Assuming the first name is returned by the backend
          setFeedback(prevFeedback => ({
            ...prevFeedback,
            userName: userName
          }));
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:5000/api/feedback/general', feedback);
      console.log(response.data);
      // Handle success if needed
      alert('Feedback submitted successfully!');
      window.location.href = '/timesheet';
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error if needed
      alert('Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <div className="feedback-form-container">
       <h2 className="feedback-heading">Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={feedback.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="satisfaction">How satisfied were you with the overall experience of working on this project?</label>
          <select
            id="satisfaction"
            name="satisfaction"
            value={feedback.satisfaction}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="communication">How would you rate the effectiveness of communication channels and interactions throughout the project?</label>
          <select
            id="communication"
            name="communication"
            value={feedback.communication}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="goals">To what extent were the project goals clearly defined and understood by all team members?</label>
          <select
            id="goals"
            name="goals"
            value={feedback.goals}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="deliverables">How satisfied were you with the quality and completeness of the project deliverables?</label>
          <select
            id="deliverables"
            name="deliverables"
            value={feedback.deliverables}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="timeliness">Were project milestones and deadlines met according to the agreed-upon schedule?</label>
          <select
            id="timeliness"
            name="timeliness"
            value={feedback.timeliness}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="challenges">How well were challenges and obstacles addressed and resolved throughout the project lifecycle?</label>
          <select
            id="challenges"
            name="challenges"
            value={feedback.challenges}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="projectManagement">How effective was the project management in terms of planning, coordination, and resource allocation?</label>
          <select
            id="projectManagement"
            name="projectManagement"
            value={feedback.projectManagement}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="support">How satisfied were you with the level of support and assistance provided by the project team?</label>
          <select
            id="support"
            name="support"
            value={feedback.support}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="improvements">Are there any areas where the project could have been improved or where you would suggest making changes for future projects?</label>
          <textarea
            id="improvements"
            name="improvements"
            value={feedback.improvements}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default GeneralFeedbackForm;
