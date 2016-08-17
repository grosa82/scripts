// ==UserScript==
// @name         Report Date Range Autofiller
// @namespace    http://tampermonkey.net/
// @version      3.5
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/reportDateRange.user.js
// @description  Fill in the range of dates automatically on reports. Mainly to be used by QA for regression testing. 
// @author       Eduardo Martinez
// @include      */RDLCReports/*
// @include      */Repor*
// @include      */DealerLocator*
// @exclude      */Report/WellsFargoReturns*
// @exclude      */Reports/WellsFargoReturns*
// @exclude      */RDLCReports/CollectionCommissionBucketReport*
// @exclude      https://*
// @grant        none
// ==/UserScript==
/* jshint -W097 */

// Your code here...

var start = $("#BeginDate, #StartDate, #filterDateRangeStart, #startDate, [name = 'startDate']");
var end = $("#EndDate, #filterDateRangeEnd, #endDate, #FundedDate, [name = 'endDate']");
var month = $("#month");
var year = $("#year");



start.val("01/01/2015");
end.val("03/16/2016");

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
