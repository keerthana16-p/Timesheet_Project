import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import Axios from 'axios'; // Import Axios for making HTTP requests
import '../Styles/ConsultantFeedback.css'; // Import CSS file for styling

// Functional component for the consultant feedback form
function ConsultantFeedbackForm() {
  // State variable to hold feedback data
  const [feedback, setFeedback] = useState({
    userName: '', 
    projectQuality: '',
    communication: '',
    problemSolving: '',
    responsiveness: '',
    professionalism: '',
    collaboration: '',
    overallSatisfaction: '',
    suggestions: ''
  });

  // Fetch user details based on email stored in session storage when component mounts
  useEffect(() => {
    const email = sessionStorage.getItem('responseEmail'); // Get email from session storage
    if (email) {
      // Fetch user details from backend
      Axios.get(`http://localhost:5000/api/users/userdetails/${email}`)
        .then(response => {
          const userName = response.data.firstName; // Assuming the first name is returned by the backend
          // Update feedback state with user's name
          setFeedback(prevFeedback => ({
            ...prevFeedback,
            userName: userName
          }));
        })
        .catch(error => {
          console.error('Error fetching user details:', error); // Log error if fetching user details fails
        });
    }
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  // Function to handle input change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update feedback state with the new value
    setFeedback({
      ...feedback,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Submit feedback data to backend
      await Axios.post('http://localhost:5000/api/feedback/consultant', feedback);
      console.log('Feedback submitted successfully');
      alert('Feedback submitted successfully!'); // Notify user about successful submission
      window.location.href = '/timesheet';
    } catch (error) {
      console.error('Error submitting feedback:', error); // Log error if submission fails
    }
  };

  // JSX to render the feedback form

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
          <label htmlFor="projectQuality">How do you rate the quality of your work on the project?</label>
          <select id="projectQuality" name="projectQuality" value={feedback.projectQuality} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="communication">How would you rate your communication with the project team?</label>
          <select id="communication" name="communication" value={feedback.communication} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="problemSolving">How effective were you in problem-solving during the project?</label>
          <select id="problemSolving" name="problemSolving" value={feedback.problemSolving} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="responsiveness">How responsive were you to client queries and requests?</label>
          <select id="responsiveness" name="responsiveness" value={feedback.responsiveness} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="professionalism">How would you rate your professionalism in handling the project?</label>
          <select id="professionalism" name="professionalism" value={feedback.professionalism} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="collaboration">How well did you collaborate with the project team?</label>
          <select id="collaboration" name="collaboration" value={feedback.collaboration} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="overallSatisfaction">Overall, how satisfied are you with your work on this project?</label>
          <select id="overallSatisfaction" name="overallSatisfaction" value={feedback.overallSatisfaction} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="suggestions">Do you have any suggestions for improving your work process in future projects?</label>
          <textarea id="suggestions" name="suggestions" value={feedback.suggestions} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

// Export the ConsultantFeedbackForm component
export default ConsultantFeedbackForm;
