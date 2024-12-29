import React, { useState } from 'react';
import Containers from '../../components/containers/containers.js';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './sb-registration.css';

const SBRegistration = () =>{
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        eligibility: {
          employs_less_than_25: false,
          revenue_less_than_60m: false,
          assets_less_than_20m: false
        },
        business_name: '',
        trading_name: '',
        registration_type: [],
        registration_type_other: '',
        primary_contact_name: '',
        primary_contact_phone: '',
        primary_contact_email: '',
        secondary_contact_name: '',
        secondary_contact_phone: '',
        secondary_contact_email: '',
        physical_address: '',
        administrative_region: '',
        trading_address: '',
        mailing_address: '',
        business_email: '',
        business_website: '',
        business_phone: '',
        primary_business_sector: '',
        business_outline: '',
        industry_types: [],
        industry_type_other: '',
        business_tin: '',
        tin_registered_date: '',
        business_vat: '',
        vat_registered_date: '',
        business_nis: '',
        nis_registered_date: '',
        business_registration_location: '',
        date_business_commenced: '',
        compliance_history_paye_number: '',
        compliance_history_paye_date: '',
        compliance_history_income_tax_number: '',
        compliance_history_income_tax_date: '',
        compliance_history_vat_number: '',
        compliance_history_vat_date: '',
        compliance_history_nis_number: '',
        compliance_history_nis_date: '',
        license_name: '',
        license_number: '',
        license_expiration: '',
        license_details: '',
        
        // Dealership 1
        dealership_id_1: '',
        dealership_contact_person_1: '',
        dealership_contact_phone_1: '',
        dealership_contact_email_1: '',
        dealership_appointed_date_1: '',
        dealership_type_products_1: '',
        
        // Dealership 2
        dealership_id_2: '',
        dealership_contact_person_2: '',
        dealership_contact_phone_2: '',
        dealership_contact_email_2: '',
        dealership_appointed_date_2: '',
        dealership_type_products_2: '',
        full_time_employees: '',
        full_time_employees_female: '',
        full_time_employees_youth: '',
        full_time_employees_differently_abled: '',
        
        // Section E: Part-Time Employees
        part_time_employees: '',
        part_time_employees_female: '',
        part_time_employees_youth: '',
        part_time_employees_differently_abled: '',
        
        // Section E: Financial Information
        gross_sales_previous: '',
        gross_sales_projection: '',
        net_business_assets: '',

        sbb_client: '',
        sbb_interactions: '',
        services: [],
        grant_amount: '',
        training_type: '',
        loan_amount: '',
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
        declaration_secondary_date: '',
      });

      const [errors, setErrors] = useState({});

      const [owners, setOwners] = useState([
        {
            id: 1,
            full_name: '',          // Changed from fullName to full_name to match backend
            marital_status: '',     // Changed from maritalStatus to marital_status
            position_title: '',     // Changed from positionTitle to position_title
            gender: '',
            tin: '',
            birthdate: '',
            differently_abled: '',  // Changed from differentlyAbled to differently_abled
            id_number: '',         // Changed from idNumber to id_number
            education_level: '',    // Changed from educationLevel to education_level
        },
    ]);

    // Function to add a new owner entry
    const addOwnerEntry = () => {
        setOwners([
            ...owners,
            {
                id: owners.length + 1,
                full_name: '',
                marital_status: '',
                position_title: '',
                gender: '',
                tin: '',
                birthdate: '',
                differently_abled: '',
                id_number: '',
                education_level: '',
            },
        ]);
    };

    // Function to remove the last owner entry
    // Remove the last owner
    const removeLastOwner = () => {
        if (owners.length > 1) {
            setOwners(owners.slice(0, -1));
        }
    };

// Remove a specific owner by ID
    const removeSpecificOwner = (id) => {
        if (owners.length > 1) {
            setOwners(owners.filter(owner => owner.id !== id));
        } else {
            alert('At least one owner must be listed.');
        }
    };

