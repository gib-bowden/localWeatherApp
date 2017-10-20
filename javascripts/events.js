"use strict";

const zipCode = require('./zipCode');
const weather = require('./weather');

const zipSearchField = $("#zip-search-field"); 
const zipSubmitBtn = $("#zip-submit-btn"); 

const pressEnter = () => {
    $('body').keypress((e) => {
        if (e.which === 13) {
           validateAndSearchZip(); 
        }
    });
};

const clickSubmit = () => {
    zipSubmitBtn.click(() => {
      validateAndSearchZip(); 
    });
};

const validateAndSearchZip = () => {
    if (zipCode.validateZip(zipSearchField.val())) {
        weather.getWeather(zipSearchField.val()); 
    }
};


module.exports = {pressEnter, clickSubmit}; 