import React, { useState } from 'react';
import './containers.css';

const Containers = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className={`sect-container orange-border ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="heading row" onClick={toggleExpand}>
                <h2>{title}</h2>
                <button className="toggle-btn">{isExpanded ? '-' : '+'}</button>
            </div>
            {isExpanded && <div className="content">{children}</div>}
        </div>
    );
};

export default Containers;
