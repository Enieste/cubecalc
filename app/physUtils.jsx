'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const PhysUtils = {
    calculateVolume(dims) {
        return dims.width * dims.height * dims.length;
    },
    calculateMass(dims) {
        return this.calculateVolume(dims) * dims.density;
    }
};

export default PhysUtils
