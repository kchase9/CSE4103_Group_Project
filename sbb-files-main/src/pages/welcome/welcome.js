// import React from 'react';
// import './welcome.css';

// const Welcome = () => {
//     return (
//         <div className=''>
//             <div className="welcome-page page">
//             <div className="welcome-title">
//                 <h1>Work with us.</h1>
//             </div>
//             <div className="welcome-forms row">
//                 {/* Sign In Form */}
//                 <div className="welcome-form sign-in">
//                     <form className="sign-in">
//                         <div className='heading'>
//                             <h2>Sign In</h2>
//                         </div>
//                         <input type="email" name="email" placeholder="Email" />
//                         <input type="password" name="pword" placeholder="********" />
//                         <button type="submit" className=" btn btn-green">Sign In</button>
//                     </form>
//                 </div>

//                 <div className="divider"></div>

//                 {/* Sign Up Form */}
//                 <div className="welcome-form sign-up">
//                     <form className="sign-up">
//                         <div className='heading'>
//                             <h2>Sign Up.</h2>
//                             <small>Sign up to register a business you own.</small>
//                         </div>
                        

//                         {/* First Section */}
//                         <input type="email" name="email" placeholder="Email" />
//                         <input type="password" name="password" placeholder="Password" />
//                         <input type="password" name="reenter-password" placeholder="Reenter Password" />

//                         <hr/>

//                         {/* Second Section */}
//                         <input type="text" name="full-name" placeholder="Full Name" />

//                         <input type="date" name="DOB" placeholder="DOB" />

//                         <div className="row">
//                             <select name="gender">
//                                 <option value="">Gender</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                             <select name="marital-status">
//                                 <option value="">Marital Status</option>
//                                 <option value="single">Single</option>
//                                 <option value="married">Married</option>
//                                 <option value="divorced">Divorced</option>
//                             </select>
//                         </div>
//                         <label>
//                             <input type="checkbox" name="differently-abled" />
//                             Differently Abled
//                         </label>
//                         <select name="education">
//                             <option value="">Highest Level of Education</option>
//                             <option value="high-school">High School</option>
//                             <option value="bachelor">Bachelor's Degree</option>
//                             <option value="master">Master's Degree</option>
//                             <option value="phd">PhD</option>
//                         </select>
//                         <input type="text" name="id-number" placeholder="ID Number" />
//                         <input type="text" name="tin-number" placeholder="TIN Number" />
//                         <hr />

//                         {/* Third Section */}
//                         <input type="tel" name="phone" placeholder="Phone Number" />
//                         <input type="text" name="address-line-1" placeholder="Address Line 1" />
//                         <input type="text" name="address-line-2" placeholder="Address Line 2" />
//                         <input type="text" name="address-line-3" placeholder="Address Line 3" />
//                         <select name="region">
//                             <option value="">Administrative Region</option>
//                             <option value="region-1">Region 1</option>
//                             <option value="region-2">Region 2</option>
//                             <option value="region-3">Region 3</option>
//                             <option value="region-4">Region 4</option>
//                             <option value="region-5">Region 5</option>
//                             <option value="region-6">Region 6</option>
//                             <option value="region-7">Region 7</option>
//                             <option value="region-8">Region 8</option>
//                             <option value="region-9">Region 9</option>
//                             <option value="region-10">Region 10</option>
//                         </select>
//                         <button type="submit" className="btn btn-green">Sign Up</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//         </div>
        
//     );
// };

// export default Welcome;



import React, { useState } from 'react';
import './welcome.css';

