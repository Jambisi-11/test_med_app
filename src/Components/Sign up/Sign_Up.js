// import React, { useState } from 'react';
// import './Sign_Up.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { API_URL } from '../../config';

// // Function component for Sign Up form
// const Sign_Up = () => {
//     // State variables using useState hook
//     const [role, setRole] = useState('');
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [password, setPassword] = useState('');
//     const [showerr, setShowerr] = useState(''); // State to show error messages
//     const navigate = useNavigate(); // Navigation hook from react-router

//     // Function to handle form submission
//     const register = async (e) => {
//         e.preventDefault(); // Prevent default form submission

//         // API Call to register user
//         const response = await fetch(`${API_URL}/api/auth/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 role: role, 
//                 name: name,
//                 email: email,
//                 password: password,
//                 phone: phone,
//             }),
//         });

//         const json = await response.json(); // Parse the response JSON

//         if (json.authtoken) {
//             // Store user data in session storage
//             sessionStorage.setItem("auth-token", json.authtoken);
//             sessionStorage.setItem("role", role);
//             sessionStorage.setItem("name", name);
//             sessionStorage.setItem("phone", phone);
//             sessionStorage.setItem("email", email);

//             // Redirect user to home page
//             navigate("/");
//             window.location.reload(); // Refresh the page
//         } else {
//             if (json.errors) {
//                 for (const error of json.errors) {
//                     setShowerr(error.msg); // Show error messages
//                 }
//             } else {
//                 setShowerr(json.error);
//             }
//         }
//     };

//     // JSX to render the Sign Up form
//     return (
//         <div className="container" style={{ marginTop: '4.5%' }}>
//             <div className="signup-grid">
//                 <div className="signup-form">
                
//                     <h1>Sign Up</h1>
//                     <p>
//                         Already a member? <span className='linklog'><Link to="/login">Login</Link></span>
//                     </p>
//                     <br />
//                     <form method="POST" onSubmit={register}>
//                         {/* Role Dropdown */}
//                         <div className="form-group">
//                             <label htmlFor="role">Role</label>
//                             <select 
//                                 value={role} 
//                                 onChange={(e) => setRole(e.target.value)} 
//                                 name="role" 
//                                 id="role" 
//                                 className="form-control"
//                                 required
//                             >
//                                 <option value="">Select your role</option>
//                                 <option value="Doctor">Doctor</option>
//                                 <option value="Patient">Patient</option>
//                             </select>
//                             {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
//                         </div>

//                         {/* Name Input */}
//                         <div className="form-group">
//                             <label htmlFor="name">Name</label>
//                             <input 
//                                 value={name} 
//                                 onChange={(e) => setName(e.target.value)} 
//                                 type="text" 
//                                 name="name" 
//                                 id="name" 
//                                 className="form-control" 
//                                 placeholder="Enter your name" 
//                                 required 
//                             />
//                             {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
//                         </div>

//                         {/* Phone Number Input */}
//                         <div className="form-group">
//                             <label htmlFor="phone">Phone Number</label>
//                             <input 
//                                 value={phone} 
//                                 onChange={(e) => setPhone(e.target.value)} 
//                                 type="tel" 
//                                 name="phone" 
//                                 id="phone" 
//                                 className="form-control" 
//                                 placeholder="Enter your phone number" 
//                                 required 
//                             />
//                             {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
//                         </div>

//                         {/* Email Input */}
//                         <div className="form-group">
//                             <label htmlFor="email">Email</label>
//                             <input 
//                                 value={email} 
//                                 onChange={(e) => setEmail(e.target.value)} 
//                                 type="email" 
//                                 name="email" 
//                                 id="email" 
//                                 className="form-control" 
//                                 placeholder="Enter your email" 
//                                 required 
//                             />
//                             {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
//                         </div>

//                         {/* Password Input */}
//                         <div className="form-group">
//                             <label htmlFor="password">Password</label>
//                             <input 
//                                 value={password} 
//                                 onChange={(e) => setPassword(e.target.value)} 
//                                 type="password" 
//                                 name="password" 
//                                 id="password" 
//                                 className="form-control" 
//                                 placeholder="Enter your password" 
//                                 required 
//                             />
//                             {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
//                         </div>

//                         {/* Submit Button */}
//                         <div className="form-group">
//                             <button type="submit" className="btn btn-primary">Sign Up</button>
//                         </div>

//                         <div className="form-group">
//                            {/* Reset Button */}
//                             <div className="form-group">
//                                 <button type="button" className="btn btn-danger" onClick={() => {
//                                     setRole('');
//                                     setName('');
//                                     setPhone('');
//                                     setEmail('');
//                                     setPassword('');
//                                     setShowerr('');
//                                 }}>Reset</button>
//                             </div>

//                         </div>
//                     </form>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Sign_Up; // Export the Sign_Up component





import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: role,
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                // Store user data in session storage
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("role", role);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);

                // Redirect to home page
                navigate("/");
                window.location.reload();
            } else {
                if (json.errors) {
                    for (const error of json.errors) {
                        setShowerr(error.msg);
                    }
                } else {
                    setShowerr(json.error);
                }
            }
        } catch (error) {
            console.error("Signup error:", error);
            setShowerr("Failed to sign up. Please try again.");
        }
    };

    return (
        <div className="container" style={{ marginTop: '4.5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <h1>Sign Up</h1>
                    <p>
                        Already a member? <span className='linklog'><Link to="/login">Login</Link></span>
                    </p>
                    <br />
                    <form method="POST" onSubmit={register}>
                        {/* Role Dropdown */}
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                name="role"
                                id="role"
                                className="form-control"
                                required
                            >
                                <option value="">Select your role</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Patient">Patient</option>
                            </select>
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        {/* Name Input */}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        {/* Phone Number Input */}
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                name="phone"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your phone number"
                                required
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        {/* Email Input */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        {/* Password Input */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        {/* Submit Button */}
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>

                        {/* Reset Button */}
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                    setRole('');
                                    setName('');
                                    setPhone('');
                                    setEmail('');
                                    setPassword('');
                                    setShowerr('');
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;