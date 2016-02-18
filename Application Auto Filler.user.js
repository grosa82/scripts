// ==UserScript==
// @name         Application Auto Filler
// @namespace    */Applicants/CreateApplicant/*
// @version      1.0
// @description  Automatically fills out an application for you with the option to fill out the Co-Applicant. 
//               Dynamically clears out hidden Bank & Card form items and fills them back in upon becoming visible. 
//               When Has Co-Applicant checkbox is deselected after initial page load, the Co-Applicant form items are cleared out.
//               
//               **ONLY USABLE IN THE NEW APPLICATION PAGE. NOT USABLE ON THE AGENT/RETAILER PORTAL APPLICATION.
//               
// @author       Carlos Cruz, David Cruz
// @match        http://*/Applicants/CreateApplicant/*
// @grant        none
// @updateURL    https://github.com/emartinez1621/scripts/raw/master/Application%20Auto%20Filler.user.js
// ==/UserScript==

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

function hasCoApplicant() {
    return confirm("Should this Applicant have a Co-Applicant?\nMake sure to Refresh if you used the Back Button.");
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
};

var addressArray = '{"1" : [{"abbrev" : "AK", "zip" : "99507", "city" : "Anchorage", "address" : "8030 Sabrina St"}, {"abbrev" : "AK", "zip" : "99572", "city" : "Cooper Landing", "address" : "20518 Sterling Hwy"}, {"abbrev" : "AK", "zip" : "99683", "city" : "Trapper Creek", "address" : "25517 S Oilwell Rd"}], "2" : [{"abbrev" : "AL", "zip" : "35004", "city" : "Moody", "address" : "1936 Heritage Rd"}, {"abbrev" : "AL", "zip" : "35071", "city" : "Gardendale", "address" : "1665 Quail Ridge Dr"}, {"abbrev" : "AL", "zip" : "35188", "city" : "Woodstock", "address" : "27 Old Stagecoach Rd"}], "3" : [{"abbrev" : "AR", "zip" : "71601", "city" : "Pine Bluff", "address" : "206 Park Pl"}, {"abbrev" : "AR", "zip" : "71765", "city" : "Strong", "address" : "2666 Jones Lake Rd"}, {"abbrev" : "AR", "zip" : "71866", "city" : "Winthrop", "address" : "2601 Highway 41 N"}], "4" : [{"abbrev" : "AZ", "zip" : "85248", "city" : "Chandler", "address" : "1515 W Honeysuckle Ln"}, {"abbrev" : "AZ", "zip" : "85310", "city" : "Glendale", "address" : "23833 N 39th Ln"}, {"abbrev" : "AZ", "zip" : "85282", "city" : "Tempe", "address" : "2019 S Granada Dr"}], "5" : [{"abbrev" : "CA", "zip" : "93260", "city" : "Posey", "address" : "43228 Oak Dr."}, {"abbrev" : "CA", "zip" : "90210", "city" : "Beverly Hills", "address" : "1270 Shadow Hill Way"}, {"abbrev" : "CA", "zip" : "95206", "city" : "Stockton", "address" : "1708 Ralph Ave"}], "6" : [{"abbrev" : "CO", "zip" : "80446", "city" : "Granby", "address" : "404 New Church Ave"}, {"abbrev" : "CO", "zip" : "80439", "city" : "Silverthorne", "address" : "348 Jade Rd"}, {"abbrev" : "CO", "zip" : "80701", "city" : "Fort Morgan", "address" : "22221 County Road A"}], "7" : [{"abbrev" : "CT", "zip" : "06088", "city" : "East Windsor", "address" : "309 Scantic Rd"}, {"abbrev" : "CT", "zip" : "06237", "city" : "Columbia", "address" : "42 Hennequin Rd"}, {"abbrev" : "CT", "zip" : "06424", "city" : "East Hampton", "address" : "22 Arden Dr"}], "8" : [{"abbrev" : "DC", "zip" : "20011", "city" : "Washington", "address" : "425 Kennedy St NE"}, {"abbrev" : "DC", "zip" : "20006", "city" : "Washington", "address" : "2030 F st NW APT 801"}, {"abbrev" : "DC", "zip" : "20024", "city" : "Washington", "address" : "800 4th St SW APT S603"}], "9" : [{"abbrev" : "DE", "zip" : "19956", "city" : "Laurel", "address" : "101 Maple St"}, {"abbrev" : "DE", "zip" : "19736", "city" : "Yorklyn", "address" : "2255 Creek Rd"}, {"abbrev" : "DE", "zip" : "19930", "city" : "Bethany Beach", "address" : "420 Collins St"}], "10" : [{"abbrev" : "FL", "zip" : "32003", "city" : "Orange Park", "address" : "2182 Trailwood Dr"}, {"abbrev" : "FL", "zip" : "32059", "city" : "Lee", "address" : "7236 SE Farm Rd"}, {"abbrev" : "FL", "zip" : "32082", "city" : "Jacksonville", "address" : "289 Roscoe Blvd"}], "11" : [{"abbrev" : "GA", "zip" : "31512", "city" : "Ambrose", "address" : "774 Squire Rd"}, {"abbrev" : "GA", "zip" : "39834", "city" : "Climax", "address" : "4782 Vada Rd"}, {"abbrev" : "GA", "zip" : "30669", "city" : "Woodville", "address" : "1071 Peachtree Ave W"}], "12" : [{"abbrev" : "HI", "zip" : "96704", "city" : "Ocean View", "address" : "92-9193 Lehua Ln"}, {"abbrev" : "HI", "zip" : "96725", "city" : "Holualoa", "address" : "76-5989 Mamalahoa Hwy"}, {"abbrev" : "HI", "zip" : "96785", "city" : "Volcano", "address" : "19-4021 Kilauea Rd"}], "13" : [{"abbrev" : "IA", "zip" : "50134", "city" : "Kelley", "address" : "54316 276th St"}, {"abbrev" : "IA", "zip" : "50230", "city" : "Radcliffe", "address" : "29393 Co Hwy S27"}, {"abbrev" : "IA", "zip" : "50310", "city" : "Des Moines", "address" : "2716 46th St"}], "14" : [{"abbrev" : "ID", "zip" : "83201", "city" : "Pocatello", "address" : "3021 Shelly Pl"}, {"abbrev" : "ID", "zip" : "83246", "city" : "Lava Hot Springs", "address" : "6785 S Pheasant Dr"}, {"abbrev" : "ID", "zip" : "93440", "city" : "Rexburg", "address" : "913 S 2400 W"}], "15" : [{"abbrev" : "IL", "zip" : "60010", "city" : "Hoffman Estates", "address" : "5105 Chambers Dr"}, {"abbrev" : "IL", "zip" : "60064", "city" : "North Chicago", "address" : "2002 16th St"}, {"abbrev" : "IL", "zip" : "60112", "city" : "Cortland", "address" : "85 E Oxford Close"}], "16" : [{"abbrev" : "IN", "zip" : "46140", "city" : "Greenfield", "address" : "762 Berry St"}, {"abbrev" : "IN", "zip" : "46201", "city" : "Indianapolis", "address" : "442 N Denny St"}, {"abbrev" : "IN", "zip" : "46327", "city" : "Hammond", "address" : "4042 Grover Ave"}], "17" : [{"abbrev" : "KS", "zip" : "66006", "city" : "Baldwin", "address" : "402 Fremont St"}, {"abbrev" : "KS", "zip" : "66101", "city" : "Kansas City", "address" : "843 Ivandale St"}, {"abbrev" : "KS", "zip" : "66945", "city" : "Hanover", "address" : "111 S Hanover St"}], "18" : [{"abbrev" : "KY", "zip" : "40071", "city" : "Taylorsville", "address" : "896 Fiddler Ln"}, {"abbrev" : "KY", "zip" : "40299", "city" : "Jefferson", "address" : "10301 Grand Ave"}, {"abbrev" : "KY", "zip" : "40371", "city" : "Salt Lick", "address" : "67 Railroad St"}], "19" : [{"abbrev" : "LA", "zip" : "70118", "city" : "New Orleans", "address" : "2632 Calhoun St"}, {"abbrev" : "LA", "zip" : "70437", "city" : "Folsom", "address" : "77050 Robinson Rd"}, {"abbrev" : "LA", "zip" : "70526", "city" : "Crowley", "address" : "814 N Avenue G"}], "20" : [{"abbrev" : "MA", "zip" : "01005", "city" : "Barre", "address" : "400 West St"}, {"abbrev" : "MA", "zip" : "01431", "city" : "Ashby", "address" : "389 County Rd"}, {"abbrev" : "MA", "zip" : "01612", "city" : "Paxton", "address" : "349 Pleasant St"}], "21" : [{"abbrev" : "MD", "zip" : "20639", "city" : "Huntington", "address" : "3355 Bayside Rd"}, {"abbrev" : "MD", "zip" : "20817", "city" : "Bethesda", "address" : "6007 Greentree Rd"}, {"abbrev" : "MD", "zip" : "20815", "city" : "Chevy Chase", "address" : "3536 Hamlet Pl"}], "22" : [{"abbrev" : "ME", "zip" : "04020", "city" : "Cornish", "address" : "1704 North Rd"}, {"abbrev" : "ME", "zip" : "04347", "city" : "Halowell", "address" : "3 Second St"}, {"abbrev" : "ME", "zip" : "04681", "city" : "Stonington ", "address" : "24 Minister Field Rd"}], "23" : [{"abbrev" : "MI", "zip" : "48001", "city" : "Clay", "address" : "6052 Swartout Rd"}, {"abbrev" : "MI", "zip" : "48072", "city" : "Berkley", "address" : "1828 Bacon Ave"}, {"abbrev" : "MI", "zip" : "49064", "city" : "Lawrence", "address" : "50355 40th Ave"}], "24" : [{"abbrev" : "MN", "zip" : "55327", "city" : "Dayton", "address" : "16840 Dayton Rover Rd"}, {"abbrev" : "MN", "zip" : "55390", "city" : "Waverly", "address" : "2503 Elder Ave SW"}, {"abbrev" : "MN", "zip" : "55367", "city" : "New Germany", "address" : "8050 Yale Ave"}], "25" : [{"abbrev" : "MO", "zip" : "63115", "city" : "Saint Louis", "address" : "4587 Clarence Ave"}, {"abbrev" : "MO", "zip" : "63638", "city" : "Ellington", "address" : "398 Redbud Lane"}, {"abbrev" : "MO", "zip" : "64079", "city" : "Platte City", "address" : "11315 45 Hwy N"}], "26" : [{"abbrev" : "MS", "zip" : "39327", "city" : "Decatur", "address" : "1711 Lebanon Church Rd"}, {"abbrev" : "MS", "zip" : "39483", "city" : "Foxworth", "address" : "44 Dunaway Rd"}, {"abbrev" : "MS", "zip" : "39759", "city" : "Starkville", "address" : "7607 Us Highway 82"}], "27" : [{"abbrev" : "MT", "zip" : "59087", "city" : "Winnett", "address" : "201 N Moulton St"}, {"abbrev" : "MT", "zip" : "59453", "city" : "Judith Gap", "address" : "108 Golden Bear Ln"}, {"abbrev" : "MT", "zip" : "59930", "city" : "Rexford", "address" : "598 Tamarack Ln"}], "28" : [{"abbrev" : "NC", "zip" : "27283", "city" : "Julian", "address" : "5515 Mayfield Dr"}, {"abbrev" : "NC", "zip" : "27565", "city" : "Oxford", "address" : "900 Hillsboro St"}, {"abbrev" : "NC", "zip" : "28338", "city" : "Ellerbe", "address" : "1535 Greenlake Rd"}], "29" : [{"abbrev" : "ND", "zip" : "58259", "city" : "Michigan", "address" : "123 2nd St W"}, {"abbrev" : "ND", "zip" : "58385", "city" : "Wolford", "address" : "4291 Highway 17"}, {"abbrev" : "ND", "zip" : "58552", "city" : "Linton", "address" : "108 SE 2nd St"}], "30" : [{"abbrev" : "NE", "zip" : "68057", "city" : "Scribner", "address" : "518 Pebble St"}, {"abbrev" : "NE", "zip" : "68324", "city" : "Burr", "address" : "1908 S 22 Rd"}, {"abbrev" : "NE", "zip" : "68853", "city" : "Loup City", "address" : "42 Hilltop Road"}], "31" : [{"abbrev" : "NH", "zip" : "03255", "city" : "Newbury", "address" : "44 Ramblewood Dr"}, {"abbrev" : "NH", "zip" : "03575", "city" : "Carroll", "address" : "72 Remick Ln #8"}, {"abbrev" : "NH", "zip" : "03864", "city" : "Ossipee", "address" : "10 Granite Rd"}], "32" : [{"abbrev" : "NJ", "zip" : "07011", "city" : "Clifton", "address" : "22 Grant Ave"}, {"abbrev" : "NJ", "zip" : "07632", "city" : "Englewood Cliffs", "address" : "77 New Street"}, {"abbrev" : "NJ", "zip" : "07821", "city" : "Green Twp", "address" : "38 Hillside Ter"}], "33" : [{"abbrev" : "NM", "zip" : "87001", "city" : "Algodones", "address" : "880 B Camino De Dolores"}, {"abbrev" : "NM", "zip" : "87507", "city" : "Santa Fe", "address" : "1139 Vuelta De Las Acequias"}, {"abbrev" : "NM", "zip" : "88032", "city" : "Dona Ana", "address" : "868 Maple Park Ave"}], "34" : [{"abbrev" : "NV", "zip" : "89117", "city" : "Las Vegas", "address" : "2716 Baycliff Ct #1"}, {"abbrev" : "NV", "zip" : "89447", "city" : "Yerington", "address" : "222 Valley"}, {"abbrev" : "NV", "zip" : "89883", "city" : "West Wendover", "address" : "2937 Fairway View Dr"}], "35" : [{"abbrev" : "NY", "zip" : "11720", "city" : "Centereach", "address" : "63 Hunter Ln"}, {"abbrev" : "NY", "zip" : "10003", "city" : "New York", "address" : "114 E 13th St APT 6A"}, {"abbrev" : "NY", "zip" : "10472", "city" : "Bronx", "address" : "1056 Wheeler Ave"}], "36" : [{"abbrev" : "OH", "zip" : "43001", "city" : "Alexandria", "address" : "3633 Battee Rd"}, {"abbrev" : "OH", "zip" : "43228", "city" : "Columbus", "address" : "1623 Green Friar Dr"}, {"abbrev" : "OH", "zip" : "44087", "city" : "Reminderville", "address" : "11 Liberty Cv"}], "37" : [{"abbrev" : "OK", "zip" : "73038", "city" : "Fort Cobb", "address" : "320 Easy Street Crow Roost"}, {"abbrev" : "OK", "zip" : "73446", "city" : "Madill", "address" : "14217 Grove St"}, {"abbrev" : "OK", "zip" : "74553", "city" : "Kiowa", "address" : "684 S Dewey St"}], "38" : [{"abbrev" : "OR", "zip" : "97101", "city" : "Amity", "address" : "211 Sixth St"}, {"abbrev" : "OR", "zip" : "97458", "city" : "Myrtle Point", "address" : "94792"}, {"abbrev" : "OR", "zip" : "97639", "city" : "Sprague River", "address" : "29920 Sprague River Rd"}], "39" : [{"abbrev" : "PA", "zip" : "15026", "city" : "Clinton", "address" : "4048 Route 151"}, {"abbrev" : "PA", "zip" : "15360", "city" : "Scenery Hill", "address" : "311 Urquhart Rd"}, {"abbrev" : "PA", "zip" : "17109", "city" : "Harrisburg", "address" : "4208 Jonestown Rd"}], "40" : [{"abbrev" : "RI", "zip" : "02889", "city" : "Warwick", "address" : "522 W Shore Rd"}, {"abbrev" : "RI", "zip" : "02879", "city" : "South Kingstown", "address" : "0 Balsam Rd"}, {"abbrev" : "RI", "zip" : "02817", "city" : "West Greenwich", "address" : "7 Tiffany Ln"}], "41" : [{"abbrev" : "SC", "zip" : "29588", "city" : "Myrtle Beach", "address" : "137 Dry Valley Loop"}, {"abbrev" : "SC", "zip" : "29620", "city" : "Lowndesville", "address" : "2.52 Acs Shaw Rd"}, {"abbrev" : "SC", "zip" : "29621", "city" : "Anderson", "address" : "2809 Little Creek Dr"}], "42" : [{"abbrev" : "SD", "zip" : "57201", "city" : "Watertown", "address" : "1101 37th St NW"}, {"abbrev" : "SD", "zip" : "57718", "city" : "Black Hawk", "address" : "8071 Jackie Street"}, {"abbrev" : "SD", "zip" : "57469", "city" : "Redfield", "address" : "124 W 5th"}], "43" : [{"abbrev" : "TN", "zip" : "38261", "city" : "Union City", "address" : "4456 Countrywood St"}, {"abbrev" : "TN", "zip" : "38111", "city" : "Memphis", "address" : "3698 Philsdale Ave"}, {"abbrev" : "TN", "zip" : "37411", "city" : "Chattanooga", "address" : "718 Woods Dr"}], "44" : [{"abbrev" : "TX", "zip" : "79545", "city" : "Roscoe", "address" : "701 Main St"}, {"abbrev" : "TX", "zip" : "76226", "city" : "Lantana", "address" : "866 George St"}, {"abbrev" : "TX", "zip" : "78382", "city" : "Rockport", "address" : "3549 Loop 1781"}], "45" : [{"abbrev" : "UT", "zip" : "84081", "city" : "West Jordan", "address" : "4866 w Diamondleaf Way"}, {"abbrev" : "UT", "zip" : "84058", "city" : "Orem", "address" : "1111 s 1350 w F203"}, {"abbrev" : "UT", "zip" : "84070", "city" : "Sandy", "address" : "11251 S State Street I107"}], "46" : [{"abbrev" : "VA", "zip" : "23227", "city" : "Richmond", "address" : "407 Lakeside Blvd"}, {"abbrev" : "VA", "zip" : "24121", "city" : "Moneta", "address" : "1044 Stripers Ct"}, {"abbrev" : "VA", "zip" : "24293", "city" : "Wise", "address" : "826 Hurricane"}], "47" : [{"abbrev" : "VT", "zip" : "05482", "city" : "Shelburne", "address" : "959 Falls Rd"}, {"abbrev" : "VT", "zip" : "05001", "city" : "#", "address" : "White River Junction"}, {"abbrev" : "VT", "zip" : "05059", "city" : "Quechee", "address" : "574 Willard Rd #QH1D"}], "48" : [{"abbrev" : "WA", "zip" : "98012", "city" : "Bothell", "address" : "4115 176th Pl SE"}, {"abbrev" : "WA", "zip" : "98103", "city" : "Seattle", "address" : "1909 N 55th St"}, {"abbrev" : "WA", "zip" : "99201", "city" : "Spokane", "address" : "2514 W Dean Ave"}], "49" : [{"abbrev" : "WI", "zip" : "54476", "city" : "WEston", "address" : "5121 Pine St"}, {"abbrev" : "WI", "zip" : "54729", "city" : "Chippewa Falls", "address" : "14335 44th Ave"}, {"abbrev" : "WI", "zip" : "54739", "city" : "Elk Mound", "address" : "6117 34th St"}], "50" : [{"abbrev" : "WV", "zip" : "25405", "city" : "Martinsburg", "address" : "92 Stinson Ct"}, {"abbrev" : "WV", "zip" : "24970", "city" : "Ronceverte", "address" : "869 Masters Rd"}, {"abbrev" : "WV", "zip" : "25064", "city" : "Dunbar", "address" : "1904 Kanawha Ave"}], "51" : [{"abbrev" : "WY", "zip" : "83115", "city" : "Daniel", "address" : "8 S Kicking Birg"}, {"abbrev" : "WY", "zip" : "82009", "city" : "Cheyenne", "address" : "5002 Moran Ave"}, {"abbrev" : "WY", "zip" : "82718", "city" : "Gillette", "address" : "3725 Miranda Ave"}]}'
var addressObject = JSON.parse(addressArray);
var validAddress = addressObject[randomNumBetween(1, 51)][randomNumBetween(1, 3)];

