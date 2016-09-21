// ==UserScript==
// @name         Login On LastPass complete;
// @namespace    emartinez1621
// @version      1.0
// @description  This will click the login button when the username and password fields are completed, mainly used for lastpass, cuz im too lazy to hit enter or click the button
// @author       emartinez1621
// @match        https://github.com/login
// @require      https://code.jquery.com/jquery-3.1.0.min.js
// @updateURL    https://raw.githubusercontent.com/emartinez1621/scripts/master/GeneralLaziness/loginOnLastPassComplete
// @grant        none
// ==/UserScript==

$(document).ready(function(){
	//so far confirmed to work with github, possibly work with other sites. 
	$("#password").change(function(){
		$("[value = 'Sign in']").click();
	});
});
