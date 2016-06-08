// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
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