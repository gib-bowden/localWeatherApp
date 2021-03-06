"use strict";

const zipCode = require('./zipCode');
const weather = require('./weather');
const firebaseApi = require('./firebaseApi');

const zipSearchField = $("#zip-search-field"); 
const zipSubmitBtn = $("#zip-submit-btn"); 
const weatherOptions = $("#weather-options"); 
const forecastContainer = $("#forecast-container"); 

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
        forecastContainer.empty(); 
    }
};

const threeDayForecastClick = () => {
    $('body').on("click", '#three-day-btn', ((e) => {
        transferActivePill(e.target); 
        weather.getForecast(zipCode.getCurrentZip(), 3);           
    }));
};

const fiveDayForecastClick = () => {
    $('body').on("click", '#five-day-btn', ((e) => {
        transferActivePill(e.target); 
        weather.getForecast(zipCode.getCurrentZip(), 5); 
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


const init = () => {
    pressEnter();
    clickSubmit();
    threeDayForecastClick();
    fiveDayForecastClick();
};

const googleAuth = () => {
    $('#google-btn').click((e) => {
        firebaseApi.authenticateGoogle().then((results) => {
            console.log(results); 
        }).catch((error) => {
            console.log(error); 
        }); 
    });
};


module.exports = {
    init
}; 