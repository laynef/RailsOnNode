import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect(() => ({}))

export default class Application extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>Hello World</div>
        );
    }
};
