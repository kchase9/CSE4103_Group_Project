import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './add-document.css';
import EditInfoLayout from '../../templates/edit-info-layout/edit-info-layout.js';

const AddDocument = () => {
    const [documentType, setDocumentType] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [availableDocuments, setAvailableDocuments] = useState([]);

    const navigate = useNavigate();


    // Get user ID from token when component mounts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUserId(payload.userId);
                // Fetch document status after setting userId
                fetchDocumentStatus(payload.userId);
            } catch (err) {
                console.error('Error decoding token:', err);
                setError('Authentication error. Please log in again.');
            }
        } else {
            setError('Please log in to upload documents.');
        }
    }, []);

    const fetchDocumentStatus = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/document-store/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch document status');
            }

            const data = await response.json();
            
            // Create a mapping of frontend names to database column names
            const documentMapping = {
                'Business Registration': 'business_registration',
                'TIN': 'tin_certificate',
                'NIS': 'nis_certificate',
                'GRA Compliance Letter': 'gra_compliance_letter',
                'NIS Compliance Letter': 'nis_compliance_letter',
                'Operational License(s)': 'operational_license',
                'Compliance Standard(s) Certificates': 'compliance_certificate',
                'Owner TIN Certificate': 'owner_tin_certificate',
                'ID Card(s)': 'id_cards'
            };

            // Filter available documents based on status
            const available = Object.entries(documentMapping)
                .filter(([_, dbColumn]) => !data.documentStatus[dbColumn])
                .map(([displayName]) => displayName);

            setAvailableDocuments(available);
        } catch (err) {
            console.error('Error fetching document status:', err);
            setError('Failed to load available document types');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setError('Please log in to upload documents.');
            return;
        }

        if (!documentType) {
            setError('Please select a document type.');
            return;
        }

        if (!file) {
            setError('Please upload a file.');
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        const formData = new FormData();
        formData.append('documentType', documentType);
        formData.append('file', file);
        formData.append('userId', userId);

        try {
            const response = await fetch('http://localhost:5000/api/document-store/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to upload document.');
            }

            const result = await response.json();
            setSuccess('Document uploaded successfully.');
            
            // Reset form
            setDocumentType('');
            setFile(null);
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.value = '';
            }

            navigate('/home');
        } catch (err) {
            console.error('Error uploading document:', err);
            setError(err.message || 'Failed to upload document.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <EditInfoLayout title="Add Document">
            <div className="add-document-form">
                <div className="heading">
                    <h2>Select document being submitted:</h2>
                </div>

                <form onSubmit={handleSubmit}>
                <div className="radio-group">
                        {availableDocuments.map((option, index) => (
                            <label key={index} className="radio-option">
                                <input
                                    type="radio"
                                    name="documentType"
                                    value={option}
                                    checked={documentType === option}
                                    onChange={(e) => setDocumentType(e.target.value)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>

                    {availableDocuments.length === 0 && (
                        <div className="info-message">All required documents have been uploaded.</div>
                    )}

                    <div className="file-upload">
                        <label htmlFor="upload">Upload Document:</label>
                        <input
                            type="file"
                            id="upload"
                            name="upload"
                            onChange={(e) => setFile(e.target.files[0])}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <div className='btn-container'>
                        <a href='/home' className='btn btn-gray'>Home</a>
                        <button 
                            type="submit" 
                            className="btn btn-green"
                            disabled={!userId || loading}
                        >
                            {loading ? 'Uploading...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </EditInfoLayout>
    );
};

export default AddDocument;