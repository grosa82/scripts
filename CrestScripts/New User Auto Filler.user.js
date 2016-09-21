// ==UserScript==
// @name         New User Auto Filler
// @namespace    https://github.com/emartinez1621
// @version      4.0
// @description  Automatically fills out information needed to create a new user. Works when creating a user through the users tab,
//               and when creating a retailer user or a salesman through the retailer details page.
// @author       Eduardo Martinez
// @include      */Users/Create*
// @include      */Dealers/CreateUser/*
// @include      */Dealers/CreateSalesman*
// @exclude      https://*
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/CrestScripts/New%20User%20Auto%20Filler.user.js
// ==/UserScript==

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterOfEachWord(string) {
    var array = string.split(/(\s+)/),
        length = array.length,
        i = 0,
        word;

    while (i < length) {
      array[i] = array[i].toLowerCase();
      word = array[i];
      if (word.length > 2) {
        array[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      i += 1;
    }

    return array.join("");
}

function findPlace(x) {
    // Finds the 'place' of the number X
    // e.g. x = 43,210 findPlace(x) = 10,000
    n = 1;
    while (x >= 10) {
        x /= 10;
        n *= 10;
    }
    return n;
}

function findMaxFromPlace(x) {
    // Finds the max number of length X
    n = 1;
    y = 0;
    for (i = 1; i <= x; i++) {
        y += 9 * n;
        n *= 10;
    }

    return y;
}

function randomNumWithXDigits(n) {
    // With n = 5 places
    // y = 99999
    // x = 10000
    // result example: 12345

    var y = findMaxFromPlace(n);
    var x = findPlace(y);
    return Math.floor(Math.random() * (y - x) + x);
}

function randomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomPhone() {
   //returns phone number in (***)***-**** format
    return ("(" + randomNumWithXDigits(3) + ") " + randomNumWithXDigits(3) + "-" + randomNumWithXDigits(4));
}

function randomSocial() {
    //returns a social in ***-**-**** format
    return (randomNumWithXDigits(3) + "-" + randomNumWithXDigits(2) + "-" + randomNumWithXDigits(4));
}

function appendLessThan10(x) {
    // Appends a 0 in from of any number less than 10
    if(x < 10) {
        x = "0" + x;
    }

    return x;
}

/* ----------------------------------------------- */

$.ajax({
    url: 'http://api.randomuser.me/?nat=us',
    dataType: 'json',
    success: function(data){
        var user = data.results[0];
        var firstName = capitalizeFirstLetter(user.name.first);
        var lastName = capitalizeFirstLetter(user.name.last);
        var generatedEmail = user.email.replace(/ /g, "_");
        var email = generatedEmail.replace("@example", (randomNumWithXDigits(3) + "@gmail"));
        var address = user.location.street;
        var streetLine1 = capitalizeFirstLetterOfEachWord(address);
        var username = user.login.username;

        $("#FirstName").val(firstName);
        $("#LastName").val(lastName);
        $("#EmailAddress").val(email);
        $("#StreetLine1, #Address").val(streetLine1);
        $("#UserName").val(username);
    }
});

// VARIABLES
var today = new Date();
var month = appendLessThan10(today.getMonth() + 1);
var year = today.getFullYear();
var windowLoc = $(location).attr("pathname");

if(windowLoc.includes("/Users/Create")){
    alert("You'll have to assign the user roles yourself.");
}
else
{
    $("#checkbox_user_type_id_Dealer").prop("checked",true);
}

// APPLICANT INFO
var dobYear = randomNumBetween(year - 70, year - 21);
var dobMonth = appendLessThan10(randomNumBetween(1, 12));
var dobDay = appendLessThan10(randomNumBetween(1, 28)); //in case of Feb
$("#DateOfBirth").val(dobMonth + "/" + dobDay + "/" + dobYear);
$("#PhoneNumber").val(randomPhone());
$("#FaxNumber").val(randomPhone());
$("#City").val("Salt Lake City");
$("#StateID").val("UT");
$("#PostalCode").val(randomNumWithXDigits(5));
$("#Password, #ConfirmPassword").val("test123!");
$("#SocialSecurityNumber, #SSN").val(randomSocial());
$("#AccountNumberEntry, #AccountNumber").val(randomNumWithXDigits(14));
$("#RoutingNumber").val("122000030");
$("#BankName").val("BANK OF AMERICA NA");
