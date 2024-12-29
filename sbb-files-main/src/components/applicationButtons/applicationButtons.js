import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationButtons = () => {
  const [hasRegistration, setHasRegistration] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const userId = JSON.parse(atob(token.split('.')[1])).userId;
        
        try {
          const response = await axios.get(`http://localhost:5000/api/registrations/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          // If we get here, we found registrations
          setHasRegistration(true);
          
        } catch (apiError) {
          // If it's a 404, that means no registration exists - this is not an error
          if (apiError.response && apiError.response.status === 404) {
            setHasRegistration(false);
          } else {
            // For other types of errors, rethrow them
            throw apiError;
          }
        }

      } catch (err) {
        console.error('Error checking registration:', err);
        setError(err.message === 'No authentication token found' 
          ? 'Please log in to view your applications' 
          : 'Unable to check registration status');
      } finally {
        setLoading(false);
      }
    };

    checkRegistration();
  }, []);

  if (loading) {
    return <div className="widget-col">Loading application status...</div>;
  }

  if (error) {
    return <div className="widget-col text-red-600">{error}</div>;
  }

  return (
    <div id='app-nav-btn' className='row btn-container'>
      <div className='widget-col'>
        {hasRegistration ? (
          <a href='/client-review-app' className='btn btn-green'>
            Review Application
          </a>
        ) : (
          <a href='/sb-registration' className='btn btn-green'>
            Start Application
          </a>
        )}
      </div>
    </div>
  );
};

export default ApplicationButtons;