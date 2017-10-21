"use strict";

const zipCode = require('./zipCode');
const weather = require('./weather');

const zipSearchField = $("#zip-search-field"); 
const zipSubmitBtn = $("#zip-submit-btn"); 
const weatherOptions = $("#weather-options"); 

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
        zipCode.setCurrentZip(zipSearchField.val()); 
        weather.getWeather(zipCode.getCurrentZip()); 
    }
};

const threeDayForecastClick = () => {
    $('body').on("click", '#three-day-btn', ((e) => {
        transferActivePill(e.target); 
        weather.getForecast(zipCode.getCurrentZip());           
    }));
};

const fiveDayForecastClick = () => {
    $('body').on("click", '#five-day-btn', ((e) => {
        transferActivePill(e.target); 
        weather.getForecast(zipCode.getCurrentZip()); 
    }));
};

const removeActivePill = (nodeList) => {
    nodeList.forEach((node) => {
        if (node.classList && node.classList.contains("active")) {
            node.classList.remove("active");
        }
    });
};

const addActivePill = (element) => {
    element.classList.add("active");
};

const transferActivePill = (target) => {
    removeActivePill(target.parentNode.parentNode.childNodes);
    addActivePill(target.parentNode);
};



module.exports = {pressEnter, clickSubmit, threeDayForecastClick, fiveDayForecastClick}; 