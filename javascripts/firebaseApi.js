"use strict";

let firebaseObj = {};
let userUid = ''; 

const setObject = (obj) => {
    firebaseObj = obj;
};

//Firebase: GOOGLE - Use input credentials to authenticate user.
let authenticateGoogle = () => {
    return new Promise((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
            userUid = authData.user.uid;
            localStorage.setItem("localWeatherAppGoogleAuthUserUid", authData.user.uid); 
            resolve(authData.user);
        }).catch((error) => {
            reject(error);
        });
    });
  };


  const checkForStoredUserUid = () => {
    if (localStorage.getItem("localWeatherAppGoogleAuthUserUid")) {
        userUid = localStorage.getItem("localWeatherAppGoogleAuthUserUid");
    }
}; 

  const getForecastList = () => {
    let forecasts = []; 
    let key = ''; 
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        $.ajax(`${firebaseObj.databaseURL}/forecasts.json?orderBy="uid"&equalTo="${userUid}"`).then((fbForecasts) => {
            if (fbForecasts !== null) {
                Object.keys(fbForecasts).forEach((key) => {
                    fbForecasts[key].id = key;
                    forecasts.push(fbForecasts[key]);
                }); 
            }
            resolve(forecasts); 
        }).catch((err) => {
            reject(err); 
        });
    });
  };


  const saveForecast = (newForecastObj) => {
    newForecastObj.uid = userUid;
    return new Promise ((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: `${firebaseObj.databaseURL}/forecasts.json`,
            data: JSON.stringify(newForecastObj)
        }).then((result) => {
            resolve(result); 
        }).catch((err) => {
            reject(err); 
        });
    });
  };

  const deleteForecast = (movieId) => {
    return new Promise ((resolve, reject) => {
        $.ajax({
            type: "DELETE",
            url: `${firebaseObj.databaseURL}/forecasts/${movieId}.json`,
        }).then((result) => {
            resolve(result); 
        }).catch((err) => {
            reject(err); 
        });
    });
  };

module.exports = {
    setObject,
    authenticateGoogle,
    getForecastList,
    checkForStoredUserUid,
    saveForecast,
    deleteForecast
};