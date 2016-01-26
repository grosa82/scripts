// ==UserScript==
// @name         inside sales rep
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */Users/Edit/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

if ($("#FirstName").val() != "ben") {
    $("#checkbox_user_type_id_Inside_Sales_Rep").prop("checked", true);
    $("#save-button").click();
}
else {
    $("#checkbox_user_type_id_Inside_Sales_Manager").prop("checked", true);
    $("#save-button").click();
}
