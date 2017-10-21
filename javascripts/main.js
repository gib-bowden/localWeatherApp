"use strict";

const events = require('./events');
const weather = require('./weather');


$(document).ready(() => {
    weather.retrieveWeatherKey(); 
    events.clickSubmit();
    events.pressEnter(); 
    events.threeDayForecastClick();
    events.fiveDayForecastClick();
});