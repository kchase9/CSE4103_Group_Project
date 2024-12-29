import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import EditInfoLayout from '../../templates/edit-info-layout/edit-info-layout.js';
import './request-document-change.css';

const RequestDocumentChange = () => {
    const [selectedDocument, setSelectedDocument] = useState('');
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [availableDocuments, setAvailableDocuments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user ID from token
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserId(payload.userId);
                fetchUserDocuments(payload.userId);
            } catch (err) {
                console.error('Error decoding token:', err);
                setError('Authentication error. Please log in again.');
            }
        }
    }, []);

    const fetchUserDocuments = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/document-store/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch documents');
            
            const data = await response.json();
            // Only show documents that have been uploaded
            setAvailableDocuments(data.documents.map(doc => doc.document_type));
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to load documents');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedDocument || !reason || !file || (!otherReason && reason === 'Other')) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData();
        formData.append('documentType', selectedDocument);
        formData.append('reason', reason);
        formData.append('otherReason', otherReason);
        formData.append('file', file);
        formData.append('userId', userId);

        try {
            const response = await fetch('http://localhost:5000/api/document-change/submit', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to submit request');
            }

            setSuccess('Document change request submitted successfully');
            // Reset form
            setSelectedDocument('');
            setReason('');
            setOtherReason('');
            setFile(null);
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';

            navigate('/home');
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
// Add a comment for waynetta's sale


    return (
        <EditInfoLayout title="Change of Documentation">
            <div className="request-document-change-form">
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="document-select">Select document being changed:</label>
                        <select 
                            id="document-select" 
                            value={selectedDocument}
                            onChange={(e) => setSelectedDocument(e.target.value)}
                            required
                        >
                            <option value="">Select a document</option>
                            {availableDocuments.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group row">
                        <label>Reason for change of documentation:</label>
                        <div className="radio-group">
                            {[
                                "Legal Name Change",
                                "Expired Document",
                                "Previous Incorrect Submission",
                                "Other",
                            ].map((option, index) => (
                                <label key={index} className="radio-option">
                                    <input 
                                        type="radio" 
                                        name="reason" 
                                        value={option}
                                        checked={reason === option}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        
                        {reason === 'Other' && (
                            <input 
                                type='text' 
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                                placeholder='Please specify reason'
                                required
                            />
                        )}
                    </div>

                    <div className="form-group row">
                        <label htmlFor="upload-document">Upload New Document:</label>
                        <input 
                            type="file" 
                            id="upload-document"
                            onChange={(e) => setFile(e.target.files[0])}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            required
                        />
                    </div>

                    <div className='btn-container'>
                        <a href='/home' className="btn btn-gray">Cancel</a>
                        <button 
                            type="submit" 
                            className="btn btn-green"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </EditInfoLayout>
    );
};

export default RequestDocumentChange;