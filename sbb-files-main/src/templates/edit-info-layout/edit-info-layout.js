import React from 'react';
import './edit-info-layout.css';

const EditInfoLayout = ({title, children}) => {
    return (
        <div className='page'>
            <div className='heading'>
                <h1>{title}</h1>
            </div>
            <div className='sect-container orange-border'>
                {children}
            </div>
        </div>
    );
};

export default EditInfoLayout;