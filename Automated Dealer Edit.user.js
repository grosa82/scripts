// ==UserScript==
// @name         Automated Dealer Edit
// @namespace    */Dealers/Edit/*
// @version      0.1
// @description  Automatically check some one the common permissions and finance plans for a retailer.
// @author       You
// @match        http://*/Dealers/Edit/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */


// Your code here...

$(document).ready(function(){
    
  if($("#StatusID").val() !== "1"){
    
    if(window.confirm("Is this a demo retailer account?")){
    $("#IsDemoAccount").prop('checked', true);     
      };  
    
    alert("Keep in mind that this is creating an active retailer.");
  
    $("input[name = 'FinancePlan'][value = '1']").prop('checked', true);
    $("#InitialPaymentRequired").prop('checked', true);  
    $("#AgreementRevisionAcceptanceRequired").prop('checked', true); 
    $("#allow-application-resubmissions").prop('checked', true);  
    $("#first-payment-required").prop('checked', true);  
    $("#NoOnlineBankVerification").prop('checked', true);  
    $("#ReceiptOfGoodsRequired").prop('checked', true);
    $("#StatusID").val("1");  
   }  
});
