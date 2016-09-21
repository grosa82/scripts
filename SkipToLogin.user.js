// ==UserScript==
// @name         Skip to Login
// @namespace    http://github.com/emartinez1621
// @version      0.2
// @description  Skip to the login page if on the homescreen ONLY WORKING FOR GITHUB ATM WILL ADD MORE AS I FIND MORE
// @author       emartinez1621
// @match        https://github.com/
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/SkipToLogin.user.js
// @grant        none
// ==/UserScript==


(function(){
	var pageToSkip = document.location.href;
	var urlsToSkip = ["https://github.com/"];

	if(urlsToSkip.includes(pageToSkip)){
		window.location.replace(pageToSkip + "login");
	}
})();
