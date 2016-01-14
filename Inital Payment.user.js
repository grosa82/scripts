// ==UserScript==
// @name         Inital Payment
// @namespace    */DealerApp/FirstPayment*
// @version      0.1
// @description  autofill initial payment and first payment things
// @author       You
// @include      http://*/DealerApp/FirstPayment*
// @include      http://*/DealerApp/InitialPayment*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

$('#name-on-card').val('Person McPerson');
$('#card-number').val('4111111111111111');
$('#exp-year').val('2020');
$('#cvv-code').val('456');
$('#submit-payment').trigger('click')