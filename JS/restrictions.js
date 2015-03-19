Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var restrictions = [];
var allergies =[];
var other_val1;
function getRestrictions(){
	$('input[name="restriction"]:checked').each(function() {
   restrictions.push(this.value)
});
	$('input[name="allergy"]:checked').each(function() {
   allergies.push(this.value)
});
	
	var other_val = $("#other_restriction").val();
	if (other_val !== "") {
		restrictions.push(other_val)
	};
		var other_val1 = $("#other_allergy").val();
	if (other_val1 !== "") {
		allergies.push(other_val1)
	};
	
	currentUser.set("restrictions",restrictions);
	currentUser.set("allergies",allergies)
	currentUser.save(null, {
		success: function(user) {
			analytics.track('dietary_restrictions', {
        	"restrictions":restrictions,
        	"allergies": allergies,
      });
    	window.location.href="../HTML/quiz.html"
  	},
  		error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});

	return false
}