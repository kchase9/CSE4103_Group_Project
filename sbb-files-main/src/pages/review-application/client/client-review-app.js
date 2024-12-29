import React, { useState, useEffect } from 'react';
import Containers from '../../../components/containers/containers.js';
import './client-review-app.css';
import axios from 'axios';

const ClientReviewApp = () => {
    const [registrationData, setRegistrationData] = useState({
        owners: [],
        dealerships: [],
        business_name: '',
        trading_name: '',
        primary_contact_name: '',
        primary_contact_phone: '',
        primary_contact_email: '',
        physical_address: '',
        administrative_region: '',
        trading_address: '',
        mailing_address: '',
        business_email: '',
        business_website: '',
        primary_business_sector: '',
        business_outline: '',
        business_tin: '',
        tin_registered_date: '',
        business_vat: '',
        vat_registered_date: '',
        business_nis: '',
        nis_registered_date: '',
        business_registration_location: '',
        date_business_commenced: '',
        full_time_employees: '',
        full_time_employees_female: '',
        full_time_employees_youth: '',
        full_time_employees_differently_abled: '',
        part_time_employees: '',
        part_time_employees_female: '',
        part_time_employees_youth: '',
        part_time_employees_differently_abled: '',
        gross_sales_previous: '',
        gross_sales_projection: '',
        net_business_assets: '',
        sbb_client: '',
        sbb_interactions: '',
        selected_services: [],
        grant_funding: '',
        training: '',
        loan_funding: '',
        challenges: [],
        other_challenges: '',
        owned_controlled: '',
        subsidiary_affiliate: '',
        charitable_political: '',
        declaration_primary_name: '',
        declaration_primary_signature: '',
        declaration_primary_position: '',
        declaration_primary_date: '',
        declaration_secondary_name: '',
        declaration_secondary_signature: '',
        declaration_secondary_position: '',
        declaration_secondary_date: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token not found in localStorage');

                const userId = JSON.parse(atob(token.split('.')[1])).userId;
                const response = await axios.get(`http://localhost:5000/api/registrations/user/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.length > 0) {
                    const fetchedData = response.data[0];
                    console.log('Fetched data:', fetchedData);
                    
                    // Fetch owners separately
                    const ownersResponse = await axios.get(`http://localhost:5000/api/owners/registration/${fetchedData.id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    console.log('Owners data:', ownersResponse.data);

                    setRegistrationData(prevState => ({
                        ...prevState,
                        ...fetchedData,
                        owners: ownersResponse.data || [],
                        selected_services: fetchedData.selected_services || [],
                        challenges: fetchedData.challenges || []
                    }));
                } else {
                    setError('No registration data found.');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch registration data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderField = (label, value) => (
        <div className="row">
            <label>{label}</label>
            <p><b>{value || 'N/A'}</b></p>
        </div>
    );

    const handleDelete = async () => {
        try {
            console.log('Registration ID to delete:', registrationData.id);
            await axios.delete(`http://localhost:5000/api/registrations/${registrationData.id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Registration deleted successfully.');
            window.location.href = '/home';
        } catch (err) {
            alert('Failed to delete registration.');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="page">
            <div className="heading">
                <h1>Small Business Registration Review</h1>
                <p>Review submitted registration details below.</p>
            </div>

            <Containers title="Section A: Business Information">
                {renderField('Business Name', registrationData.business_name)}
                {renderField('Trading Name', registrationData.trading_name)}
                {renderField('Primary Contact Name', registrationData.primary_contact_name)}
                {renderField('Primary Contact Phone', registrationData.primary_contact_phone)}
                {renderField('Primary Contact Email', registrationData.primary_contact_email)}
                {renderField('Physical Address', registrationData.physical_address)}
                {renderField('Administrative Region', registrationData.administrative_region)}
                {renderField('Trading Address', registrationData.trading_address)}
                {renderField('Mailing Address', registrationData.mailing_address)}
                {renderField('Business Email', registrationData.business_email)}
                {renderField('Business Website', registrationData.business_website)}
                {renderField('Primary Business Sector', registrationData.primary_business_sector)}
                {renderField('Business Outline', registrationData.business_outline)}
            </Containers>

            <Containers title="Section B: Registration and Compliance History">
                {renderField('Business TIN', registrationData.business_tin)}
                {renderField('TIN Registered Date', registrationData.tin_registered_date)}
                {renderField('VAT Number', registrationData.business_vat)}
                {renderField('VAT Registered Date', registrationData.vat_registered_date)}
                {renderField('NIS Number', registrationData.business_nis)}
                {renderField('NIS Registered Date', registrationData.nis_registered_date)}
                {renderField('Business Registration Location', registrationData.business_registration_location)}
                {renderField('Date Business Commenced', registrationData.date_business_commenced)}
            </Containers>

            <Containers title="Section C: Business Ownership">
                {registrationData.owners && registrationData.owners.length > 0 ? (
                    registrationData.owners.map((owner, index) => (
                        <div key={index} className="owner-entry">
                            <h4>Owner {index + 1}</h4>
                            {renderField('Full Name', owner.full_name)}
                            {renderField('Marital Status', owner.marital_status)}
                            {renderField('Position Title', owner.position_title)}
                            {renderField('Gender', owner.gender)}
                            {renderField('TIN', owner.tin)}
                            {renderField('Birthdate', owner.birthdate)}
                            {renderField('Differently Abled', owner.differently_abled ? 'Yes' : 'No')}
                            {renderField('ID Number', owner.id_number)}
                            {renderField('Education Level', owner.education_level)}
                        </div>
                    ))
                ) : (
                    <p>No ownership data available.</p>
                )}
            </Containers>

            <Containers title="Section D: Business Declaration">
                {renderField('Owned and Controlled by Shareholders', registrationData.owned_controlled)}
                {renderField('Subsidiary or Affiliate', registrationData.subsidiary_affiliate)}
                {renderField('Charitable or Political Purpose', registrationData.charitable_political)}
                {renderField('Primary Applicant Name', registrationData.declaration_primary_name)}
                {renderField('Primary Applicant Position', registrationData.declaration_primary_position)}
                {renderField('Primary Applicant Date', registrationData.declaration_primary_date)}
                {renderField('Secondary Applicant Name', registrationData.declaration_secondary_name)}
                {renderField('Secondary Applicant Position', registrationData.declaration_secondary_position)}
                {renderField('Secondary Applicant Date', registrationData.declaration_secondary_date)}
            </Containers>

            <div className="btn-container">
                <button className="btn btn-red" onClick={handleDelete}>Delete</button>
                <a href="/home" className="btn btn-gray">Back</a>
            </div>
        </div>
    );
};

export default ClientReviewApp;