"use strict";

const dom = require('./dom');
const firebaseApi = require('./firebaseApi');

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
        dom.domString(data);   
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

const getForecast = (searchString, numOfDays) => {
    searchForecast(searchString).then((data) => {
        console.log(data);
        dom.forecastList(data.list, numOfDays); 
    }).catch((error) => {
        console.log(error); 
    });
};


const getWeatherApiKey = () => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            url: `db/apiKeys.json`
        }).done((data) => {
            resolve(data); 
        }).fail((error) => {
            reject(error); 
        });
    });
};

const retrieveKeys = () => {
    getWeatherApiKey().then((result) => {        
        setWeatherKey(result.openWeatherMap.apiKey);
        firebaseApi.setObject(result.firebase);
        firebase.initializeApp(result.firebase);
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
    retrieveKeys
}; 