// Handle changes for owner fields
    const handleOwnerChange = (id, field, value) => {
        setOwners(owners.map(owner =>
            owner.id === id ? { ...owner, [field]: value } : owner
        ));
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
          if (name === 'registration_type' || name === 'industry_types' || 
              name === 'services' || name === 'challenges') {
            setFormData(prevData => ({
              ...prevData,
              [name]: checked 
                ? [...prevData[name], value]
                : prevData[name].filter(item => item !== value)
            }));
          } else {
            setFormData(prevData => ({
              ...prevData,
              [name]: checked
            }));
          }
        } else {
          setFormData(prevData => ({
            ...prevData,
            [name]: value
          }));
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId;
    
            // Prepare registration data
            const registrationData = {
                user_id: userId,
                business_name: formData.business_name,
                trading_name: formData.trading_name,
                registration_type: formData.registration_type.join(', '),
                registration_type_other: formData.registration_type_other,
                primary_contact_name: formData.primary_contact_name,
                primary_contact_phone: formData.primary_contact_phone,
                primary_contact_email: formData.primary_contact_email,
                secondary_contact_name: formData.secondary_contact_name,
                secondary_contact_phone: formData.secondary_contact_phone,
                secondary_contact_email: formData.secondary_contact_email,
                physical_address: formData.physical_address,
                business_tin: formData.business_tin,
                tin_registered_date: formData.tin_registered_date,
                business_vat: formData.business_vat,
                vat_registered_date: formData.vat_registered_date,
                business_nis: formData.business_nis,
                nis_registered_date: formData.nis_registered_date,
                business_registration_location: formData.business_registration_location,
                date_business_commenced: formData.date_business_commenced,
                compliance_history_paye_number: formData.compliance_history_paye_number,
                compliance_history_income_tax_number: formData.compliance_history_income_tax_number,
                compliance_history_vat_number: formData.compliance_history_vat_number,
                compliance_history_nis_number: formData.compliance_history_nis_number,
                declaration_primary_name: formData.declaration_primary_name,
                declaration_primary_signature: formData.declaration_primary_signature,
                declaration_primary_date: formData.declaration_primary_date,
                declaration_primary_position: formData.declaration_primary_position,
                declaration_secondary_name: formData.declaration_secondary_name,
                declaration_secondary_signature: formData.declaration_secondary_signature,
                declaration_secondary_date: formData.declaration_secondary_date,
                declaration_secondary_position: formData.declaration_secondary_position,
                business_email: formData.business_email,
                business_phone: formData.business_phone,
                business_outline: formData.business_outline,
                primary_business_sector: formData.primary_business_sector,
            };
    
            console.log('Submitting registration data:', registrationData);
        
        const registrationResponse = await axios.post('/api/registrations', registrationData);
        console.log('Registration response:', registrationResponse);

        if (registrationResponse.status !== 201) {
            throw new Error('Failed to submit registration data');
        }

        const registrationId = registrationResponse.data.id;

        // Submit each owner individually
        for (const owner of owners) {
            const ownerData = {
                registration_id: registrationId,
                full_name: owner.full_name,
                marital_status: owner.marital_status,
                position_title: owner.position_title,
                gender: owner.gender,
                tin: owner.tin,
                birthdate: owner.birthdate,
                differently_abled: owner.differently_abled === 'yes',
                id_number: owner.id_number,
                education_level: owner.education_level
            };

            console.log('Submitting owner data:', ownerData);

            try {
                const ownerResponse = await axios.post('/api/owners', ownerData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Owner submission response:', ownerResponse);
            } catch (ownerError) {
                console.error('Error submitting owner:', ownerError);
                throw new Error(`Failed to submit owner ${owner.full_name}: ${ownerError.response?.data?.error || ownerError.message}`);
            }
        }

        alert('Registration and all owners submitted successfully!');
        navigate('/home');

    } catch (error) {
        console.error('Full error object:', error);
        console.error('Error response data:', error.response?.data);
        console.error('Error response status:', error.response?.status);
        
        let errorMessage = 'An error occurred while submitting the registration.';
        if (error.response?.data?.error) {
            errorMessage += ` ${error.response.data.error}`;
        } else if (error.message) {
            errorMessage += ` ${error.message}`;
        }
        
        alert(errorMessage);
    }
};
    
    return (
        <div className='page'>
            <div className="heading">
                <h1>Small Business Registration</h1>
                <p>Please fill out the form below</p>
            </div>
            <form onSubmit={handleSubmit}>
                <Containers title='Verify your status as a Small Business'>
                    <p>
                        To qualify for registration as an Approved Small Business and be eligible for participation in the Small Business Procurement Programme,
                        businesses must satisfy the requirements of a small business as set out in the Small Business Act of 2004 (Section 2.(1).a-f): <br />

                        Section 2.(1).a-f of the Small Business Act of 2004 states: "small business" means any person or persons, including a body corporate or unincorporate, carrying on business in Guyana for gain or profit and satisfying the criteria listed hereunder, but does not include any business having as its principal object the furtherance of a charitable or political purpose -<br />
                        <ul>
                        <li>is incorporated or registered under the Companies Act 1991 or the Business Names (Registration) Act; or</li>
                        <li>is a partnership under the Partnership Act;</li>
                        <li>is owned by a person or persons trading not under the Companies Act nor in partnership;</li>
                        <li>is a registered cooperative society under the Co-operative Societies Act;</li>
                        <li>is owned and controlled by those persons who hold the majority shareholding or controlling interests in the business, and is not a subsidiary or affiliate of another company; and</li>
                        <li>satisfies all three(3) of the following conditions:</li>
                        </ul>
                        <div className='list'>
                        <label>
                            <input 
                            type="checkbox" 
                            id="employs_less_than_25" 
                            name="employs_less_than_25"
                            checked={formData.eligibility.employs_less_than_25}
                            onChange={(e) => {
                                setFormData(prev => ({
                                ...prev,
                                eligibility: {
                                    ...prev.eligibility,
                                    employs_less_than_25: e.target.checked
                                }
                                }));
                            }}
                            />
                            Employs not more than 25 employees
                        </label>
                        <label>
                            <input 
                            type="checkbox" 
                            id="revenue_less_than_60m" 
                            name="revenue_less_than_60m"
                            checked={formData.eligibility.revenue_less_than_60m}
                            onChange={(e) => {
                                setFormData(prev => ({
                                ...prev,
                                eligibility: {
                                    ...prev.eligibility,
                                    revenue_less_than_60m: e.target.checked
                                }
                                }));
                            }}
                            />
                            Has gross annual revenue of not more than 60 million
                        </label>
                        <label>
                            <input 
                            type="checkbox" 
                            id="assets_less_than_20m" 
                            name="assets_less_than_20m"
                            checked={formData.eligibility.assets_less_than_20m}
                            onChange={(e) => {
                                setFormData(prev => ({
                                ...prev,
                                eligibility: {
                                    ...prev.eligibility,
                                    assets_less_than_20m: e.target.checked
                                }
                                }));
                            }}
                            />
                            Has total business assets of not more than twenty million dollars
                        </label>
                        </div>
    <br />
                    <b>TO QUALIFY FOR REGISTRATION, YOUR BUSINESS MUST: BE REGISTERED UNDER THE COMPANIES ACT 1991, BUSINESS NAMES (REGISTRATION) ACT, PARTNERSHIP ACT, OR CO-OPERATIVE SOCIETIES ACT; NOT BE A SUBSIDIARY OR AFFILIATE OF ANOTHER COMPANY; AND MEET AT LEAST TWO OF THE CONDITIONS STATED IN SUB-SECTION F.<br /></b>
                    <b>Please apply for registration only if qualified<br /></b>
                    An e-mail acknowledging receipt of the form and its details, with an application number, will be sent by SBB to the primary contact person identified on the form for verification of accuracy of the supplied data. Once SBB completes internal verification of the supplied data with its sister GCRG agencies, an e-mail of the small business registration certificate with the registration number will be sent to the primary contact person identified on the form, or can be collected from SBB. For more information please e-mail sbbgyinfo@gmail.com or call +592 226-8120, +592 226-8123, or +592 226-8133.
                    </p>
                </Containers>
                <Containers title="Section A: Business Information">
                    <p>
                        A.2 Trading Name - If different from commonly used name, enter the business name as on the Business Registration (Companies/Business Names/Partnership/Co-operative). <br />
                        A.3 Business Type* - Tick more than one box if necessary. Specify Other business type in the box provided next to Other checkbox.<br />
                        A.4 Primary Contact Information* - How SBB contacts the business. SBB must be immediately informed in writing if changed. A.4.c E-mail Address* - Primary contact e-mail address. All correspondence between SBB and business will use this address.<br />
                        A.5 Secondary Contact Information - Alternative contact information if the primary contact is unreachable. SBB must be informed of any changes.<br />
                        A.7 Trading Address - If different from Physical Address, enter the full Business Trading Address as on the Business Registration.<br />
                        A.12 Primary Business Sector* - Name the specific business activities, e.g. Manufacture of musical instruments, or Processing and preserving of fruits and vegetables.<br />
                        A.13 Industry Type(s)* - Select based on the main business activity(ies).<br />
                        A.14 Business Outline (Describe specific business activities)* - Write a brief outline of exactly what the business does. For example, if it is in the sector "Processing and preserving of fruits and vegetables", describe which part(s) of the processing and/or preserving the business completes: "shelling peanuts" or "picking, peeling and cutting, and cooking fruit into jam".
                    </p>
                    <div className='list'>
                        <div className="row">
                        <label htmlFor="business_name">Business Name*</label>
                        <input
                            type="text"
                            id="business_name"
                            name="business_name"
                            value={formData.business_name}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="trading_name">Trading Name (if different)</label>
                        <input
                            type="text"
                            id="trading_name"
                            name="trading_name"
                            value={formData.trading_name}
                            onChange={handleChange}
                        />
                        </div>

                        <div className="row">
                        <label>Business Registration Type*</label>
                        <div className='list'>
                            <label>
                            <input
                                type="checkbox"
                                name="registration_type"
                                value="business_names"
                                checked={formData.registration_type.includes('business_names')}
                                onChange={handleChange}
                            />
                            Business Names Registration
                            </label>
                            <label>
                            <input
                                type="checkbox"
                                name="registration_type"
                                value="registered_company"
                                checked={formData.registration_type.includes('registered_company')}
                                onChange={handleChange}
                            />
                            Registered Company
                            </label>
                            <label>
                            <input
                                type="checkbox"
                                name="registration_type"
                                value="partnership"
                                checked={formData.registration_type.includes('partnership')}
                                onChange={handleChange}
                            />
                            Partnership
                            </label>
                            <label>
                            <input
                                type="checkbox"
                                name="registration_type"
                                value="cooperative"
                                checked={formData.registration_type.includes('cooperative')}
                                onChange={handleChange}
                            />
                            Cooperative
                            </label>
                            <label>
                            <input
                                type="checkbox"
                                name="registration_type"
                                value="other"
                                checked={formData.registration_type.includes('other')}
                                onChange={handleChange}
                            />
                            Other
                            </label>
                            <input
                            type="text"
                            name="registration_type_other"
                            placeholder="Specify Other"
                            value={formData.registration_type_other}
                            onChange={handleChange}
                            />
                        </div>
                        </div>

                        <div className="row">
                        <label htmlFor="primary_contact_name">Primary Contact Name*</label>
                        <input
                            type="text"
                            id="primary_contact_name"
                            name="primary_contact_name"
                            value={formData.primary_contact_name}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="primary_contact_phone">Primary Contact Phone*</label>
                        <input
                            type="tel"
                            id="primary_contact_phone"
                            name="primary_contact_phone"
                            value={formData.primary_contact_phone}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="primary_contact_email">Primary Contact Email*</label>
                        <input
                            type="email"
                            id="primary_contact_email"
                            name="primary_contact_email"
                            value={formData.primary_contact_email}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="secondary_contact_name">Secondary Contact Name</label>
                        <input
                            type="text"
                            id="secondary_contact_name"
                            name="secondary_contact_name"
                            value={formData.secondary_contact_name}
                            onChange={handleChange}
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="secondary_contact_phone">Secondary Contact Phone</label>
                        <input
                            type="tel"
                            id="secondary_contact_phone"
                            name="secondary_contact_phone"
                            value={formData.secondary_contact_phone}
                            onChange={handleChange}
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="secondary_contact_email">Secondary Contact Email</label>
                        <input
                            type="email"
                            id="secondary_contact_email"
                            name="secondary_contact_email"
                            value={formData.secondary_contact_email}
                            onChange={handleChange}
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="physical_address">Physical Address*</label>
                        <textarea
                            id="physical_address"
                            name="physical_address"
                            rows="3"
                            value={formData.physical_address}
                            onChange={handleChange}
                            required
                        ></textarea>
                        </div>

                        <div className="row">
                        <label htmlFor="administrative_region">Administrative Region*</label>
                        <select
                            id="administrative_region"
                            name="administrative_region"
                            value={formData.administrative_region}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Region</option>
                            <option value="region_1">Region 1</option>
                            <option value="region_2">Region 2</option>
                            <option value="region_3">Region 3</option>
                            <option value="region_4">Region 4</option>
                            <option value="region_5">Region 5</option>
                            <option value="region_6">Region 6</option>
                            <option value="region_7">Region 7</option>
                            <option value="region_8">Region 8</option>
                            <option value="region_9">Region 9</option>
                            <option value="region_10">Region 10</option>
                        </select>
                        </div>

                        <div className="row">
                        <label htmlFor="trading_address">Trading Address (if different)</label>
                        <textarea
                            id="trading_address"
                            name="trading_address"
                            rows="3"
                            value={formData.trading_address}
                            onChange={handleChange}
                        ></textarea>
                        </div>

                        <div className="row">
                        <label htmlFor="mailing_address">Mailing Address (if different)</label>
                        <textarea
                            id="mailing_address"
                            name="mailing_address"
                            rows="3"
                            value={formData.mailing_address}
                            onChange={handleChange}
                        ></textarea>
                        </div>

                        <div className="row">
                        <label htmlFor="business_email">Business Email Address*</label>
                        <input
                            type="email"
                            id="business_email"
                            name="business_email"
                            value={formData.business_email}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="business_website">Business Website</label>
                        <input
                            type="text"
                            id="business_website"
                            name="business_website"
                            value={formData.business_website}
                            onChange={handleChange}
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="business_phone">Business Phone Number*</label>
                        <input
                            type="tel"
                            id="business_phone"
                            name="business_phone"
                            value={formData.business_phone}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="primary_business_sector">Primary Business Sector*</label>
                        <input
                            type="text"
                            id="primary_business_sector"
                            name="primary_business_sector"
                            value={formData.primary_business_sector}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="business_outline">Business Outline*</label>
                        <textarea
                            id="business_outline"
                            name="business_outline"
                            rows="4"
                            value={formData.business_outline}
                            onChange={handleChange}
                            required
                        ></textarea>
                        </div>

                        <div className="row">
                        <label>Industry Types*</label>
                        <div className='list'>
                            <label>
                            <input
                                type="checkbox"
                                name="industry_types"
                                value="works"
                                checked={formData.industry_types.includes('works')}
                                onChange={handleChange}
                            />
                            Works
                            </label>
                            <label>
                            <input
                                type="checkbox"
                                name="industry_types"
                                value="goods"
                                checked={formData.industry_types.includes('goods')}
                                onChange={handleChange}
                            />
                            Goods
                            </label>
                            <label>
                            <input
                                type="checkbox"
                                name="industry_types"
                                value="consulting_services"
                                checked={formData.industry_types.includes('consulting_services')}
                                onChange={handleChange}
                            />
                            Consulting Services
                            </label>
                            <label>
                            <input
                                type="checkbox"
                                name="industry_types"
                                value="other_services"
                                checked={formData.industry_types.includes('other_services')}
                                onChange={handleChange}
                            />
                            Other Services
                            </label>
                            <label>
                            <input
                                type="checkbox"
                                name="industry_types"
                                value="other"
                                checked={formData.industry_types.includes('other')}
                                onChange={handleChange}
                            />
                            Other
                            </label>
                            <input
                            type="text"
                            name="industry_type_other"
                            placeholder="Specify Other"
                            value={formData.industry_type_other}
                            onChange={handleChange}
                            />
                        </div>
                        </div>
                    </div>
                </Containers>

                <Containers title="Section B: Registration and Compliance History">
                    <p>
                        B.4 Business TIN* - Enter business's registered TIN. All businesses must have a Tax Identification Number; local or foreign.<br />
                        B.5 Business VAT No.* - Enter business's VAT registration number. Enter N/A if no Value Added Tax registration.<br />
                        B.6 Business NIS No.* - Enter business's NIS registration number. All local businesses must have a National Insurance Scheme registration number.<br />
                    </p>
                    <div className='list'>
                        <div className="row">
                        <label htmlFor="business_tin">Business TIN*</label>
                        <input
                            type="text"
                            id="business_tin"
                            name="business_tin"
                            value={formData.business_tin}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="tin_registered_date">TIN Registered Date*</label>
                        <input
                            type="date"
                            id="tin_registered_date"
                            name="tin_registered_date"
                            value={formData.tin_registered_date}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="business_vat">Business VAT No.*</label>
                        <input
                            type="text"
                            id="business_vat"
                            name="business_vat"
                            value={formData.business_vat}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="vat_registered_date">VAT Registered Date*</label>
                        <input
                            type="date"
                            id="vat_registered_date"
                            name="vat_registered_date"
                            value={formData.vat_registered_date}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="business_nis">Business NIS No.*</label>
                        <input
                            type="text"
                            id="business_nis"
                            name="business_nis"
                            value={formData.business_nis}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="nis_registered_date">NIS Registered Date*</label>
                        <input
                            type="date"
                            id="nis_registered_date"
                            name="nis_registered_date"
                            value={formData.nis_registered_date}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor="business_registration_location">Business Registration Location*</label>
                        <select
                            id="business_registration_location"
                            name="business_registration_location"
                            value={formData.business_registration_location}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Location</option>
                            <option value="guyana">Guyana</option>
                            <option value="other">Other</option>
                        </select>
                        </div>

                        <div className="row">
                        <label htmlFor="date_business_commenced">Date Business Commenced*</label>
                        <input
                            type="date"
                            id="date_business_commenced"
                            name="date_business_commenced"
                            value={formData.date_business_commenced}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className='row'>
                        <div className="list-subsect">
                            <label htmlFor="compliance_history_paye_number">Compliance History - PAYE Number*</label>
                            <input
                            type="text"
                            id="compliance_history_paye_number"
                            name="compliance_history_paye_number"
                            value={formData.compliance_history_paye_number}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="list-subsect">
                            <label htmlFor="compliance_history_paye_date">PAYE Registered Date*</label>
                            <input
                            type="month"
                            id="compliance_history_paye_date"
                            name="compliance_history_paye_date"
                            value={formData.compliance_history_paye_date}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        </div>

                        <div className='row'>
                        <div className="list-subsect">
                            <label htmlFor="compliance_history_income_tax_number">Compliance History - Income Tax Number*</label>
                            <input
                            type="text"
                            id="compliance_history_income_tax_number"
                            name="compliance_history_income_tax_number"
                            value={formData.compliance_history_income_tax_number}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="list-subsect">
                            <label htmlFor="compliance_history_income_tax_date">Income Tax Registered Date*</label>
                            <input
                            type="month"
                            id="compliance_history_income_tax_date"
                            name="compliance_history_income_tax_date"
                            value={formData.compliance_history_income_tax_date}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        </div>

                        <div className='row'>
                        <div className="list-subsect">
                            <label htmlFor="compliance_history_vat_number">Compliance History - VAT Number*</label>
                            <input
                            type="text"
                            id="compliance_history_vat_number"
                            name="compliance_history_vat_number"
                            value={formData.compliance_history_vat_number}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="list-subsect">
                            <label htmlFor="compliance_history_vat_date">VAT Registered Date*</label>
                            <input
                            type="month"
                            id="compliance_history_vat_date"
                            name="compliance_history_vat_date"
                            value={formData.compliance_history_vat_date}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        </div>

                        <div className='row'>
                        <div className="list-subsect">
                            <label htmlFor="compliance_history_nis_number">Compliance History - NIS Number*</label>
                            <input
                            type="text"
                            id="compliance_history_nis_number"
                            name="compliance_history_nis_number"
                            value={formData.compliance_history_nis_number}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="list-subsect">
                            <label htmlFor="compliance_history_nis_date">NIS Registered Date*</label>
                            <input
                            type="month"
                            id="compliance_history_nis_date"
                            name="compliance_history_nis_date"
                            value={formData.compliance_history_nis_date}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        </div>
                    </div>
                    </Containers>

                {/* <Containers title="Section C: Business Ownership Information">
                <p>Enter primary owner information first. All owners must be listed.<br /></p>
                <div id="owners-section" className="list">
                    {owners.map((owner, index) => (
                    <div key={owner.id} className="owner-entry list">
                        <h4>Owner {index + 1}</h4>
                        <div className="row">
                        <label htmlFor={`owner_full_name_${owner.id}`}>Owner Full Name*</label>
                        <input
                            type="text"
                            id={`owner_full_name_${owner.id}`}
                            name={`owner_full_name_${owner.id}`}
                            value={owner.full_name}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'full_name', e.target.value)
                            }
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor={`owner_marital_status_${owner.id}`}>Marital Status*</label>
                        <select
                            id={`owner_marital_status_${owner.id}`}
                            name={`owner_marital_status_${owner.id}`}
                            placeholder={owner.maritalStatus}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'marital_status', e.target.value)
                            }
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>
                        </div>

                        <div className="row">
                        <label htmlFor={`owner_position_title_${owner.id}`}>Position Title*</label>
                        <input
                            type="text"
                            id={`owner_position_title_${owner.id}`}
                            name={`owner_position_title_${owner.id}`}
                            placeholder={owner.positionTitle}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'position_title', e.target.value)
                            }
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor={`owner_gender_${owner.id}`}>Gender*</label>
                        <select
                            id={`owner_gender_${owner.id}`}
                            name={`owner_gender_${owner.id}`}
                            value={owner.gender}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'gender', e.target.value)
                            }
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-Binary</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                        </div>

                        <div className="row">
                        <label htmlFor={`owner_tin_${owner.id}`}>TIN No.*</label>
                        <input
                            type="text"
                            id={`owner_tin_${owner.id}`}
                            name={`owner_tin_${owner.id}`}
                            value={owner.tin}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'tin', e.target.value)
                            }
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor={`owner_birthdate_${owner.id}`}>Birthdate*</label>
                        <input
                            type="date"
                            id={`owner_birthdate_${owner.id}`}
                            name={`owner_birthdate_${owner.id}`}
                            value={owner.birthdate}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'birthdate', e.target.value)
                            }
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor={`owner_differently_abled_${owner.id}`}>Differently Abled*</label>
                        <select
                            id={`owner_differently_abled_${owner.id}`}
                            name={`owner_differently_abled_${owner.id}`}
                            placeholder={owner.differentlyAbled}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'differently_abled', e.target.value)
                            }
                            required
                        >
                            <option value="">Select Option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        </div>

                        <div className="row">
                        <label htmlFor={`owner_id_number_${owner.id}`}>ID No.*</label>
                        <input
                            type="text"
                            id={`owner_id_number_${owner.id}`}
                            name={`owner_id_number_${owner.id}`}
                            placeholder={owner.idNumber}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'id_number', e.target.value)
                            }
                            required
                        />
                        </div>

                        <div className="row">
                        <label htmlFor={`owner_education_level_${owner.id}`}>
                            Highest Level of Education Completed*
                        </label>
                        <select
                            id={`owner_education_level_${owner.id}`}
                            name={`owner_education_level_${owner.id}`}
                            placeholder={owner.educationLevel}
                            onChange={(e) =>
                            handleOwnerChange(owner.id, 'education_level', e.target.value)
                            }
                            required
                        >
                            <option value="">Select Education Level</option>
                            <option value="primary">Primary School</option>
                            <option value="secondary">Secondary School</option>
                            <option value="associate">Associate Degree</option>
                            <option value="bachelor">Bachelor's Degree</option>
                            <option value="master">Master's Degree</option>
                            <option value="doctorate">Doctorate</option>
                        </select>
                        </div>
                    </div>
                    ))}

                    <div className="row">
                    <button
                        className="btn btn-gray"
                        type="button"
                        id="add-owner"
                        onClick={addOwnerEntry}
                    >
                        Add Owner
                    </button>
                    <button
                        className="btn btn-gray"
                        type="button"
                        id="remove-owner"
                        onClick={removeOwnerEntry}
                    >
                        Remove Owner
                    </button>
                    </div>
                </div>
                </Containers> */}
                {/* Section C: Business Ownership Information */}
                <Containers title="Section C: Business Ownership Information">
                    <p>Enter primary owner information first. All owners must be listed. All fields marked with * are required.</p>
                    <div id="owners-section" className="list">
                        {owners.map((owner, index) => (
                            <div key={owner.id} className="owner-entry list">
                                <h4>Owner {index + 1}</h4>
                                
                                {/* Full Name */}
                                <div className="row">
                                    <label htmlFor={`owner_full_name_${owner.id}`}>Full Name*</label>
                                    <input
                                        type="text"
                                        id={`owner_full_name_${owner.id}`}
                                        name={`owner_full_name_${owner.id}`}
                                        value={owner.full_name}
                                        onChange={(e) => handleOwnerChange(owner.id, 'full_name', e.target.value)}
                                        required
                                        placeholder="Enter full legal name"
                                    />
                                </div>

                                {/* Marital Status */}
                                <div className="row">
                                    <label htmlFor={`owner_marital_status_${owner.id}`}>Marital Status*</label>
                                    <select
                                        id={`owner_marital_status_${owner.id}`}
                                        name={`owner_marital_status_${owner.id}`}
                                        value={owner.marital_status}
                                        onChange={(e) => handleOwnerChange(owner.id, 'marital_status', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Marital Status</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="widowed">Widowed</option>
                                    </select>
                                </div>

                                {/* Position Title */}
                                <div className="row">
                                    <label htmlFor={`owner_position_title_${owner.id}`}>Position Title*</label>
                                    <input
                                        type="text"
                                        id={`owner_position_title_${owner.id}`}
                                        name={`owner_position_title_${owner.id}`}
                                        value={owner.position_title}
                                        onChange={(e) => handleOwnerChange(owner.id, 'position_title', e.target.value)}
                                        required
                                        placeholder="e.g., CEO, Director, Manager"
                                    />
                                </div>

                                {/* Gender */}
                                <div className="row">
                                    <label htmlFor={`owner_gender_${owner.id}`}>Gender*</label>
                                    <select
                                        id={`owner_gender_${owner.id}`}
                                        name={`owner_gender_${owner.id}`}
                                        value={owner.gender}
                                        onChange={(e) => handleOwnerChange(owner.id, 'gender', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="non-binary">Non-Binary</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                    </select>
                                </div>

                                {/* TIN */}
                                <div className="row">
                                    <label htmlFor={`owner_tin_${owner.id}`}>Tax Identification Number (TIN)*</label>
                                    <input
                                        type="text"
                                        id={`owner_tin_${owner.id}`}
                                        name={`owner_tin_${owner.id}`}
                                        value={owner.tin}
                                        onChange={(e) => handleOwnerChange(owner.id, 'tin', e.target.value)}
                                        required
                                        placeholder="Enter TIN number"
                                    />
                                </div>

                                {/* Birthdate */}
                                <div className="row">
                                    <label htmlFor={`owner_birthdate_${owner.id}`}>Date of Birth*</label>
                                    <input
                                        type="date"
                                        id={`owner_birthdate_${owner.id}`}
                                        name={`owner_birthdate_${owner.id}`}
                                        value={owner.birthdate}
                                        onChange={(e) => handleOwnerChange(owner.id, 'birthdate', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Differently Abled */}
                                <div className="row">
                                    <label htmlFor={`owner_differently_abled_${owner.id}`}>Differently Abled*</label>
                                    <select
                                        id={`owner_differently_abled_${owner.id}`}
                                        name={`owner_differently_abled_${owner.id}`}
                                        value={owner.differently_abled}
                                        onChange={(e) => handleOwnerChange(owner.id, 'differently_abled', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>

                                {/* ID Number */}
                                <div className="row">
                                    <label htmlFor={`owner_id_number_${owner.id}`}>National ID Number*</label>
                                    <input
                                        type="text"
                                        id={`owner_id_number_${owner.id}`}
                                        name={`owner_id_number_${owner.id}`}
                                        value={owner.id_number}
                                        onChange={(e) => handleOwnerChange(owner.id, 'id_number', e.target.value)}
                                        required
                                        placeholder="Enter national ID number"
                                    />
                                </div>

                                {/* Education Level */}
                                <div className="row">
                                    <label htmlFor={`owner_education_level_${owner.id}`}>Highest Level of Education Completed*</label>
                                    <select
                                        id={`owner_education_level_${owner.id}`}
                                        name={`owner_education_level_${owner.id}`}
                                        value={owner.education_level}
                                        onChange={(e) => handleOwnerChange(owner.id, 'education_level', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Education Level</option>
                                        <option value="primary">Primary School</option>
                                        <option value="secondary">Secondary School</option>
                                        <option value="technical_vocational">Technical/Vocational</option>
                                        <option value="associate">Associate Degree</option>
                                        <option value="bachelor">Bachelor's Degree</option>
                                        <option value="master">Master's Degree</option>
                                        <option value="doctorate">Doctorate</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {index !== 0 && (
                                    <div className="row">
                                        <button
                                            type="button"
                                            className="btn btn-red"
                                            onClick={() => removeSpecificOwner(owner.id)}
                                        >
                                            Remove This Owner
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="row button-group">
                            <button
                                type="button"
                                className="btn btn-gray"
                                onClick={addOwnerEntry}
                            >
                                Add Another Owner
                            </button>
                            {owners.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-gray"
                                    onClick={removeLastOwner}
                                >
                                    Remove Last Owner
                                </button>
                            )}
                        </div>
                    </div>
                </Containers>

            <Containers title="Section D: Business Declaration">
            <p>
                G.1 Business Organization and Objectives*<br />
                G.2 Legally Binding Self-Declaration* to be signed by up to 2 business owners.<br />
            </p>
            <div id="business-declaration" className='list'>
                {/* Business Organization and Objectives */}
                <div className="row">
                    <label htmlFor="owned_controlled">
                        Is the business owned and controlled by those persons who hold the majority shareholding or controlling interests in the business?*
                    </label>
                    <select 
                        id="owned_controlled" 
                        name="owned_controlled"
                        value={formData.owned_controlled}
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="row">
                    <label htmlFor="subsidiary_affiliate">
                        Is the business a subsidiary or affiliate of another company?*
                    </label>
                    <select 
                        id="subsidiary_affiliate" 
                        name="subsidiary_affiliate"
                        value={formData.subsidiary_affiliate}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="row">
                    <label htmlFor="charitable_political">
                        Does the business have as its principal object the furtherance of a charitable or political purpose?*
                    </label>
                    <select 
                        id="charitable_political" 
                        name="charitable_political"
                        value={formData.charitable_political}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {/* Legally Binding Self-Declaration */}
                <div className="">
                    <h4>Legally Binding Self-Declaration*</h4>
                    <p>
                        We the undersigned declare that the details provided in this form as supplier owners are correct to the best of our knowledge, and that, in the event of changes, details will be provided immediately to the Small Business Bureau. In the case that any of the above information is found to be false, untrue, misleading, or misrepresenting, we are aware that we may be held liable for it. We hereby authorize sharing of the information furnished on this form with all bodies of the Government of the Cooperative Republic of Guyana. UNSIGNED FORMS WILL NOT BE PROCESSED BY SBB.
                    </p>
                </div>
                <div className="row">
                    <label htmlFor="declaration_primary_name">Applicant (Primary)</label>
                    <input 
                        type="text" 
                        id="declaration_primary_name" 
                        name="declaration_primary_name"
                        value={formData.declaration_primary_name}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="row">
                    <label htmlFor="declaration_primary_signature">Signature</label>
                    <input 
                        type="text" 
                        id="declaration_primary_signature" 
                        name="declaration_primary_signature"
                        value={formData.declaration_primary_signature}
                        onChange={handleChange}
                        placeholder="Primary Applicant's Signature" 
                        required 
                    />
                </div>
                <div className="row">
                    <label htmlFor="declaration_primary_position">Position</label>
                    <input 
                        type="text" 
                        id="declaration_primary_position" 
                        name="declaration_primary_position"
                        value={formData.declaration_primary_position}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="row">
                    <label htmlFor="declaration_primary_date">Date</label>
                    <input 
                        type="date" 
                        id="declaration_primary_date" 
                        name="declaration_primary_date"
                        value={formData.declaration_primary_date}
                        onChange={handleChange}
                        required 
                    />
                </div>

                {/* Secondary Applicant (Optional) */}
                <div className="row">
                    <label htmlFor="declaration_secondary_name">Applicant (Secondary)</label>
                    <input 
                        type="text" 
                        id="declaration_secondary_name" 
                        name="declaration_secondary_name"
                        value={formData.declaration_secondary_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="row">
                    <label htmlFor="declaration_secondary_signature">Signature</label>
                    <input 
                        type="text" 
                        id="declaration_secondary_signature" 
                        name="declaration_secondary_signature"
                        value={formData.declaration_secondary_signature}
                        onChange={handleChange}
                        placeholder="Secondary Applicant's Signature" 
                    />
                </div>
                <div className="row">
                    <label htmlFor="declaration_secondary_position">Position</label>
                    <input 
                        type="text" 
                        id="declaration_secondary_position" 
                        name="declaration_secondary_position"
                        value={formData.declaration_secondary_position}
                        onChange={handleChange}
                    />
                </div>
                <div className="row">
                    <label htmlFor="declaration_secondary_date">Date</label>
                    <input 
                        type="date" 
                        id="declaration_secondary_date" 
                        name="declaration_secondary_date"
                        value={formData.declaration_secondary_date}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </Containers>

                <div className='btn-container'>
                    <a href='/home' className='btn btn-red'>Cancel</a>
                    <button className='btn btn-green' type='submit'>Submit</button>
                </div>

            </form>
                

        </div>
    );
};

export default SBRegistration;