'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CubeList from './cubeList.jsx';

const Application = React.createClass({
    getInitialState() {
        return {count: 6};
    },
    onCountChange(e) {
        this.setState({
            count: e.target.value
        });
    },
    render() {
        return <div className="application">
            <CubeList/>
        </div>;
    }
});

export default Application;