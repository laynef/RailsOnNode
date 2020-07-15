import * as React from 'react';
import { connect } from 'react-redux';


function Application() {
    return (
        <h1 style={{ textAlign: 'center' }}>Hello World</h1>
    );
};

export default connect(() => ({}))(Application);
