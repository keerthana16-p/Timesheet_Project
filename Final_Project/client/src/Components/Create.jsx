import { useState } from 'react'; // Import useState hook from React
import Axios from 'axios'; // Import Axios for making HTTP requests
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing
import '../Styles/Create.css'; // Import CSS file for styling

// Functional component for creating a user
const Create = () => {
    // State variables to hold form input values
    const [firstName, setFirstName] = useState(""); // State for first name
    const [lastName, setLastName] = useState(""); // State for last name
    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password
    const [role, setRole] = useState(""); // State for role

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Send POST request to backend API to create user
        Axios.post('http://localhost:5000/api/users/create', { firstName, lastName, email, password: hashedPassword, role }) // Send hashed password
            .then(response => { 
                //console.log("hi"); 
                alert('User added successfully!'); 
            })
            .catch(err => { 
                console.log('error: ', err); 
            });
    }

    // JSX to render the user creation form
    return (
        <div className='createuser-container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <h2>Create User</h2>
                {/* Input fields for user details */}
                <label htmlFor='firstName'>First Name:</label>
                <input type='text' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor='lastName'>Last Name:</label>
                <input type='text' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor='email'>Email:</label>
                <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='password'>Password:</label>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Dropdown for selecting user role */}
                <label htmlFor='role'>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="Intern">Intern</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Tribe Master">Tribe Master</option>
                </select>
                {/* Button to submit the form */}
                <button type='submit'>Create User</button>
            </form>
        </div>
    );
};

export default Create; // Export the Create component
