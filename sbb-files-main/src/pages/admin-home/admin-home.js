import React from 'react';
import './admin-home.css';

const AdminHome = () =>{
    return (
        <div className='page'>
            <div className='home-page'>
                <div className='heading'>
                    <h1>Welcome</h1>
                    <p>Manage and review applications and requests from your home page.</p>
                </div>

                <div className='sect-container green-border'>
                    <div className='row'>
                        <div className='thumbnail-content'>
                            <h4>Small Business Registration Applications</h4>
                        </div>

                        <div className='thumbnail-content'>
                            <a href='/sbr-apps' className='btn btn-green'>View Applications</a>
                        </div>
                    </div>
                </div>
                <div className='sect-container green-border'>
                    <div className='row'>
                        <div className='thumbnail-content'>
                            <h4>Appointment Schedule Requests</h4>
                        </div>

                        <div className='thumbnail-content'>
                            <a href='/appt-schedules' className='btn btn-green'>View Requests</a>
                        </div>
                    </div>
                </div>
                <div className='sect-container green-border'>
                    <div className='row'>
                        <div className='thumbnail-content'>
                            <h4>Change of Document Request</h4>
                        </div>

                        <div className='thumbnail-content'>
                            <a href='/doc-change-review' className='btn btn-green'>View Requests</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;