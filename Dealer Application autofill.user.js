// ==UserScript==
// @name         Dealer Application autofill
// @namespace    http://tampermonkey.net/
// @version      2.1
// updateURL     https://github.com/emartinez1621/scripts/raw/master/Dealer%20Application%20autofill.user.js
// @description  try to take over the world!
// @author       Eduardo Martinez
// @include      */Dealers/Create*
// @include      */DealerApply*
// @include      *DealerApp/DealerCreateUser*
// @exclude      https://*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...



$(document).ready(function(){
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function randomPhone(){
  var areaCode = Math.floor(Math.random() * 1000);
  var nextThree = Math.floor(Math.random() * 1000);
  var finalFour = Math.floor(Math.random() * 10000);
  if(areaCode < 100){
    areaCode += 100;
  }
  if(nextThree < 100){
    nextThree += 100;
  }
  if(finalFour < 1000){
    finalFour += 1000;
  }
  return '('+ areaCode + ')' + '-' + nextThree + '-' + finalFour;
  }

  function capitalizeFirstLetterOfEachWord(string) {

    var array = string.split(/(\s+)/),
    length = array.length,
    i = 0,
    word;

    while (i < length) {
      //array[i] = array[i].toLowerCase(); // make words lowercased first if you want
      word = array[i];
      if (word.length > 2) {
        array[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      i += 1;
    }

    return array.join("");
  }

  function randomZip(){
  var zip = Math.floor(Math.random() * 100000);
  if(zip < 10000){
    zip += 10000;
  }
  return zip;
  }


  function randomSocial(){
  var firstThree = Math.floor(Math.random() * 1000);
  var nextTwo = Math.floor(Math.random() * 100);
  var lastFour = Math.floor(Math.random() * 10000);
  if(firstThree < 100){
    firstThree += 100;
  }
  if(nextTwo < 10){
    nextTwo += 10;
  }
  if(lastFour < 1000){
    lastFour += 1000;
  }
  return firstThree + '-' + nextTwo + '-' + lastFour;
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
    if(dd>28)	{dd = 28;}
    if(mm>10) {mm = 8;}
    if(dd<10){dd='0'+dd}
    if(mm<10){mm='0'+mm}
    var randDate=mm+"/"+dd+"/"+yyyy;
    {
      return randDate;
    }
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
      var username = user.username;
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
      $('#NumOfLocations').val('1')
      $('#checkbox_user_type_id_Dealer').prop('checked', true);
      $('#EmployerName').val('MacGronalds');
      $('#HireDate').val('10/01/2012');
      $('#MonthlyIncome').val('5000');
    }
  })
});
