// set global constants
const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = lower.toUpperCase();
const numbers = "0123456789";
const special = "^[!@#$%^&*()_+-=[]{};':\"\\|,.<>/?]*$";

// add event listener to generate button
var generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", writePassword);

/**
 * Writes password to the #password input
 */
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

/**
 * Generate a pseudo random password
 * @returns {string} pseudo randomly generated password
 */
function generatePassword() {
    var passwordLength = promptAndValidatePasswordLength();
    var passwordCriteria = getPasswordCriteria();
    return createPseudoRandomPassword(passwordLength, passwordCriteria);
}

/**
 * Ask the user if they would like to provide a password length, then validate input
 * @returns {string} password length
 */
function promptAndValidatePasswordLength() {
    var providePasswordLength = true;
    var isValid = false;
    var passwordLength;
    
    // while user wants to provide a password length but the length is invalid
    while (providePasswordLength && !isValid) {
        providePasswordLength = window.confirm("Would you like to provide the length of the password you want generated? (Defaults to 128)");

        // only ask for length if they'd like to provide it
        if (providePasswordLength) {
            passwordLength = window.prompt("Please provide an integer between 8 and 128");

            // alert user if input is invalid
            if (!passwordLength || isNaN(passwordLength) 
                || (Number.parseInt(passwordLength) < 8 || Number.parseInt(passwordLength) > 128)) {

                window.alert("Sorry, you didn't enter a valid number!");
            } else {
                isValid = true;
            }
        }
    }
    // parse length from prompt input if it was provided
    if (passwordLength) {
        passwordLength = Number.parseInt(passwordLength);
    }

    return passwordLength;
}

/**
 * Prompts user for different types of characters to include in password
 * @returns {object} criteria object that encapsulates user's password criteria
 */
function getPasswordCriteria() {
    var criteria;
    while ( !criteria || !(criteria.includeLower || criteria.includeUpper || criteria.includeNumeric || criteria.includeSpecial) ) {
        window.alert("Please select at least one of the following character types");
        criteria = {
            includeLower: window.confirm("Would you like to include lower case letters in your password?"),
            includeUpper: window.confirm("Would you like to include upper case letters in your password?"),
            includeNumeric: window.confirm("Would you like to include numbers in your password?"),
            includeSpecial: window.confirm("Would you like to include special characters in your password?"),
        };
    } 
    return criteria;
}

/**
 * 
 * @param {string} passwordLength the length of the password to create
 * @param {object} criteria user's character preferences
 * @returns {string} pseudo randomly generated password
 */
function createPseudoRandomPassword(passwordLength = 128, criteria) {

    var charSet = "";
    if (criteria.includeLower) {
        charSet += lower;
    }
    if (criteria.includeUpper) {
        charSet += upper;
    }
    if (criteria.includeNumeric) {
        charSet += numbers;
    }
    if (criteria.includeSpecial) {
        charSet += special;
    }
    
    // loop until a valid password is generated
    var password;
    while (!isPasswordValid(password, criteria)) {
        password = "";
        for (var i = 0; i < passwordLength; i++) {
            password += getRandomCharFromString(charSet);
        }
    }
    return password;
}

/**
 * Helper function to pick random character from a string 
 * @param {string} s the string to get the random character from
 * @returns {string} a random character from the input string
 */
function getRandomCharFromString(s) {
    return s.charAt(Math.floor(Math.random() * s.length));
}

/**
 * Check if pseudo randomly generated password meets user's character criteria 
 * @param {string} password generated password to validate
 * @param {object} criteria object encapsulating user's criteria
 * @returns {boolean} true if valid, false otherwise
 */
function isPasswordValid(password, criteria) {
    if (!password) {
        return false;
    }

    // make password an array of chars
    var password = password.split('');

    // check if generated password has at least 1 char from each criteria
    if ( criteria.includeLower && !password.some(v => lower.includes(v)) ) {
        return false;
    }
    if ( criteria.includeUpper && !password.some(v => upper.includes(v)) ) {
        return false;
    }
    if ( criteria.includeNumeric && !password.some(v => numbers.includes(v)) ) {
        return false;
    }
    if ( criteria.includeSpecial && !password.some(v => special.includes(v)) ) {
        return false;
    }
    return true;
}