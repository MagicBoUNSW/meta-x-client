import './pte-loading-spinner.scss';
import React from 'react';

export default function Loading(props) {
    return (
        <div className="loadingSpiner pte-margin-bottom-10 text-center">
            <div className="loadingSpinerView">
            <div className="cm-spinner" />
            </div>
        </div>
    );
}
