import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faEye } from '@fortawesome/free-solid-svg-icons';
import './home.css'; // Include the corresponding CSS file for styling
import ApplicationButtons from '../../components/applicationButtons/applicationButtons';

const Home = () => {
    // Documents Section
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId;
                const response = await fetch(`http://localhost:5000/api/document-store/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }

                const data = await response.json();
                setDocuments(data.documents);
            } catch (err) {
                console.error('Error fetching documents:', err);
                setError('Failed to load documents');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const viewDocument = async (documentId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            // Create URL with token
            const url = `http://localhost:5000/api/document-store/${documentId}`;
            
            // Open in new window with authorization header
            const newWindow = window.open('about:blank', '_blank');
            if (newWindow) {
                // Create a fetch request to get the document
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch document');
                }

                // Get the blob data
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);

                // Navigate the new window to the object URL
                newWindow.location.href = objectUrl;
            } else {
                setError('Pop-up blocked. Please allow pop-ups to view documents.');
            }
        } catch (err) {
            console.error('Error viewing document:', err);
            setError('Failed to view document');
        }
    };
    return (
        <div className="page">
            <div className="home-page list">
                <div className='heading'>
                    <h1>Welcome</h1>
                    <p>Manage your relationship with the Guyana Small Business Bureau</p>
                </div>

                <div className='sect-container green-border'>
                    <div className='heading'>
                        <h2>Applications</h2>
                        <p>Review all applications here</p>
                    </div>
                    <div className='app-nav row'>
                        <div className='widget-col'>
                            <h4>Small Business Registration Form</h4>
                        </div>
                        {/* IF  THIS APPLICATION EXISTS */}
                        <ApplicationButtons />
                        
                    </div>
                    {/* Make the application previews here */}
                </div>

                <div className='sect-container orange-border'>
                    <div className='heading'>
                        <h2>Documentation</h2>
                        <small style={{color: "red"}}>Please be careful when submitting documentation, you can only submit once<br /></small>
                        <small style={{color: "red"}}>Old documentation will be removed when documentation change has been approved</small>
                    </div>

                    {loading ? (
                        <p>Loading documents...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className='row' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                            {documents.map((doc) => (
                                <div 
                                    key={doc.id} 
                                    className='sect-container green-border'
                                    style={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center',
                                        padding: '15px',
                                        minWidth: '150px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => viewDocument(doc.id)}
                                >
                                    <FontAwesomeIcon 
                                        icon={faFolder} 
                                        size="2x" 
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <p style={{ textAlign: 'center', marginBottom: '10px' }}>
                                        {doc.document_type}
                                    </p>
                                    <button 
                                        className="btn btn-orange"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            viewDocument(doc.id);
                                        }}
                                    >
                                        View
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='btn-container'>
                        <a href='/change-document' className='btn btn-green'>Request Document Change</a>
                        <a href='/add-document' className='btn btn-green'>Add New Document</a>
                    </div>
                </div>
                
                <div>
                    <div className='heading'>
                        <h2>Schedule Appointments</h2>
                    </div>
                    <div className='row'>
                        <div className='sect'>
                            How it works:
                        </div>
                        <div className='sect'>To schedule an appointment, click “Request Appointment” and fill out the required fields. After submitting a request, our staff will review the appointment schedule and approve/reject your request based on the availability of the relevant internal attendees.<br />Red appointments have been rejected.<br />Green appointments have been approved.<br />Yellow appointments are awaiting approval.</div>
                    </div>

                    <div className='sect-container green-border'>
                    <iframe
                        src="https://calendar.google.com/calendar/embed?src=0bea85897c14e5c2a58e7bee3509c6a7d3d5a4bc1f3f5c94ef24f28d14d2d9a5%40group.calendar.google.com&ctz=America%2FGuyana"
                        style={{ border: 0, width: "100%", height: "600px" }}  title='Calendar'
                    ></iframe>

                    <div className='btn-container'>
                        <a href='/request-appointment' className='btn btn-green'>Request Appointment</a>
                    </div>
                    </div>
                </div>

                <div className='plain-sect'>
                    <div className="heading">
                        <h2>Grants</h2>
                        <p>
                        SBB offers small business development grants to eligible clients. Currently, the maximum
                        value of each grant is GYD$500,000.
                        </p>
                    </div>

                    <div className="side-by-side">
                        {/* <!-- Eligibility Section --> */}
                            <div className="column">
                            <div className="heading">
                                <h2>Eligibility</h2>
                            </div>
                            <p>
                                To be eligible for a small business development grant, the following requirements must be met:
                            </p>
                            <ul>
                                <li>Unemployed or employed by a private sector or non-governmental organization.</li>
                                <li>Owner(s) of a business or seeking to start a business.</li>
                                <li>Registered client(s) of the Small Business Bureau.</li>
                                <li>Submit copies of Business Registration, National Identification Card, and certificate of Tax Identification Number.</li>
                                <li>Submit a complete business plan document (template provided by SBB).</li>
                                <li>Submit quotations for items to be purchased with grant funding.</li>
                                <li>Submit valid GRA and NIS compliance documents.</li>
                            </ul>
                        </div>

                        {/* <!-- Grants Process Section --> */}
                        <div className="column">
                            <div className="heading">
                                <h2>Grants Process</h2>
                            </div>
                            <ul>
                                <li>Client(s) complete(s) grant application form and submits all required documents.</li>
                                <li>SBB reviews application and documents and interviews client(s).</li>
                                <li>SBB conducts a site visit of the business.</li>
                                <li>SBB submits grant documents to the Grants Committee for review and approval.</li>
                                <li>SBB informs client(s) of grant approval and invites client(s) to visit the office to sign the agreement.</li>
                                <li>Grant payment prepared, approved, and disbursed to client(s).</li>
                                <li>Client(s) submits receipts of items purchased with grant funding.</li>
                                <li>SBB conducts monitoring and evaluation visits of the business.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="btn-container">
                        <a href="https://sbb.gov.gy/wp-content/uploads/2021/06/Business-Plan-Grant-Application-Combined-Form-.pdf" className="btn btn-green">Business Plan/Grant Application Form</a>
                    </div>
                </div>

                <div className='sect-container green-border'>
                    <div className="heading">
                        <h2>Programmes</h2>
                    </div>

                    {/* Put the list of applications */}
                    <div className="list-container">
                        <div className='sect-container orange-border'>
                            <div className='programme-widget row'>
                                <div >
                                    <b>Programme Name:</b>
                                    <p>Kidpreneur</p>
                                </div>
                                <div>
                                    <b>Eligibility Status:</b>
                                    <p>Eligible</p>
                                </div>
                                <div>
                                    {/* This sends a tick to the database to say "hey I'm interested" */}
                                    <a className='btn btn-green'>Indicate Interest</a>
                                </div>
                            </div>
                                
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
            
    );
};

export default Home;
