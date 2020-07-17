import * as React from 'react';
import { connect } from 'react-redux';


const Application: React.FC = () => {
    return (
        <h1 style={{ textAlign: 'center' }}>Hello World</h1>
    );
};

export default connect(() => ({}))(Application);
