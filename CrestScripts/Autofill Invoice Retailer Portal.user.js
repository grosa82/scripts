// ==UserScript==
// @name         Autofill Invoice Retailer Portal
// @namespace    https://github.com/emartinez1621
// @version      2.0
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/CrestScripts/Autofill%20invoice%20stuff.user.js
// @description  Script to automatically fill in invoice fields after applying through a retailer (ONLY WORKS IN THE RETAILER PORTAL)
// @author       emartinez1621
// @include      */DealerApp/ItemPricing*
// @include      */Applicants/DealerDetails*
// @include      */Applicants/Details*
// ==/UserScript==

$(document).ready(function(){
    var windowUrlPath = $(location).attr("pathname");

    if(windowUrlPath.includes("/DealerApp/ItemPricing"))
    {
        $("#ItemDescription").val("Stuff");
        $("#ItemCondition").val("1");
        $("#ItemPrice").val("2600");
    }
    else
    {
        $("#upload-invoice-big, img[src = '/Content/Images/pencil.png']").on("click", function(e){
        $("#InvoiceAmount").val("2500");
        $("#ItemDesc").val("Stuff");
        $("#ItemConditions").val("1");
    });
    }
});