/* ----------------------------------------------- */
var hasCoApp = hasCoApplicant();

$.ajax({
    url: 'http://api.randomuser.me/?nat=us',
    dataType: 'json',
    success: function (data) {
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

        if (confirm("Are you testing sales tax?")) {
            $("#StreetLine1").val(validAddress.address);
            $("#City").val(validAddress.city);
            $("#StateID").val(validAddress.abbrev);
            $("#PostalCode").val(validAddress.zip);
        }
        else {
            $("#StreetLine1").val(streetLine1);
            $("#City").val("Salt Lake City");
            $("#StateID").val("UT");
            $("#PostalCode").val(randomNumWithXDigits(5));
        };

        $("#CardholderName").val(firstName + ' ' + lastName);

        if (hasCoApp) {
            $('input[id=CoApplicant]').prop('checked', true).change();
            $("#HasCoApplicant").val(true);

            $.ajax({
                url: 'http://api.randomuser.me/?nat=us',
                dataType: 'json',
                success: function (coAppData) {
                    var coAppUser = coAppData.results[0].user;
                    var coAppFirstName = capitalizeFirstLetter(coAppUser.name.first);
                    var coAppLastName = capitalizeFirstLetter(coAppUser.name.last);
                    var coAppGeneratedEmail = coAppUser.email.replace(/ /g, "_");
                    var coAppEmail = coAppGeneratedEmail.replace("@example", (randomNumWithXDigits(3) + "@gmail"));

                    $("#CoApplicantFirstName").val(coAppFirstName);
                    $("#CoApplicantLastName").val(coAppLastName);
                    $("#CoApplicantEmailAddress").val(coAppEmail);
                }
            });

            $('input[id=SameApplicantAddress]').prop('checked', true).change();
            $("#SameAsApplicantAddress").val(true);
        }

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
$("#PrimaryPhone").val(randomPhone());
$("#SecondaryPhone").val(randomPhone());
$("#IsSecondaryPhoneCell").val(true);

if ($("#DriversLicenseRequired").val().toLowerCase() === "true") {
    $("#DriversLicenseNumber").val("DRIVERS-LICENSE-" + randomNumWithXDigits(7));
    $("#DriversLicenseState").val("UT");
}

$("#MonthlyIncome").val(randomNumBetween(2, 15) * 1000);

// BANK & CARD INFO
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
    var openMonth = appendLessThan10(randomNumBetween(1, 5));
    var openYear = appendLessThan10(randomNumBetween(year - 2010, year - 2001));
    $("#AccountOpenDate").val(openMonth + "/" + openYear);

} else {
    $("#AccountNumber").val('');
    $("#RoutingNumber").val('');
    $("#BankName").val('');
    $("#AccountOpenDate").val('');
}

if (cardInfoReq) {
    $("#CardholderName").val($("#FirstName").val() + ' ' + $("#LastName").val());
    $("#CardNumberEntry, #CardNumber").val(randomValidCC("4" + randomNumBetween(10000000000000, 99999999999999).toString()));
    $("#ExpirationMonth").val(appendLessThan10(randomNumBetween(1, 12)));
    $("#ExpirationYear").val(randomNumBetween(2016, 2019));

} else {
    $("#CardholderName").val('');
    $("#CardNumberEntry").val('');
    $("#ExpirationMonth").val('');
    $("#ExpirationYear").val('');
}


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
var hireYear = appendLessThan10(randomNumBetween(year - 2010, year - 2001));
$("#HireDate").val(hireMonth + "/" + hireDay + "/" + hireYear);
$("#LastPayDate").val(month + "/01/" + year);
$("#NextPayDate").val(month + "/15/" + year);
$("#PayPeriodTypeID").val(3);

//COAPPLICANT INFO
if (hasCoApp) {
    $("#CoApplicantEmployerName").val("MgRonald's");
    var coHireDay = appendLessThan10(randomNumBetween(1, 28));
    var coHireMonth = appendLessThan10(randomNumBetween(1, 12));
    var coHireYear = appendLessThan10(randomNumBetween(year - 2010, year - 2001));
    $("#CoApplicantHireDate").val(coHireMonth + "/" + coHireDay + "/" + coHireYear);
    var coDobYear = randomNumBetween(year - 70, year - 21);
    var coDobMonth = appendLessThan10(randomNumBetween(1, 12));
    var coDobDay = appendLessThan10(randomNumBetween(1, 28)); //in case of Feb
    $("#CoApplicantDateOfBirth").val(coDobMonth + "/" + coDobDay + "/" + coDobYear);
    $("#CoApplicantSocialSecurityNumber").val(randomSocial());
    $("#CoApplicantMonthlyIncome").val(randomNumBetween(1, 5) * 1000);
    $("#CoApplicantPrimaryPhone").val(randomPhone());
    $("#CoApplicantSecondaryPhone").val(randomPhone());
    $("#CoApplicantPrimaryPhoneCell")[0].checked = true;
    $("#IsCoApplicantPrimaryPhoneCell").val(true);
}

//CLEAR COAPPLICANT INFO IF CHECKBOX BECOMES UNCHECKED
$("#CoApplicant").change(function () {
    if (!$("#CoApplicant").is(':checked')) {
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
        $("#CoApplicantPrimaryPhoneCell")[0].checked = false;
        $("#IsCoApplicantPrimaryPhoneCell").val(false);

        $("#SameApplicantAddress")[0].checked = false;
        $("#SameAsApplicantAddress").val(false);
        $("#CoApplicantStreetLine1").val('');
        $("#CoApplicantStreetLine2").val('');
        $("#CoApplicantCity").val('');
        $("#CoApplicantStateID [value='']").attr('selected', true);
        $("#CoApplicantPostalCode").val('');
    }
});

//UPDATE BANK & CARD INFO BASED ON THEIR DYNAMIC REQUIREMENTS
$("#BankAccount").change(function () {
    var month = appendLessThan10(randomNumBetween(1, 12));
    var year = randomNumBetween(2016, 2019);

    var firstName = $("#FirstName").val().toString();
    var lastName = $("#LastName").val().toString();

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
        $("#AccountNumberEntry").val('');
        $("#RoutingNumber").val('');
        $("#BankName").val('');
        $("#AccountOpenDate").val('');
    }

    if (cardInfoReq) {
        $("#CardholderName").val(firstName + ' ' + lastName);
        $("#CardNumberEntry").val("4111111111111111");
        $("#ExpirationMonth").val(month);
        $("#ExpirationYear").val(year + 2);
    } else {
        $("#CardholderName").val('');
        $("#CardNumberEntry").val('');
        $("#ExpirationMonth").val('');
        $("#ExpirationYear").val('');
    }
});