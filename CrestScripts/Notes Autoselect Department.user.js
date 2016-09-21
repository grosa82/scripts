// ==UserScript==
// @name         Notes Autoselect Department
// @namespace    https://github.com/emartinez1621
// @version      1.5
// @description  Automatically select department from the department dropdown for notes. Works on both the notes in the applicant details and the retailer details.
// @author       Eduarddo Martinez
// @include      */Applicants/Details/*
// @include      */Dealers/Details/*
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/CrestScripts/Notes%20Autoselect%20Department.user.js
// ==/UserScript==

$(document).ready(function(){

  function randomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  $("#NoteContent").click(function(){
    $("#Department, #AddDepartment").val(randomNumBetween(1, 9));
  });

});
