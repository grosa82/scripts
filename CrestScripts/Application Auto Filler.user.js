// ==UserScript==
// @name         Application Auto Filler
// @namespace    https://github.com/emartinez1621
// @version      12.0
// @description  Automatically fills out an application for you with the option to fill out the Co-Applicant.
//               Dynamically clears out hidden Bank & Card form items and fills them back in upon becoming visible.
//               When Has Co-Applicant checkbox is deselected after initial page load, the Co-Applicant form items are cleared out.
//
//               **USABLE IN ALL APPLICATION PAGES (/APPLY, RETAILER PORTAL, AGENT PORTAL, QUICK ADD)
// @author       Carlos Cruz, David Cruz, emartinez1621
// @include      */Applicants/Create*
// @require      https://cdn.emailjs.com/dist/email.min.js
// @require      https://www.gstatic.com/firebasejs/3.3.0/firebase.js
// @grant        GM_xmlhttpRequest
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/Application%20Auto%20Filler.user.js
// ==/UserScript==

//=========VARIABLE INSTANTIATION==========
var user;
var firstName;
var lastName;
var generatedEmail;
var email;
var address;
var streetLine1;
var salesZillowUrl = "http://www.zillow.com/webservice/GetComps.htm?zws-id=X1-ZWz1feg75wwnwr_4dboj&zpid=";
var testZillowUrl = "http://www.zillow.com/webservice/GetComps.htm?zws-id=X1-ZWz1f90bdgck5n_4rdd9&zpid=";
var today = new Date();
var month = appendLessThan10(today.getMonth() + 2);
var year = today.getFullYear();
var windowUrlPath = $(location).attr("pathname");
var notQuickAdd = "/Applicants/CreateApplicant";
var devArray = getDevTeam().responseText;
var sttArray = getSalesTrainingTeam().responseText;
var salesTrainingTeam = sttArray.substring(1);
var devTeam = devArray.substring(0, devArray.length - 2);
var authedUsers = devTeam.concat(salesTrainingTeam);
var onLiveSite = window.location.protocol == "https:";
var config = {
	apiKey: "AIzaSyBzfpCQCoWRjxWkeO6H1E7vh4A5W9ebdsg",
	authDomain: "tampermonkeyauthedusers.firebaseapp.com",
	databaseURL: "https://tampermonkeyauthedusers.firebaseio.com",
	storageBucket: "",
};
firebase.initializeApp(config);
//=========================================

