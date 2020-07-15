import * as React from 'react';
import { connect } from 'react-redux';


function Application() {
    return (
        <div style={{ width: '100%' }}>
            <h1 style={{ textAlign: 'center' }}>500 Error</h1>
            <h2 style={{ textAlign: 'center' }}>Internal Server Error</h2>
        </div>
    );
};

export default connect(() => ({}))(Application)
