import * as React from 'react';
import { connect } from 'react-redux';


function Application() {
    return (
        <div style={{ width: '100%' }}>
            <h1 style={{ textAlign: 'center' }}>404 Error</h1>
            <h2 style={{ textAlign: 'center' }}>Page Not Found</h2>
        </div>
    );
};

export default connect(() => ({}))(Application)