//=================AUTOFILL================
if(onLiveSite && checkAuth(getUsername()) || !onLiveSite) //check if the script is being ran on the prod. true: it will check user permission. false: it will just run the script.
{
	if(confirm("Do you want to autofill the application?")) //true: run autofiller, false: dont run autofiller
	{
		var salesTax = confirm("Are you testing sales tax?");

    //Leaving this because the business will change their mind about this
		//var hasCoApp = confirm("Should this Applicant have a Co-Applicant?\nMake sure to Refresh if you used the Back Button.");

    randomUserRequest(); //This will get all of the info needed to fill the user information part of the form.

		// APPLICANT INFO
		var dobYear = randomNumBetween(year - 70, year - 21);
		var dobMonth = appendLessThan10(randomNumBetween(1, 12));
		var dobDay = appendLessThan10(randomNumBetween(1, 28)); //in case of Feb
		$("#DateOfBirth").val(dobMonth + "/" + dobDay + "/" + dobYear);
		$("#SocialSecurityNumber").val(randomSocial());
		$("#PrimaryPhone, #HomePhone").val(randomPhone());
		$("#SecondaryPhone").val(randomPhone());
		$("#IsSecondaryPhoneCell").val(true);

		// Must be <7.5k
		if(onLiveSite)
		{
			$("#MonthlyIncome").val(5000);
		}
		else
		{
			$("#MonthlyIncome").val(randomNumBetween(2, 7) * 1000);
		}


		// BANK & CARD INFO
		// IS USED EVERYWHERE EXCEPT THE QUICK ADD PAGE
		if(windowUrlPath.includes(notQuickAdd)){
			$("#LoanAmount").val("1500");
			$("#DriversLicenseNumber").val("DRIVERS-LICENSE-" + randomNumWithXDigits(7));
			$("#DriversLicenseState").val("UT");

			var hba = $("#HasBankAccount").val().toLowerCase() === "true";
			var uba = $("#AllowUnbankedCustomers").val().toLowerCase() === "true";
			var ipr = $("#InitialPaymentRequired").val().toLowerCase() === "true";
			var fpr = $("#FirstPaymentRequired").val().toLowerCase() === "true";

			var bankInfoReq = (!uba || hba);
			var cardInfoReq = (fpr || ipr || (uba && !hba));

			if (bankInfoReq) {
				$("#AccountNumberEntry, #AccountNumber").val(randomNumWithXDigits(14));
				$("#RoutingNumber").val("122000030");
				$("#BankName").val("BANK OF AMERICA NA");
				$("#YearsAccountOpen").val("2");
			} else {
				$("#AccountNumber").val("");
				$("#RoutingNumber").val("");
				$("#BankName").val("");
				$("#AccountOpenDate").val("");
			}
		}
		else{
			$("#AccountNumberEntry, #AccountNumber").val(randomNumWithXDigits(14));
			$("#RoutingNumber").val("122000030");
			$("#BankName").val("BANK OF AMERICA NA");
			var openMonth = appendLessThan10(randomNumBetween(1, 5));
			var openYear = appendLessThan10(randomNumBetween(year - 2010, year - 2001));
			$("#AccountOpenDate, #OpenDate").val(openMonth + "/" + openYear);
		}

		$("#CardholderName").val($("#FirstName").val() + " " + $("#LastName").val());
		$("#CardNumberEntry, #CardNumber").val(randomValidCC("4" + randomNumBetween(10000000000000, 99999999999999).toString()));
		$("#ExpirationMonth").val(month);
		$("#ExpirationYear").val(year + 2);

		// REFERENCES INFO
		$("#Reference1Name").val("Yamamoto Kun");
		$("#Reference1PhoneNumber").val(randomPhone());
		$("#Reference2Name").val("Kohina Ichimatsu");
		$("#Reference2PhoneNumber").val(randomPhone());

		//EMPLOYER INFO
		$("#EmployerName").val("Run Run Company");
		$("#EmployerPhone").val(randomPhone());
		var hireDay = appendLessThan10(randomNumBetween(1, 28));
		var hireMonth = appendLessThan10(randomNumBetween(1, 12));
		var hireYear = appendLessThan10(randomNumBetween(year - 20, year - 1));
		$("#YearsAtJob").val("2");
		$("#HireDate").val(hireMonth + "/" + hireDay + "/" + hireYear);

		var payDate = new Date();
		if(today.getDate() >= 15) {
			// after the 15th
			// last pay date is the 15th this month
			// next pay date is 1st of next month
			payDate.setMonth(payDate.getMonth() + 1);
			$("#LastPayDate").val(appendLessThan10(payDate.getMonth()) + "/15/" + payDate.getFullYear());
			$("#NextPayDate").val(appendLessThan10(payDate.getMonth()+1) +  "/01/" + payDate.getFullYear());
		} else {
			// before the 15th
			// last pay date is the 1st this month
			// next pay date is 15th of next month
			payDate.setMonth(payDate.getMonth() + 1);
			$("#LastPayDate").val(appendLessThan10(payDate.getMonth()) + "/01/" + payDate.getFullYear());
			$("#NextPayDate").val(appendLessThan10(payDate.getMonth()) +  "/15/" + payDate.getFullYear());
		}

		$("#PayPeriodTypeID").val(3);

    /*
    //COAPPLICANT INFO
		if (hasCoApp) {
			$("input[id=CoApplicant]").prop("checked", true).change();
			$("#HasCoApplicant").val("true");
			$("#co-applicant-information").show();
			$.ajax({
				url: "http://api.randomuser.me/?nat=us",
				dataType: "json",
				success: function (coAppData) {
					var coAppUser = coAppData.results[0];
					var coAppFirstName = capitalizeFirstLetter(coAppUser.name.first);
					var coAppLastName = capitalizeFirstLetter(coAppUser.name.last);
					var coAppGeneratedEmail = coAppUser.email.replace(/ /g, "_");
					var coAppEmail = coAppGeneratedEmail.replace("@example", (randomNumWithXDigits(3) + "@gmail"));
					var coappAddress = coAppUser.location.street;
					var coappStreetLine1 = capitalizeFirstLetterOfEachWord(coappAddress);

					$("#CoApplicantFirstName").val(coAppFirstName);
					$("#CoApplicantLastName").val(coAppLastName);
					$("#CoApplicantEmailAddress").val(coAppEmail);
					$("#CoApplicantStreetLine1").val(coappStreetLine1);
					$("#CoApplicantCity").val("Salt Lake City");
					$("#CoApplicantStateID").val("UT");
					$("#CoApplicantPostalCode").val(randomNumWithXDigits(5));
				}
			});

			$("input[id=SameApplicantAddress]").prop("checked", true).change();
			$("#SameAsApplicantAddress").val(true);

			$("#CoApplicantEmployerName").val("MgRonald's");
			var coHireDay = appendLessThan10(randomNumBetween(1, 28));
			var coHireMonth = appendLessThan10(randomNumBetween(1, 12));
			var coHireYear = appendLessThan10(randomNumBetween(year - 20, year - 1));
			$("#CoApplicantHireDate, #CoApplicantEmployerHireDate").val(coHireMonth + "/" + coHireDay + "/" + coHireYear);
			var coDobYear = randomNumBetween(year - 70, year - 21);
			var coDobMonth = appendLessThan10(randomNumBetween(1, 12));
			var coDobDay = appendLessThan10(randomNumBetween(1, 28)); //in case of Feb
			$("#CoApplicantDateOfBirth").val(coDobMonth + "/" + coDobDay + "/" + coDobYear);
			$("#CoApplicantSocialSecurityNumber").val(randomSocial());
			$("#CoApplicantMonthlyIncome, #CoApplicantEmployerMonthlyIncome").val(randomNumBetween(1, 5) * 1000);
			$("#CoApplicantEmployerLastPayDate").val(month + "/01/" + year);
			$("#CoApplicantEmployerNextPayDate").val(month + "/15/" + year);
			$("#CoApplicantPrimaryPhone, #CoApplicantHomePhone").val(randomPhone());
			$("#CoApplicantSecondaryPhone, #CoApplicantCellPhone").val(randomPhone());
			if($("#CoApplicantPrimaryPhoneCell").Length > 0){
				$("#CoApplicantPrimaryPhoneCell")[0].checked = true;
			}

			$("#IsCoApplicantPrimaryPhoneCell").val(true);
		}

		//CLEAR COAPPLICANT INFO IF CHECKBOX BECOMES UNCHECKED
		$("#CoApplicant").change(function () {
			if (!$("#CoApplicant").is(":checked")) {
				$("#CoApplicantFirstName").val("");
				$("#CoApplicantLastName").val("");
				$("#CoApplicantEmailAddress").val("");
				$("#CoApplicantEmployerName").val("");
				$("#CoApplicantHireDate").val("");
				$("#CoApplicantDateOfBirth").val("");
				$("#CoApplicantSocialSecurityNumber").val("");
				$("#CoApplicantMonthlyIncome").val("");
				$("#CoApplicantPrimaryPhone").val("");
				$("#CoApplicantSecondaryPhone").val("");
				$("#CoApplicantPrimaryPhoneCell")[0].checked = false;
				$("#IsCoApplicantPrimaryPhoneCell").val(false);

				$("#SameApplicantAddress")[0].checked = false;
				$("#SameAsApplicantAddress").val(false);
				$("#CoApplicantStreetLine1").val("");
				$("#CoApplicantStreetLine2").val("");
				$("#CoApplicantCity").val("");
				$("#CoApplicantStateID [value='']").attr("selected", true);
				$("#CoApplicantPostalCode").val("");
			}
		});
    */

		//UPDATE BANK & CARD INFO BASED ON THEIR DYNAMIC REQUIREMENTS
		$("#BankAccount").change(function () {
			var month = appendLessThan10(randomNumBetween(1, 12));
			var year = randomNumBetween(2017, 2019);

			var firstName = $("#FirstName").val().toString();
			var lastName = $("#LastName").val().toString();

			if(environments.includes(windowLoc)){
				var hba = $("#HasBankAccount").val().toLowerCase() === "true";
				var uba = $("#AllowUnbankedCustomers").val().toLowerCase() === "true";
				var ipr = $("#InitialPaymentRequired").val().toLowerCase() === "true";
				var fpr = $("#FirstPaymentRequired").val().toLowerCase() === "true";

				var bankInfoReq = (!uba || hba);
				var cardInfoReq = (fpr || ipr || (uba && !hba));

				if (bankInfoReq) {
					$("#AccountNumberEntry").val(randomNumWithXDigits(14));
					$("#RoutingNumber").val("122000030");
					$("#BankName").val("BANK OF AMERICA NA");
					var openMonth = appendLessThan10(randomNumBetween(1, 12));
					var openYear = appendLessThan10(randomNumBetween(year - 2010, year - 2001));
					$("#AccountOpenDate").val(openMonth + "/" + openYear);
				} else {
					$("#AccountNumberEntry").val("");
					$("#RoutingNumber").val("");
					$("#BankName").val("");
					$("#AccountOpenDate").val("");
				}

				if (cardInfoReq) {
					$("#CardholderName").val(firstName + " " + lastName);
					$("#CardNumberEntry, #CardNumber").val(randomValidCC("4" + randomNumBetween(10000000000000, 99999999999999).toString()));
					$("#ExpirationMonth").val(month);
					$("#ExpirationYear").val(year + 2);
				} else {
					$("#CardholderName").val("");
					$("#CardNumberEntry").val("");
					$("#ExpirationMonth").val("");
					$("#ExpirationYear").val("");
				}
			}
		});
	}
}
else
{
	var permissionRequest = confirm("You don't have permission to use this script. Would you like to request access to use it?");
	if(permissionRequest)
	{
		(function(){
			emailjs.init("user_rQVozQocfLKxZE2lhvaq7");
		})();
		emailjs.send("gmail", "tamper_monkey_authorized_user_request", {"username": getUsername(), "tampermonkey": "Application Auto Filler"});
		alert("An email has been sent with your request!");
	}
}

