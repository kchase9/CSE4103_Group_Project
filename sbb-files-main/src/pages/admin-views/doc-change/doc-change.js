
import React, { useState, useEffect } from 'react';
import ViewListLayout from "../../../templates/view-list-layout/view-list-layout.js";
import axios from "axios";
import { API_BASE_URL } from "../../../../src/config.js";

const DocChange = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/api/document-change/pending`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                setRequests(response.data || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching document change requests:', err);
                if (err.response?.status === 403) {
                    setError('Access denied. Admin privileges required.');
                } else {
                    setError('Failed to load document change requests. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${API_BASE_URL}/api/document-change/approve/${requestId}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            // Refresh the requests list
            const response = await axios.get(`${API_BASE_URL}/api/document-change/pending`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setRequests(response.data || []);
            setError(null);
        } catch (err) {
            console.error('Error approving request:', err);
            setError('Failed to approve request. Please try again.');
        }
    };

    const handleReject = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${API_BASE_URL}/api/document-change/reject/${requestId}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            // Refresh the requests list
            const response = await axios.get(`${API_BASE_URL}/api/document-change/pending`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setRequests(response.data || []);
            setError(null);
        } catch (err) {
            console.error('Error rejecting request:', err);
            setError('Failed to reject request. Please try again.');
        }
    };

    if (loading) {
        return (
            <ViewListLayout title='Document Change Requests'>
                <div className="sect-container">
                    <p>Loading requests...</p>
                </div>
            </ViewListLayout>
        );
    }

    if (error) {
        return (
            <ViewListLayout title='Document Change Requests'>
                <div className="sect-container red-border">
                    <p className="text-red-600">{error}</p>
                </div>
            </ViewListLayout>
        );
    }

    return (
        <ViewListLayout title='Document Change Requests'>
            <div className='list-view'>
                {requests.length === 0 ? (
                    <div className="sect-container orange-border">
                        <p>No pending document change requests found.</p>
                    </div>
                ) : (
                    requests.map((request) => (
                        <div key={request.id} className="sect-container green-border">
                            <div className="row">
                                <div className='widget-col'>
                                    <strong>User Name</strong>
                                    <p>{request.user_name || 'N/A'}</p>
                                </div>
                                <div className='widget-col'>
                                    <strong>Document Type</strong>
                                    <p>{request.document_type || 'N/A'}</p>
                                </div>
                                <div className='widget-col'>
                                    <strong>Reason</strong>
                                    <p>{request.reason}</p>
                                    {request.other_reason && (
                                        <p className="text-sm italic">
                                            Additional Info: {request.other_reason}
                                        </p>
                                    )}
                                </div>
                                <div className='widget-col'>
                                    <strong>File Name</strong>
                                    <p>{request.filename || 'N/A'}</p>
                                </div>
                                <div className='widget-col'>
                                    <strong>Requested Date</strong>
                                    <p>{new Date(request.requested_at).toLocaleDateString() || 'N/A'}</p>
                                </div>
                                
                                <div className='widget-col'>
                                    <div className="btn-container">
                                        <button 
                                            onClick={() => handleApprove(request.id)}
                                            className="btn btn-green"
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handleReject(request.id)}
                                            className="btn btn-gray"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </ViewListLayout>
    );
};

export default DocChange;