"use strict";

const events = require('./events');
const weather = require('./weather');


$(document).ready(() => {
    weather.retrieveKeys(); 
    events.init();
});