// ==UserScript==
// @name         Quick Add Auto Filler
// @namespace    */Applicants/CreateApplicant*
// @version      1.01
// @description  Automatically fills out an application for you with the option to fill out the Co-Applicant.
//               When Has Co-Applicant checkbox is deselected after initial page load, the Co-Applicant form items are cleared out.
//
//
// @author       Eduardo Martinez
// @match        http://*/Applicants/Create
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/Quick%20Add%20Auto%20Filler.user.js
// @grant        none
// ==/UserScript==


function hasCoApplicant() {
    return confirm("Should this Applicant have a Co-Applicant?\nMake sure to Refresh if you used the Back Button.");
}

var coapp = hasCoApplicant();

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
  if(x < 10) {
    x = "0" + x;
  }

  return x;
}

/* ----------------------------------------------- */


$.ajax({
    url: 'http://api.randomuser.me/?nat=us',
  dataType: 'json',
  success: function(data){
    var user = data.results[0].user;
    var firstName = capitalizeFirstLetter(user.name.first);
    var lastName = capitalizeFirstLetter(user.name.last);
    var generatedEmail = user.email.replace(/ /g, "_");
    var email = generatedEmail.replace("@example", (randomNumWithXDigits(3) + "@gmail"));
    var address = user.location.street;
    var streetLine1 = capitalizeFirstLetterOfEachWord(address);

    $("#FirstName").val(firstName);
    $("#LastName").val(lastName);
    $("#EmailAddress").val(email);
    $("#StreetLine1").val(streetLine1);

    $("#CardholderName").val(firstName + ' ' + lastName);
  }
});

// VARIABLES
var today = new Date();
var month = appendLessThan10(today.getMonth() + 1);
var year = today.getFullYear();

// APPLICANT INFO
var dobYear = randomNumBetween(year - 70, year - 21);
var dobMonth = appendLessThan10(randomNumBetween(1, 12));
var dobDay = appendLessThan10(randomNumBetween(1, 28)); //in case of Feb
$("#DateOfBirth").val(dobMonth + "/" + dobDay + "/" + dobYear);
$("#SocialSecurityNumber").val(randomSocial());
$("#HomePhone").val(randomPhone());
$("#City").val("Salt Lake City");
$("#StateID").val("UT");
$("#PostalCode").val(randomNumWithXDigits(5));

// BANK INFO
$("#AccountNumber").val(randomNumWithXDigits(14));
$("#RoutingNumber").val("122000030");
$("#BankName").val("BANK OF AMERICA NA");
var openMonth = appendLessThan10(randomNumBetween(1,5));
var openYear = appendLessThan10(randomNumBetween(year - 2010, year - 2001));
$("#OpenDate").val(openMonth + "/" + dobDay + "/" + openYear);


// REFERENCES INFO
$("#Reference1Name").val("Yamamoto Kun");
$("#Reference1PhoneNumber").val(randomPhone());
$("#Reference2Name").val("Kohina Ichimatsu");
$("#Reference2PhoneNumber").val(randomPhone());

//EMPLOYER INFO
$("#EmployerName").val("Run Run Company");
$("#EmployerPhone").val(randomPhone());
$("#MonthlyIncome").val(randomNumBetween(2,15) * 1000);
var hireDay = appendLessThan10(randomNumBetween(1, 28));
var hireMonth = appendLessThan10(randomNumBetween(1,12));
var hireYear = appendLessThan10(randomNumBetween(year - 2010, year - 2001));
$("#HireDate").val(hireMonth + "/" + hireDay + "/" + hireYear);
$("#LastPayDate").val(month + "/01/" + year);
$("#NextPayDate").val(month + "/15/" + year);
$("#PayPeriodTypeID").val(3);


//COAPPLICANT INFO
if(coapp === true){
  $('#HasCoApplicant').val('true');
  $('#co-applicant-information').show();

    $.ajax({
        url: 'http://api.randomuser.me/?nat=us',
      dataType: 'json',
      success: function(coAppData){
        var coAppUser = coAppData.results[0].user;
        var coAppFirstName = capitalizeFirstLetter(coAppUser.name.first);
        var coAppLastName = capitalizeFirstLetter(coAppUser.name.last);
        var coAppGeneratedEmail = coAppUser.email.replace(/ /g, "_");
        var coAppEmail = coAppGeneratedEmail.replace("@example", (randomNumWithXDigits(3) + "@gmail"));
        var address = coAppUser.location.street;
        var streetLine1 = capitalizeFirstLetterOfEachWord(address);

        $("#CoApplicantFirstName").val(coAppFirstName);
        $("#CoApplicantLastName").val(coAppLastName);
        $("#CoApplicantEmailAddress").val(coAppEmail);
        $("#CoApplicantStreetLine1").val($("#StreetLine1").val());
        $("#CoApplicantCity").val($("#City").val());
        $("#CoApplicantPostalCode").val($("#PostalCode").val());
        $("#CoApplicantStateID").val("UT");          
      }
    });

    $("#CoApplicantEmployerName").val("The Working Place");
    var coHireDay = appendLessThan10(randomNumBetween(1, 28));
    var coHireMonth = appendLessThan10(randomNumBetween(1,12));
    var coHireYear = appendLessThan10(randomNumBetween(year - 2010, year - 2001));
    $("#CoApplicantEmployerHireDate").val(coHireMonth + "/" + coHireDay + "/" + coHireYear);
    var coDobYear = randomNumBetween(year - 70, year - 21);
    var coDobMonth = appendLessThan10(randomNumBetween(1, 12));
    var coDobDay = appendLessThan10(randomNumBetween(1, 28)); //in case of Feb
    $("#CoApplicantDateOfBirth").val(coDobMonth + "/" + coDobDay + "/" + coDobYear);
    $("#CoApplicantSocialSecurityNumber").val(randomSocial());
    $("#CoApplicantEmployerMonthlyIncome").val(randomNumBetween(1,5) * 1000);
    $("#CoApplicantHomePhone").val(randomPhone());
    $("#CoApplicantCellPhone").val(randomPhone());
    $("#same-as-applicant-address").prop("checked", true);
    $("#CoApplicantEmployerLastPayDate").val(month + "/01/" + year);
    $("#CoApplicantEmployerNextPayDate").val(month + "/15/" + year);


    
  } else {
    $("#CoApplicantFirstName").val('');
    $("#CoApplicantLastName").val('');
    $("#CoApplicantEmailAddress").val('');
    $("#CoApplicantEmployerName").val('');
    $("#CoApplicantHireDate").val('');
    $("#CoApplicantDateOfBirth").val('');
    $("#CoApplicantSocialSecurityNumber").val('');
    $("#CoApplicantMonthlyIncome").val('');
    $("#CoApplicantPrimaryPhone").val('');
    $("#CoApplicantSecondaryPhone").val('');
    $("#CoApplicantStreetLine1").val('');
    $("#CoApplicantStreetLine2").val('');
    $("#CoApplicantCity").val('');
    $("#CoApplicantStateID [value='']").attr('selected', true);
    $("#CoApplicantPostalCode").val('');
  }
