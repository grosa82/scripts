// ==UserScript==
// @name         Autofill invoice stuff
// @namespace    */DealerApp/ItemPricing*
// @version      0.1
// @description  Script to automatically fill in invoice fields
// @author       Eduardo Martinez
// @match        http://*/DealerApp/ItemPricing*
// @match        http://*/Applicants/DealerDetails*
// @match        http://*/Applicants/Details*
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

