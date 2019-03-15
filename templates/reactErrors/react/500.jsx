import React, { Component } from 'react';
import { connect } from 'react-redux';


class Application extends Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <h1 style={{ textAlign: 'center' }}>500 Error</h1>
                <h2 style={{ textAlign: 'center' }}>Internal Server Error</h2>
            </div>
        );
    }
};

export default connect(() => ({}))(Application)
