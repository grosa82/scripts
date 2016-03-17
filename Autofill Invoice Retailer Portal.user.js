// ==UserScript==
// @name         Autofill Invoice Retailer Portal
// @namespace    */DealerApp/ItemPricing*
// @version      1.0
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/Autofill%20invoice%20stuff.user.js
// @description  Script to automatically fill in invoice fields after applying through a retailer (ONLY WORKS IN THE RETAILER PORTAL)
// @author       Eduardo Martinez
// @include        */DealerApp/ItemPricing*
// @include        */Applicants/DealerDetails*
// @include        */Applicants/Details*
// @exclude      https://*
// @grant        none
// ==/UserScript==
/* jshint -W097 */

$(document).ready(function(){
  $('#ItemDescription').val('Stuff');
  $('#ItemCondition').val('1');
  $('#ItemPrice').val('500');

  $("#upload-invoice-big, img[src = '/Content/Images/pencil.png']").on("click", function(e){
    $("#InvoiceAmount").val("500");
    $("#ItemDesc").val("Stuff");
    $("#ItemConditions").val("1");
  });
});
