import React, { Component } from 'react';
import { connect } from 'react-redux';


class Application extends Component {
    render() {
        return (
            <h1 style={{ textAlign: 'center' }}>Hello World</h1>
        );
    }
};

export default connect(() => ({}))(Application)