const Welcome = () => {
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        reenterPassword: '',
        full_name: '', // Changed to match backend
        dob: '',
        gender: '',
        marital_status: '', // Changed to match backend
        differently_abled: false, // Changed to match backend
        education: '',
        id_number: '', // Changed to match backend
        tin_number: '', // Changed to match backend
        phone: '',
        address_line_1: '', // Changed to match backend
        address_line_2: '', // Changed to match backend
        address_line_3: '', // Changed to match backend
        region: '',
    });

    const [message, setMessage] = useState(null);

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUpChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Convert form field names to match backend
        const fieldName = name === 'fullName' ? 'full_name' 
                       : name === 'maritalStatus' ? 'marital_status'
                       : name === 'differentlyAbled' ? 'differently_abled'
                       : name === 'idNumber' ? 'id_number'
                       : name === 'tinNumber' ? 'tin_number'
                       : name === 'addressLine1' ? 'address_line_1'
                       : name === 'addressLine2' ? 'address_line_2'
                       : name === 'addressLine3' ? 'address_line_3'
                       : name;

        setSignUpData((prev) => ({
            ...prev,
            [fieldName]: type === 'checkbox' ? checked : value,
        }));
    };

    // const handleSignInSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:5000/api/users/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(signInData),
    //         });
    //         const data = await response.json();
            
    //         if (response.ok) {
    //             // Store token in localStorage
    //             localStorage.setItem('token', data.token);
    //             localStorage.setItem('user', JSON.stringify(data.user));
    //             setMessage({ type: 'success', text: 'Sign-in successful!' });
    //             window.location.href = '/home'; // or use React Router
    //         } else {
    //             setMessage({ type: 'error', text: data.error || 'Sign-in failed' });
    //         }
    //     } catch (err) {
    //         setMessage({ type: 'error', text: 'Error connecting to the server' });
    //     }
    // };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signInData),
            });
            const data = await response.json();
            
            if (response.ok) {
                // Store all user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // Store the entire user object
                localStorage.setItem('id', data.user.id);
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('role', data.user.role);
                localStorage.setItem('full_name', data.user.full_name);
                
                setMessage({ type: 'success', text: 'Sign-in successful!' });
                
                // Redirect based on role
                window.location.href = data.user.role === 'admin' ? '/admin-home' : '/home';
            } else {
                setMessage({ type: 'error', text: data.error || 'Sign-in failed' });
            }
        } catch (err) {
            console.error('Login error:', err);
            setMessage({ type: 'error', text: 'Error connecting to the server' });
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (signUpData.password !== signUpData.reenterPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        // Remove reenterPassword before sending to API
        const { reenterPassword, ...signUpDataToSend } = signUpData;

        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signUpDataToSend),
            });
            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setMessage({ type: 'success', text: 'Sign-up successful!' });
                // Redirect or update UI as needed
                window.location.href = '/dashboard'; // or use React Router
            } else {
                setMessage({ type: 'error', text: data.error || 'Sign-up failed' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Error connecting to the server' });
        }
    };
    return (
        <div>
            <div className="welcome-page page">
                <div className="welcome-title">
                    <h1>Work with us.</h1>
                </div>
                <div className="welcome-forms row">
                    {/* Sign In Form */}
                    <div className="welcome-form sign-in">
                        <form className="sign-in" onSubmit={handleSignInSubmit}>
                            <div className="heading">
                                <h2>Sign In</h2>
                            </div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={signInData.email}
                                onChange={handleSignInChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                value={signInData.password}
                                onChange={handleSignInChange}
                            />
                            <button type="submit" className="btn btn-green">
                                Sign In
                            </button>
                        </form>
                    </div>

                    <div className="divider"></div>

                    {/* Sign Up Form */}
                    <div className="welcome-form sign-up">
                        <form className="sign-up" onSubmit={handleSignUpSubmit}>
                            <div className="heading">
                                <h2>Sign Up</h2>
                                <small>Sign up to register a business you own.</small>
                            </div>

                            {/* First Section */}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={signUpData.email}
                                onChange={handleSignUpChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={signUpData.password}
                                onChange={handleSignUpChange}
                            />
                            <input
                                type="password"
                                name="reenterPassword"
                                placeholder="Reenter Password"
                                value={signUpData.reenterPassword}
                                onChange={handleSignUpChange}
                            />
                            <hr />

                            {/* Second Section */}
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={signUpData.fullName}
                                onChange={handleSignUpChange}
                            />
                            <input
                                type="date"
                                name="dob"
                                value={signUpData.dob}
                                onChange={handleSignUpChange}
                            />
                            <div className="row">
                                <select
                                    name="gender"
                                    value={signUpData.gender}
                                    onChange={handleSignUpChange}
                                >
                                    <option value="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <select
                                    name="maritalStatus"
                                    value={signUpData.maritalStatus}
                                    onChange={handleSignUpChange}
                                >
                                    <option value="">Marital Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="divorced">Divorced</option>
                                </select>
                            </div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="differentlyAbled"
                                    checked={signUpData.differentlyAbled}
                                    onChange={handleSignUpChange}
                                />
                                Differently Abled
                            </label>
                            <select
                                name="education"
                                value={signUpData.education}
                                onChange={handleSignUpChange}
                            >
                                <option value="">Highest Level of Education</option>
                                <option value="high-school">High School</option>
                                <option value="bachelor">Bachelor's Degree</option>
                                <option value="master">Master's Degree</option>
                                <option value="phd">PhD</option>
                            </select>
                            <input
                                type="text"
                                name="idNumber"
                                placeholder="ID Number"
                                value={signUpData.idNumber}
                                onChange={handleSignUpChange}
                            />
                            <input
                                type="text"
                                name="tinNumber"
                                placeholder="TIN Number"
                                value={signUpData.tinNumber}
                                onChange={handleSignUpChange}
                            />
                            <hr />

                            {/* Third Section */}
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={signUpData.phone}
                                onChange={handleSignUpChange}
                            />
                            <input
                                type="text"
                                name="addressLine1"
                                placeholder="Address Line 1"
                                value={signUpData.addressLine1}
                                onChange={handleSignUpChange}
                            />
                            <input
                                type="text"
                                name="addressLine2"
                                placeholder="Address Line 2"
                                value={signUpData.addressLine2}
                                onChange={handleSignUpChange}
                            />
                            <input
                                type="text"
                                name="addressLine3"
                                placeholder="Address Line 3"
                                value={signUpData.addressLine3}
                                onChange={handleSignUpChange}
                            />
                            <select
                                name="region"
                                value={signUpData.region}
                                onChange={handleSignUpChange}
                            >
                                <option value="">Administrative Region</option>
                                <option value="region-1">Region 1</option>
                                <option value="region-2">Region 2</option>
                                <option value="region-3">Region 3</option>
                                <option value="region-4">Region 4</option>
                                <option value="region-5">Region 5</option>
                                <option value="region-6">Region 6</option>
                                <option value="region-7">Region 7</option>
                                <option value="region-8">Region 8</option>
                                <option value="region-9">Region 9</option>
                                <option value="region-10">Region 10</option>
                            </select>
                            <button type="submit" className="btn btn-green">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Welcome;
