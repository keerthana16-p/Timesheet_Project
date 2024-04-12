import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../Styles/UserLogin.css'; 

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to store login error
  useEffect(() => {
    // Get the email from sessionStorage
    const email2 = sessionStorage.getItem('responseEmail');

    // Print the email to the console
    //console.log(email2);
  }, []);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      // Send a POST request to the server with the email and hashed password
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password// Send hashed password
      });

      // If the authentication is successful, redirect to the create component
      if (response.status === 200) {
        // Extract user's role from the response
        const { role } = response.data.user;
        // const {responseEmail}= response.data.email
      
        //console.log( response.data.user.email)
        // Check if the user is an admin
        if (role === 'admin') {
          // sessionStorage.setItem('responseEmail', responseEmail);
          console.log("logged in as admin")
          window.location.href = '/admindashboard';
         
        } else {
          sessionStorage.setItem('responseEmail', response.data.user.email);
          console.log("logged in as non-admin")
          window.location.href = '/userdashboard';
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Set the error state to display error message to the user
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container"> 
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>} 
        <button type="submit" className='submit'>Login</button>
      </form>
    </div>
  );
}

export default UserLogin;
