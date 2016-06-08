// ==UserScript==
// @name         Automated Dealer Edit
// @namespace    */Dealers/Edit/*
// @version      3.0
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/Automated%20Dealer%20Edit.user.js
// @description  Automatically add some of the most common permissions and finance plans for a new, inactive retailer. When asked if you want a demo retailer, "OK" means "Yes".
// @author       Eduardo Martinez
// @include        */Dealers/Edit/*
// @exclude      https://*
// @grant        none
// ==/UserScript==
/* jshint -W097 */


// Your code here...

$(document).ready(function(){
  var counter = 0;

  if($("#StatusID").val() !== "1"){

    if(window.confirm("Is this a demo retailer account?")){
    $("#IsDemoAccount").prop('checked', true);
      };

    alert("Keep in mind that this is creating an active retailer.");


    $("input[name = 'FinancePlan'][value = '1'], input[name = 'FinancePlan'][value = '3']").prop('checked', true);
    $("#InitialPaymentRequired").prop('checked', true);
    $("#AgreementRevisionAcceptanceRequired").prop('checked', true);
    $("#allow-application-resubmissions").prop('checked', true);
    $("#first-payment-required").prop('checked', true);
    $("#NoOnlineBankVerification").prop('checked', true);
    $("#ReceiptOfGoodsRequired").prop('checked', true);
    $("#StatusID").val("1");
   }
});
