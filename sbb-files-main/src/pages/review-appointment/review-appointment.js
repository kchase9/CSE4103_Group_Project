import React, { useState, useEffect } from 'react';
import './review-appointment.css';
import EditInfoLayout from '../../templates/edit-info-layout/edit-info-layout.js';
import { API_BASE_URL } from "../../../src/config.js";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


// entirely dummy data

const ReviewAppointment = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [appointment, setAppointmentData] = useState({
        employees: [],
        user_id: '',
        user_email:'',
        purpose:'',
        appointment_date: '',
        status: 'pending',
        processed_by: '',
        processed_at: '',
    });

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(`http://localhost:5000/api/appointments/reject/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Appointment deleted successfully.');
            navigate('/admin-home');
        } catch (err) {
            console.error('Error deleting appointment:', err);
            alert('Failed to delete appointment.');
        }
    };

    const handleAccept = async () => {
        try {
            const token = localStorage.getItem('token');

            await axios.get(`http://localhost:5000/api/appointments/approve/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Appointment approved successfully.');
            navigate('/admin-home');
        } catch (err) {
            console.error('Error approving appointment:', err);
            alert('Failed to approve appointment.');
        }
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token not found in localStorage');

                if (!id) throw new Error('No ID found in the URL');
                
                console.log('Fetching appointment with ID:', id);
                
                const response = await axios.get(`http://localhost:5000/api/appointments/content/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log('Fetched appointment data:', response.data);

                setAppointmentData(response.data[0]);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch appointment data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading appointment details...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <EditInfoLayout title="Review Appointment">
            <div className="info-container">
                <div className="appointment-review">
                    
                    <div className="appointment-details">
                        <h3>Appointment Details</h3>
                        <p><strong>User ID:</strong> {appointment.user_id  }</p>
                        <p><strong>User Email:</strong> {appointment.user_email || 'N/A'}</p>
                        <p><strong>Purpose:</strong> {appointment.purpose }</p>
                        <p><strong>Date:</strong> {new Date(appointment.appointment_date).toLocaleString() }</p>
                        <p><strong>Status:</strong> {appointment.status }</p>
                        <p><strong>Processed At:</strong> {new Date(appointment.processed_at).toLocaleString()}</p>
                    </div>

                    <div className="appointment-employees">
                        <h3>Employees Involved</h3>
                        {appointment.employees && appointment.employees.length > 0 ? (
                            <ul>
                                {appointment.employees.map((employee, index) => (
                                    <li key={index}>
                                        <p><strong>Name:</strong> {employee.employeeName }</p>
                                        <p><strong>Job Title:</strong> {employee.jobTitle}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No employees involved in this appointment.</p>
                        )}
                    </div>
                </div>
                <form>
                    {/* Some implicit application ID */}
                    <div className='btn-container'>
                        <button onClick={handleAccept} type="submit" className="btn btn-green">Approve</button>
                        <button onClick={handleDelete} type="button" className="btn btn-red">Reject</button>
                        <a href='/appt-schedules' className="btn btn-gray">
                            Back
                        </a>
                    </div>
                </form>
            </div>
        </EditInfoLayout>
    );
};

export default ReviewAppointment;
