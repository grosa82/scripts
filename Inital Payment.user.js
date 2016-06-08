// ==UserScript==
// @name         Inital Payment
// @namespace    */DealerApp/FirstPayment*
// @version      3.0
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/Inital%20Payment.user.js
// @description  autofill initial payment and first payment things
// @author       Eduardo Martinez
// @include      */DealerApp/FirstPayment*
// @include      */DealerApp/InitialPayment*
// @exclude      https://*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

function randomValidCC(digits) {
    function luhn(d) {
        var res = 0;
        var inc = d.length % 2;
        for (var i = 0; i < d.length; ++i) {
            var n = Number(d.charAt(i)) * (2 - (i + inc) % 2);
            res += n > 9 ? n - 9 : n;
        }
        return res;
    }
    var checksum = luhn(digits) % 10;
    var cs = luhn(digits + "0") % 10;
    var checkdigit = cs ? 10 - cs : 0;

    return digits + checkdigit;
};

function randomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

$('#name-on-card').val('Person McPerson');
$('#card-number').val(randomValidCC("4" + randomNumBetween(10000000000000, 99999999999999).toString()));
$('#exp-year').val(randomNumBetween(2017, 2019));
$('#cvv-code').val('456');

$("#use-saved-card").change(function(){
    if(this.checked){
      $("#cvv-code").val("456");
    }
    else{
      $('#name-on-card').val('Person McPerson');
      $('#card-number').val(randomValidCC("4" + randomNumBetween(10000000000000, 99999999999999).toString()));
      $('#exp-year').val(randomNumBetween(2017, 2019));
      $('#cvv-code').val('456');
    }
})
