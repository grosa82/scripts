// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @include      */Applicants/Details/*
// @include      */Dealers/Details/*
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