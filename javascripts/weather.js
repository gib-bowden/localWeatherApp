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