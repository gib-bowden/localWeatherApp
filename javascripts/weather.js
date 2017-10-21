"use strict";

const dom = require('./dom');

let weatherApiKey = '';

const searchCurrentWeather = (searchString) => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather`,
            data: {
                "zip": searchString,
                "appid": weatherApiKey,
                "units": "imperial"
            }
        }).done((data) => {
            resolve(data); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const getWeather = function (searchString) {
    searchCurrentWeather(searchString).then( function (data) {
        dom.domString(data, weatherApiKey);   
    }).catch((error) => {
        console.log(error);
    });
};

const searchForecast = (searchString) => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/forecast`,
            data: {
                "zip": searchString,
                "appid": weatherApiKey,
                "units": "imperial"
            }
        }).done((data) => {
            resolve(data); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const getForecast = (searchString) => {
    searchForecast(searchString).then((data) => {
        console.log(data);
        dom.forecastList(data.list); 
    }).catch((error) => {
        console.log(error); 
    });
};


const getWeatherApiKey = () => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `db/apiKeys.json`
        }).done((data) => {
            resolve(data.openWeatherMap.apiKey); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const retrieveWeatherKey = () => {
    getWeatherApiKey().then((result) => {        
        setWeatherKey(result);
    }).catch((error) => {
        console.log(error); 
    });
};

const setWeatherKey = (key) => {
    weatherApiKey = key;
};

module.exports = {
    getWeather,
    getForecast,
    retrieveWeatherKey
}; 