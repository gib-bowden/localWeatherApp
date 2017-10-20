(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./weather":3,"./zipCode":4}],2:[function(require,module,exports){
"use strict";

const events = require('./events');


$(document).ready(() => {
    events.clickSubmit();
    events.pressEnter(); 
});
},{"./events":1}],3:[function(require,module,exports){
"use strict";

const zipCode = require('./zipCode');

const searchCurrentWeather = (searchString) => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather`,
            data: {
                "zip": searchString
            }
        }).done((data) => {
            resolve(data); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const getWeather = (searchString) => {
    searchCurrentWeather(searchString).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error); 
    });
};

module.exports = {getWeather}; 
},{"./zipCode":4}],4:[function(require,module,exports){
"use strict";

const isValidUSZip = (zipString) => {
    return /^\d{5}(-\d{4})?$/.test(zipString);
};

const validateZip = (zipString) => {
    if (isValidUSZip(zipString)) {
        return true;
    }
    else {
        window.alert("Please enter a valid zip code.");
    }
}; 


module.exports = {validateZip}; 
},{}]},{},[2]);
