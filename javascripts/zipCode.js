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