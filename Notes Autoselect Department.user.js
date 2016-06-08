// ==UserScript==
// @name         Notes Autoselect Department
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Automatically select department from the department dropdown for notes. Works on both the notes in the applicant details and the retailer details. 
// @author       Eduarddo Martinez
// @include      */Applicants/Details/*
// @include      */Dealers/Details/*
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/Notes%20Autoselect%20Department.user.js
// @grant        none
// ==/UserScript==

(function() {
    
    function randomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
    }
    
    $("#NoteContent").click(function(){
    	$("#Department, #AddDepartment").val(randomNumBetween(1, 9));
    });

})();