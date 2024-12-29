import React, { useState, useEffect } from 'react';
import './header.css'; // For styling
import Logo from '../../logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronDown, faHouse, faPhone, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [activeDropdown, setActiveDropdown] = useState(null); // Tracks the active dropdown

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.header_nav')) {
                setActiveDropdown(null); // Close all dropdowns
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const navigate = useNavigate();

    const toggleDropdown = (dropdown) => {
        setActiveDropdown((prev) => (prev === dropdown ? null : dropdown)); // Toggle dropdown
    };

    const navReset = async () => {
        try {
        const token = localStorage.getItem('token');
        if (token) {
            // Call backend to blacklist the token
            await fetch('http://localhost:5000/api/users/signout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });
        }
        else{
            navigate('/');
        }
        } catch (error) {
        console.error('Error during sign out:', error);
        } finally {
        // Always clear local storage and redirect, even if the API call fails
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        }
    };

    return (
        <header className="header">
            <div className="secondary-header">
                <p><FontAwesomeIcon icon={faHouse} /> Lot 1, La Penitence, Georgetown | <FontAwesomeIcon icon={faPhone} /> 226-8120/23/35</p>
            </div>
            <div className="primary-header">
                <div className="header_logo p-item">
                    <a href="https://sbb.gov.gy/">
                        <img src={Logo} alt="Logo" />
                    </a>
                </div>
                <nav className="header_nav p-item">
                    <ul className="header_nav-list">
                        <li><a href="#about">About</a></li>
                        <li>
                            <a href="#services" onClick={() => toggleDropdown('services')}>
                                Services <FontAwesomeIcon icon={faChevronDown} />
                            </a>
                            {activeDropdown === 'services' && (
                                <ul className="dropdown">
                                    <li><a href="#grants">Grants</a></li>
                                    <li><a href="#loans">Loans</a></li>
                                    <li><a href="#incubator">Business Incubator Centers</a></li>
                                    <li><a href="#awareness">Entrepreneurship Awareness Session</a></li>
                                    <li><a href="#support">Business Development Support</a></li>
                                    <li><a href="#helpdesk">Help Desk</a></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a href="#programmes" onClick={() => toggleDropdown('programmes')}>
                                Programmes <FontAwesomeIcon icon={faChevronDown} />
                            </a>
                            {activeDropdown === 'programmes' && (
                                <ul className="dropdown">
                                    <li><a href="#procurement">Small Business Procurement Programme</a></li>
                                    <li><a href="#greenfund">Green Business Technology Fund</a></li>
                                    <li><a href="#kidpreneur">Kidpreneur</a></li>
                                    <li><a href="#training">Entrepreneurship Skills Training Programme</a></li>
                                    <li><a href="#in-school">In-School Entrepreneurship</a></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a href="#forms" onClick={() => toggleDropdown('forms')}>
                                Forms <FontAwesomeIcon icon={faChevronDown} />
                            </a>
                            {activeDropdown === 'forms' && (
                                <ul className="dropdown">
                                    <li><a href="#registration">SBB Registration Form</a></li>
                                    <li><a href="#procurement-form">SBB Procurement Form</a></li>
                                    <li><a href="#plan-template">SBB Business Plan Template</a></li>
                                    <li><a href="#name-registration">Business Name Registration Form</a></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a href="#publications" onClick={() => toggleDropdown('publications')}>
                                Publications <FontAwesomeIcon icon={faChevronDown} />
                            </a>
                            {activeDropdown === 'publications' && (
                                <ul className="dropdown">
                                    <li><a href="#tender">Invitation to Tender</a></li>
                                    <li><a href="#resources">Resources</a></li>
                                    <li><a href="#news-events">News and Events</a></li>
                                    <li><a href="#gallery">Gallery</a></li>
                                </ul>
                            )}
                        </li>
                        <li><a href="#vacancies">Vacancies</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#FAQ">FAQ</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                    </ul>
                </nav>
                <div className="search p-item">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                <div>
                    <a onClick={() => navReset()}><FontAwesomeIcon icon={faPowerOff} /></a>
                </div>
            </div>
        </header>
    );
};

export default Header;
