// ==UserScript==
// @name         Report Date Range Autofiller
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fill in the range of dates automatically on reports
// @author       Eduardo Martinez
// @include      http://*/RDLCReports/*
// @include      http://*/Repor*
// @include      http://*/DealerLocator*
// @exclude      http://*/Report/WellsFargoReturns*
// @exclude      http://*/Reports/WellsFargoReturns*
// @grant        none
// ==/UserScript==
/* jshint -W097 */

// Your code here...

var start = $("#BeginDate, #StartDate, #filterDateRangeStart, #startDate, [name = 'startDate']");
var end = $("#EndDate, #filterDateRangeEnd, #endDate, #FundedDate, [name = 'endDate']");
var month = $("#month");
var year = $("#year");


start.val('12/11/2013');
end.val('12/11/2015');

$("#category").val("10");
$("#zipCode").val("28678");
$("#distance").val("50");

$("#DeliquentPer").val('50');
$("#ChargedOffPer").val('50');
$("#DealerRepID, #filterDealerRep").val('1179');
$("[name = 'retailer']").val('5962');
$("[name = 'IsDuplicateBank']").prop('checked', true);
$("[name = 'IsDuplicateCard']").prop('checked', true);

if (!$('input')) {
    month.val('11');
    year.val('2015');
    if (month.length && year.length && $("input")) {
        $("[name = 'month']").val('10');
        $("[name = 'year']").val('2015');
    };
}


