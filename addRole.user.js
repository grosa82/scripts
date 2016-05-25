(function() {
	'use strict';

	if($("a[href*='/Users/Edit/']")){
		if($("a[href*='/Users/Edit/']").text() == "Edit"){
			$("#content > p > a")[0].click();
		}
	}



  var fundingID = "'#checkbox_user_type_id_Funding'"
	var firstName = $("#FirstName").val();
	var lastName = $("#LastName").val();

	switch(firstName + " " + lastName){
		case "Britney Anderson":
			$(fundingID).prop("checked", false);
			$("#save-button").click();
			break;
			/*case "Regan Ashton":
					alert("THIS WORKS REGAN");
					break;
				case "Preston Chapman":
					alert("THIS WORKS PRESTON");
					break;
				case "Tyler Larisch":
					alert("THIS WORKS TYLER");
					break;
				case "Garret Reynolds":
					alert("THIS WORKS GARRET");
					break;
				case "Laura  Long":
					alert("THIS WORKS LAURA");
					break;
				case "Talarie Stewart":
					alert("THIS WORKS TALARIE");
					//$("#checkbox_user_type_id_Funding").prop("checked", false);
					break;
				case "Josh Wilsher":
					alert("THIS WORKS JOSH");
					break;*/
		default:
			alert("Why are you here?");
	}





})();
