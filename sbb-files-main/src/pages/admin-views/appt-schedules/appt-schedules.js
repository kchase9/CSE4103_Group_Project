import React, { useState, useEffect } from 'react';
import "./appt-schedules.css";
import ViewListLayout from "../../../templates/view-list-layout/view-list-layout.js";
import axios from "axios";

const ApptSchedules = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/appointments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('made it');
                
                setAppointments(response.data.appointments || response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError('Failed to load appointments. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);


    if (loading) {
        return (
            <ViewListLayout title='Appointment Schedule Request'>
                <div className="sect-container">
                    <p>Loading appointments...</p>
                </div>
            </ViewListLayout>
        );
    }

    if (error) {
        return (
            <ViewListLayout title='Appointment Schedule Request'>
                <div className="sect-container red-border">
                    <p className="text-red-600">{error}</p>
                </div>
            </ViewListLayout>
        );
    }

    return (
        <ViewListLayout title='Appointment Schedule Request'>
            <div className='list-view'>
                {appointments.length === 0 ? (
                    <div className="sect-container orange-border">
                        <p>No appointments found.</p>
                    </div>
                ) : (
                    appointments.map((appointment) => (
                        <div key={appointment.id} className="sect-container green-border">
                            <div className="row">
                                <div className='widget-col'>
                                    <strong>Email</strong>
                                    <p>{appointment.user_email || 'N/A'}</p>
                                </div>
                                <div className='widget-col'>
                                    <strong>Purpose</strong>
                                    <p>{appointment.purpose || 'N/A'}</p>
                                </div>
                                <div className='widget-col'>
                                    <strong>Approval Status</strong>
                                    <p>{appointment.status || 'Pending'}</p>
                                </div>
                                <div className='widget-col'>
                                    <strong>Requested Date</strong>
                                    <p>{appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleDateString() : 'N/A'}</p>
                                </div>
                                <div className='widget-col'>
                                    <a 
                                        href={`/admin-review-appt/${appointment.id}`} 
                                        className='btn btn-green'
                                    >
                                        Review Application
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </ViewListLayout>
    );
};

export default ApptSchedules;