'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PhysUtils from './physUtils.jsx';
var lodash = require('lodash');

const CubeList = React.createClass({
    getInitialState() {
        return {cubes: _.range(4).map(this.initCube)};
    },
    initCube() {
        return {id: _.uniqueId('cube'), dimensions: {width: 0, height: 0, length: 0, density: 0}};
    },
    onDimsChange(id, dims) {
        this.setState({cubes: this.state.cubes.map(cube => cube.id === id ? Object.assign({}, cube, {dimensions: dims}) : cube)});
    },
    onAddClick() {
        this.setState({cubes: this.state.cubes.concat([this.initCube()])});
    },
    onDeleteClick(id) {
        this.setState({cubes: this.state.cubes.filter(cube => cube.id !== id)}, () => {
        });
    },
    render() {

        return <div className="cube-list">
            <div><Summary cubes={this.state.cubes}/></div>
            <div className="col-xs-12"><button onClick={this.onAddClick} className="btn btn-success">Add new cube</button></div>
            {this.state.cubes.map((cube, i) => <div key={cube.id} className="col-xs-6 col-sm-3"><CubeCalc onDimsChange={(dims) => this.onDimsChange(cube.id, dims)} dims={cube.dimensions}/><button onClick={() => this.onDeleteClick(cube.id)} className="btn btn-warning">Delete</button></div>)}
        </div>
    }
});

const Summary = React.createClass({
    render() {
        return <div>
            <h1>Summary mass is {_.sum(this.props.cubes.map(cube => PhysUtils.calculateMass(cube.dimensions)))}</h1>
        </div>
    }
});

const CubeCalc = React.createClass({
    onDimChange(dim, value) {
        this.props.onDimsChange(Object.assign({}, this.props.dims, {[dim]: value}));
    },
    render() {
        return <div className="cubes">
            <Result volume={PhysUtils.calculateVolume(this.props.dims)} mass={PhysUtils.calculateMass(this.props.dims)}/>
            {['width', 'height', 'length', 'density'].map(dim => <NumberInput
                title={dim}
                onChange={(v) => this.onDimChange(dim, v)}
                value={this.props.dims[dim]}
                key={dim}
            />)}

        </div>;
    }
});

const Result = React.createClass({
    render() {
        return <div>
            <h3>Your cube volume is {this.props.volume}</h3>
            <h3>Your cube mass is {this.props.mass}</h3>
        </div>;
    }
});



const NumberInput = React.createClass({
    onChange(e) {
        this.props.onChange(Number(e.target.value));
    },
    render() {
        return <div className="calc-form">
            <div className="form-group">
                <label>Change {this.props.title}:</label>
                <input type="number" className="form-control" onChange={this.onChange} value={this.props.value}/>
            </div>
        </div>
    }
});

export default CubeList;