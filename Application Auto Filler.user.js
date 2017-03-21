// ==UserScript==
// @name         Application Auto Filler
// @namespace    */Applicants/CreateApplicant/*
// @version      14.1
// @description  Automatically fills out an application for you with the option to fill out the Co-Applicant.
//               Dynamically clears out hidden Bank & Card form items and fills them back in upon becoming visible.
//               When Has Co-Applicant checkbox is deselected after initial page load, the Co-Applicant form items are cleared out.
//
//               **USABLE IN ALL APPLICATION PAGES (/APPLY, RETAILER PORTAL, AGENT PORTAL, QUICK ADD)
// @author       Carlos Cruz, David Cruz, Eduardo Martinez
// @include      */Applicants/Create*
// @grant        GM_xmlhttpRequest
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/Application%20Auto%20Filler.user.js
// ==/UserScript==

var testUrl = "http://www.zillow.com/webservice/GetComps.htm?zws-id=X1-ZWz1f90bdgck5n_4rdd9&zpid=";
var today = new Date();
var month = appendLessThan10(today.getMonth() + 2);
var year = today.getFullYear();
var hireDay = appendLessThan10(randomNumBetween(1, 28));
var hireMonth = appendLessThan10(randomNumBetween(1, 12));
var hireYear = appendLessThan10(randomNumBetween(year - 20, year - 1));
var dobYear = randomNumBetween(year - 70, year - 21);
var dobMonth = appendLessThan10(randomNumBetween(1, 12));
var dobDay = appendLessThan10(randomNumBetween(1, 28)); //in case of Feb

var hba = $("#HasBankAccount").val().toLowerCase() === "true";
var uba = $("#AllowUnbankedCustomers").val().toLowerCase() === "true";
var ipr = $("#InitialPaymentRequired").val().toLowerCase() === "true";
var fpr = $("#FirstPaymentRequired").val().toLowerCase() === "true";
var bankInfoReq = (!uba || hba);
var cardInfoReq = (fpr || ipr || (uba && !hba));
var statesWeDontDoBusinessWith = ["NJ", "MN", "WI", "VT"];

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterOfEachWord(string) {

	var array = string.split(/(\s+)/),
		length = array.length,
		i = 0,
		word;

	while (i < length) {
		//array[i] = array[i].toLowerCase(); // make words lowercased first if you want
		word = array[i];
		if (word.length > 2) {
			array[i] = word.charAt(0).toUpperCase() + word.slice(1);
		}

		i += 1;
	}

	return array.join("");
}

function findPlace(x) {
	// Finds the 'place' of the number X
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

function setRandomAddress(streetLine1){
	$("#StreetLine1").val(streetLine1);
	$("#City").val("Salt Lake City");
	$("#StateID").val("UT");
	$("#PostalCode").val(randomNumWithXDigits(5));
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

function hasCoApplicant() {
	return false;
	// Leaving this because the business will change their mind about this
	//return confirm("Should this Applicant have a Co-Applicant?\nMake sure to Refresh if you used the Back Button.");
}

function appendLessThan10(x) {
	// Appends a 0 in from of any number less than 10
	if (x < 10) {
		x = "0" + x;
	}

	return x;
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

function setPayDates(){
	var payDate = new Date();
	if(today.getDate() >= 15) {
		// after the 15th
		// last pay date is the 15th this month
		// next pay date is 1st of next month
		payDate.setMonth(payDate.getMonth() + 1);			
		if(payDate.getMonth() === 0){
			//$("#LastPayDate").val("");
			$("#NextPayDate").val("01/01/" + payDate.getFullYear());
		}
		else{
			//$("#LastPayDate").val(appendLessThan10(payDate.getMonth()) + "/15/" + payDate.getFullYear() - 1);
			$("#NextPayDate").val(appendLessThan10(payDate.getMonth()+1) +  "/01/" + payDate.getFullYear());
		}
	} 
	else {
		// before the 15th
		// last pay date is the 1st this month
		// next pay date is 15th of next month
		payDate.setMonth(payDate.getMonth() + 1);
		if(payDate.getMonth() === 0){
			payDate.setMonth(payDate.getMonth()-1);
			//$("#LastPayDate").val("12/01/" + payDate.getFullYear());
			$("#NextPayDate").val("12/15/" + payDate.getFullYear());
		}
		else{
			//$("#LastPayDate").val(appendLessThan10(payDate.getMonth()) + "/01/" + payDate.getFullYear());
			$("#NextPayDate").val(appendLessThan10(payDate.getMonth()) +  "/15/" + payDate.getFullYear());
		}
	}
}

function setValidAddress(url){
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
				console.log("this works!");
				var $street = $xml.find("street");
				var $city = $xml.find("city");
				var $state = $xml.find("state");
				var $zipcode = $xml.find("zipcode");

				if(statesWeDontDoBusinessWith.includes($state[0].innerHTML)){
					setValidAddress(url);
				}
				else{
					$("#StreetLine1").val($street[0].innerHTML);
					$("#City").val($city[0].innerHTML);
					$("#StateID").val($state[0].innerHTML);
					$("#PostalCode").val($zipcode[0].innerHTML);
					$("#BillingPostalCode").val($zipcode[0].innerHTML);
				}
			}
			else{
				console.log("wtf");
				setValidAddress(url);
			}
		}
	});
}

