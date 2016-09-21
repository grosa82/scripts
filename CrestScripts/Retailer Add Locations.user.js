// ==UserScript==
// @name         Retailer Add Locations
// @namespace    https://github.com/emartinez1621
// @version      4.5
// @description  Autofill all the fields when adding a location on a dealer application through the login page.
// @author       Eduardo Martinez
// @include        */DealerApp/DealerAppLocations*
// @exclude      https://*
// @updateURl    https://github.com/emartinez1621/scripts/raw/master/CrestScripts/Add%20Locations.user.js
// ==/UserScript==

$(document).ready(function(){
  $('#AddLocation').click(function() {
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

    var retailerType = ['Furniture', 'Jewelers', 'Emporium', 'Audio', 'Electronics'];

    function randomRetalerType(arr){
      return arr[Math.floor(Math.random() * arr.length)];
    }

    $.ajax({
        url: 'http://api.randomuser.me/?nat=us',
      dataType: 'json',
      success: function(data){
        var user = data.results[0];
        var firstName = user.name.first;
        var lastName = user.name.last;
        var generatedEmail = user.email.replace(/ /g, "_");
        var email = generatedEmail.replace("@example", "@email");
        var address = user.location.street;
        var city = user.location.city;
        var retailerName = lastName + ' '+ city + ' ' + randomRetalerType(retailerType);
        var username = user.username;
        var bankAccount = Math.floor(Math.random() * 999999999);

        $('#Name').val(retailerName);
        $('#StreetLine1').val(address);
        $('#City').val(city);
        $('#StateID').val('UT');
        $('#PostalCode').val('84081');
        $('#PhoneNumber').val(randomPhone());
        $('#FaxNumber').val(randomPhone());
        $('#ContactName').val(firstName + '' + lastName);
        $('#EmailAddress').val(email);
        $('#RoutingNumber').val('124001545');
        $('#BankName').val('Chase');
        $('#AccountNumber').val(bankAccount);
      }
    });
  });
});