//================FUNCTIONS================
function getDevTeam(){
	return $.ajax({
		url: "https://tampermonkeyauthedusers.firebaseio.com/authUsers/devTeam.json?print=pretty",
		dataType: "json",
		async: !1,
		success: function(response) {
			var data = response;
		}
	});
}

function getSalesTrainingTeam(){
	return $.ajax({
		url: "https://tampermonkeyauthedusers.firebaseio.com/authUsers/salesTrainingTeam.json?print=pretty",
		dataType: "json",
		async: !1,
		success: function(response) {
			var data = response;
		}
	});
}

function getUsername() {
  if($("#status").is(":visible"))
	{
		var usernameField = $("#status").text();
		var welcome = usernameField.indexOf(" [");
		var username = usernameField.substring(8,welcome-1);
		return username.substring(21);
	}
	else
	{
		return $("#retailer-name").text();
	}
}


function checkAuth(username){
  return authedUsers.includes(username) ? true : false;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterOfEachWord(string) {
	var array = string.split(/(\s+)/),
		length = array.length,
		i = 0,
		word;
	while (i < length) {
		array[i] = array[i].toLowerCase();
		word = array[i];
		if (word.length > 2) {
			array[i] = word.charAt(0).toUpperCase() + word.slice(1);
		}
		i += 1;
	}
	return array.join("");
}

function findPlace(x) {
	// Finds the "place" of the number X
	// e.g. x = 43,210 findPlace(x) = 10,000
	n = 1;
	while (x >= 10) {
		x /= 10;
		n *= 10;
	}
	return n;
}

function findMaxFromPlace(x) {
	// Finds the max number of length X
	n = 1;
	y = 0;
	for (i = 1; i <= x; i++) {
		y += 9 * n;
		n *= 10;
	}

	return y;
}

function randomNumWithXDigits(n) {
	// With n = 5 places
	// y = 99999
	// x = 10000
	// result example: 12345

	var y = findMaxFromPlace(n);
	var x = findPlace(y);
	return Math.floor(Math.random() * (y - x) + x);
}

function randomNumBetween(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randomPhone() {
	return ("(" + randomNumWithXDigits(3) + ") " + randomNumWithXDigits(3) + "-" + randomNumWithXDigits(4));
}

function randomSocial() {
	return (randomNumWithXDigits(3) + "-" + randomNumWithXDigits(2) + "-" + randomNumWithXDigits(4));
}

function appendLessThan10(x) {
	// Appends a 0 in from of any number less than 10
	return x < 10 ?  "0" + x : x;
}

function randomValidCC(digits) {
	function luhn(d) {
		var res = 0;
		var inc = d.length % 2;
		for (var i = 0; i < d.length; ++i) {
			var n = Number(d.charAt(i)) * (2 - (i + inc) % 2);
			res += n > 9 ? n - 9 : n;
		}
		return res;
	}
	var checksum = luhn(digits) % 10;
	var cs = luhn(digits + "0") % 10;
	var checkdigit = cs ? 10 - cs : 0;

	return digits + checkdigit;
}

function setRandomAddress(streetLine1){
	$("#StreetLine1").val(streetLine1);
	$("#City").val("Salt Lake City");
	$("#StateID").val("UT");
	$("#PostalCode").val(randomNumWithXDigits(5));
}

function randomUserRequest(){
  $.ajax({
    url: "https://randomuser.me/api/?nat=us",
    dataType: "json",
    success: function(data){
     user = data.results[0];
     firstName = capitalizeFirstLetter(user.name.first);
     lastName = capitalizeFirstLetter(user.name.last);
     generatedEmail = user.email.replace(/ /g, "_");
     email = generatedEmail.replace("@example", (randomNumWithXDigits(3) + "@gmail"));
     address = user.location.street;
     streetLine1 = capitalizeFirstLetterOfEachWord(address);

      $("#FirstName").val(firstName);
      $("#LastName").val(lastName);
      $("#EmailAddress").val(email);
      $("#EmailAddressConfirm").val(email);

      setValuesBasedOnUser();

      $("#CardholderName").val(firstName + " " + lastName);
    }
  });
}

function zillowRequest(url){
	var urlEnd = randomNumBetween(11111111,99999999) + "&count=1";
	GM_xmlhttpRequest({
		method: "GET",
		url: url + urlEnd,
		onload: function(response) {
			var responseXML = null;
			// Inject responseXML into existing Object (only appropriate for XML content).
			if (!response.responseXML) {
				responseXML = new DOMParser()
					.parseFromString(response.responseText, "text/xml");
			}
			var xmlDoc = $.parseXML(response.responseText);
			var $xml = $(xmlDoc);
			var $text = $xml.find("text");
			var innerText = $text[0].innerHTML;
			if(innerText === "Request successfully processed"){
				var $street = $xml.find("street");
				var $city = $xml.find("city");
				var $state = $xml.find("state");
				var $zipcode = $xml.find("zipcode");

				$("#StreetLine1").val($street[0].innerHTML);
				$("#City").val($city[0].innerHTML);
				$("#StateID").val($state[0].innerHTML);
				$("#PostalCode").val($zipcode[0].innerHTML);

				/*console.log([
					response.status,
					response.statusText,
					response.readyState,
					response.responseHeaders,
					response.responseText,
					response.finalUrl,
					responseXML
				].join("\n"));*/
			}
			else{
				zillowRequest(url);
			}
		}
	});
}

function setValuesBasedOnUser(){

  if(salesTax && onLiveSite){
    zillowRequest(salesZillowUrl);
    if(salesTrainingTeam.includes(getUsername())){
      $("#MainDealerID, #select-retailer").val(10837);
    }
    else{
      $("#MainDealerID, #select-retailer").val(11000);
    }
  }

  else if(salesTax && !onLiveSite){
    zillowRequest(testZillowUrl);

    if(salesTrainingTeam.includes(getUsername())){
      $("#MainDealerID, #select-retailer").val(10837);
    }
  }
  else if(!salesTax && onLiveSite){

    if(salesTrainingTeam.includes(getUsername())){
      $("#MainDealerID, #select-retailer").val(10837);
      setRandomAddress(streetLine1);
    }
    else{
      $("#MainDealerID, #select-retailer").val(3203);
      setRandomAddress(streetLine1);
    }
  }
  else{
    setRandomAddress(streetLine1);
  }
}