function setRandomUserInfo(){
	var salesTax = confirm("Are you testing sales tax?");
	$.ajax({
		url: 'https://randomuser.me/api/?nat=us',
		dataType: 'json',
		success: function(data){
			var user = data.results[0];
			var firstName = capitalizeFirstLetter(user.name.first);
			var lastName = capitalizeFirstLetter(user.name.last);
			var generatedEmail = user.email.replace(/ /g, "_");
			var email = generatedEmail.replace("@example", (randomNumWithXDigits(3) + "@gmail"));
			var address = user.location.street;
			var streetLine1 = capitalizeFirstLetterOfEachWord(address);

			$("#FirstName").val(firstName);
			$("#LastName").val(lastName);
			$("#EmailAddress").val(email);
			$("#EmailAddressConfirm").val(email);
			$("#CardholderName").val(firstName + ' ' + lastName);

			if(!salesTax){
				setRandomAddress(streetLine1);
			}
			else{
				setValidAddress(testUrl);
			}
		}
	});
}

if(confirm("Do you want to autofill the application?"))
{
	setRandomUserInfo();

	// APPLICANT INFO
	$("#DateOfBirth").val(dobMonth + "/" + dobDay + "/" + dobYear);
	$("#SocialSecurityNumber").val(randomSocial());
	$("#PrimaryPhone, #HomePhone").val(randomPhone());
	$("#SecondaryPhone").val(randomPhone());
	$("#IsSecondaryPhoneCell").val(true);
	$("#MonthlyIncome").val(randomNumBetween(2, 7) * 1000);

	// BANK & CARD INFO
	// IS USED EVERYWHERE EXCEPT THE QUICK ADD PAGE

	$("#LoanAmount").val("1500");
	$("#DriversLicenseNumber").val("DRIVERS-LICENSE-" + randomNumWithXDigits(7));
	$("#DriversLicenseState").val("UT");
	$("#OwnershipTypeID").val(randomNumBetween(1,4));

	if (bankInfoReq) {
		$("#AccountNumberEntry, #AccountNumber").val(randomNumWithXDigits(14));
		$("#RoutingNumber").val("122000030");
		$("#BankName").val("BANK OF AMERICA NA");
		$("#YearsAccountOpen").val("2");

	} else {
		$("#AccountNumber").val('');
		$("#RoutingNumber").val('');
		$("#BankName").val('');
		$("#AccountOpenDate").val('');
	}

	$("#CardholderName").val($("#FirstName").val() + ' ' + $("#LastName").val());
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
	$("#YearsAtJob").val("2");
	$("#HireDate").val(hireMonth + "/" + hireDay + "/" + hireYear);
	setPayDates();
	$("#PayPeriodTypeID").val(4);
}
