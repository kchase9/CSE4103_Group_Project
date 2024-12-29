

import React, { useState, useEffect } from 'react';
import EditInfoLayout from '../../templates/edit-info-layout/edit-info-layout.js';
import './request-appointment.css';

const RequestAppointment = () => {
    const [employees, setEmployees] = useState([{ name: '', jobTitle: '' }]);
    const [purpose, setPurpose] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Get user information from token when component mounts
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserId(payload.userId);
                setUserEmail(payload.email); // Assuming email is in the token payload
            } catch (err) {
                console.error('Error decoding token:', err);
                setError('Authentication error. Please log in again.');
            }
        } else {
            setError('Please log in to request an appointment.');
        }
    }, []);

    const handleEmployeeChange = (index, field, value) => {
        const updatedEmployees = [...employees];
        updatedEmployees[index][field] = value;
        setEmployees(updatedEmployees);
    };

    const addEmployee = () => {
        setEmployees([...employees, { name: '', jobTitle: '' }]);
    };

    const removeEmployee = (index) => {
        setEmployees(employees.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setError('Please log in to request an appointment.');
            return;
        }

        if (!purpose || !date || !time) {
            setError('Please fill in all required fields.');
            return;
        }

        if (!employees[0].name) {
            setError('Please add at least one employee.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        // Create appointment request data
        const appointmentData = {
            userId,
            userEmail,
            purpose,
            appointmentDate: `${date}T${time}`,
            employees: employees.filter(emp => emp.name.trim() !== '')
        };

        try {
            const response = await fetch('http://localhost:5000/api/appointments/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(appointmentData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit appointment request.');
            }

            setSuccess('Appointment request submitted successfully.');
            
            // Reset form
            setPurpose('');
            setDate('');
            setTime('');
            setEmployees([{ name: '', jobTitle: '' }]);
        } catch (err) {
            console.error('Error submitting appointment request:', err);
            setError(err.message || 'Failed to submit appointment request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <EditInfoLayout title="Request Appointment">
            <div className="request-appointment-form">
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="purpose">Purpose of Appointment:</label>
                        <input
                            type="text"
                            id="purpose"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            placeholder="Enter purpose of appointment"
                            required
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="date">Date:</label>
                        <input 
                            type="date" 
                            id="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="time">Time:</label>
                        <input 
                            type="time" 
                            id="time" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>

                    <div className="employees-section">
                        <div className='row'>
                            <h3>Employees in Attendance:</h3>
                            <button
                                type="button"
                                onClick={addEmployee}
                                className="btn btn-gray"
                            >
                                Add Employee
                            </button>
                        </div>

                        {employees.map((employee, index) => (
                            <div key={index} className="employee-entry">
                                <input
                                    type="text"
                                    placeholder="Employee Name"
                                    value={employee.name}
                                    onChange={(e) => handleEmployeeChange(index, 'name', e.target.value)}
                                    required={index === 0}
                                />
                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    value={employee.jobTitle}
                                    onChange={(e) => handleEmployeeChange(index, 'jobTitle', e.target.value)}
                                    required={index === 0}
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeEmployee(index)}
                                        className="btn btn-red"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="btn-container">
                        <a href='/home' className="btn btn-gray">Cancel</a>
                        <button 
                            type="submit" 
                            className="btn btn-green"
                            disabled={loading || !userId}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </EditInfoLayout>
    );
};

export default RequestAppointment;