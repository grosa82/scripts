// ==UserScript==
// @name         Dealer Application autofill
// @namespace    https://github.com/emartinez1621
// @version      4.5
// updateURL     https://github.com/emartinez1621/scripts/raw/master/CrestScripts/Dealer%20Application%20autofill.user.js
// @description  This script is used to autofill all the fields when creating a new retailer. Works in the agent portal, and login page.
//               It will even handle creating a new user when creating a retailer through the login page.
// @author       Eduardo Martinez
// @include      */Dealers/Create?*
// @include      */DealerApply*
// @include      *DealerApp/DealerCreateUser*
// @exclude      https://*
// ==/UserScript==

$(document).ready(function(){
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

  function randomPhone() {
      return ("(" + randomNumWithXDigits(3) + ") " + randomNumWithXDigits(3) + "-" + randomNumWithXDigits(4));
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

  function randomZip(){
    return randomNumWithXDigits(5);
  }

  function randomSocial() {
      return (randomNumWithXDigits(3) + "-" + randomNumWithXDigits(2) + "-" + randomNumWithXDigits(4));
  }

  function randomDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    var rand = Math.floor(Math.random()*11);
    dd = rand+dd;
    mm = rand+mm;
    yyyy = yyyy-rand;

    if(dd>28) {dd = 28;}
    if(mm>10) {mm = 8;}
    if(dd<10){dd='0'+dd;}
    if(mm<10){mm='0'+mm;}

    return mm+"/"+dd+"/"+yyyy;
  }

  var retailerType = ['Furniture', 'Jewelers', 'Emporium', 'Audio', 'Electronics'];

  function randomRetalerType(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  $.ajax({
      url: 'http://api.randomuser.me/?nat=us',
    dataType: 'json',
    success: function(data){
      var user = data.results[0];
      var firstName = capitalizeFirstLetter(user.name.first);
      var lastName = capitalizeFirstLetter(user.name.last);
      var generatedEmail = user.email.replace(/ /g, "_");
      var email = generatedEmail.replace("@example", "@email");
      var address = user.location.street;
      var streetLine1 = capitalizeFirstLetterOfEachWord(address);
      var city = capitalizeFirstLetter(user.location.city);
      var retailerName = lastName + ' '+ city + ' ' + randomRetalerType(retailerType);
      var username = user.login.username;
      var bankAccount = Math.floor(Math.random() * 999999999);

      $("#FirstName").val(firstName);
      $("#LastName").val(lastName);
      $("#EmailAddress").val(email);
      $("#StreetLine1, #Address").val(streetLine1);
      $('#PhoneNumber').val(randomPhone());
      $('#FaxNumber').val(randomPhone());
      $('#OwnerHomePhone, #PrimaryPhone').val(randomPhone());
      $('#Name, #BusinessName').val(retailerName);
      $("#CardholderName").val(firstName + ' ' + lastName);
      $('#PostalCode, #OwnerZip').val(randomZip());
      $('#UserName').val(username);
      $('#Owner, #ContactName').val(firstName + ' ' + lastName);
      $('#City,#OwnerCity').val(city);
      $('#OwnerSocialSecurityNumber, #SSN, #SocialSecurityNumber').val(randomSocial());
      $('#AccountNumber').val(bankAccount);
      $('#OpenDate').val(randomDate());
      $('#Website').val('www.website.com');
      $('#Password, #ConfirmPassword').val('test123!');
      $('#BankName').val('Chase');
      $('#RoutingNumber').val('124001545');
      $('#OwnerStreet1').val('1234 Place Way');
      $('#OwnerDateOfBirth, #DateOfBirth').val('10/01/1985');
      $('#DealerRepID').val('1191');
      $('#ReferralCodeID').val('2');
      $('#StateID, #OwnerStateID').val('AK');
      $('#NumOfLocations').val('1');
      $('#checkbox_user_type_id_Dealer').prop('checked', true);
      $('#EmployerName').val('MacGronalds');
      $('#HireDate').val('10/01/2012');
      $('#MonthlyIncome').val('5000');
    }
  });
});
