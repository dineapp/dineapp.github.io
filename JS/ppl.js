Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
if (currentUser != undefined){
var userEmail1 = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var created = currentUser.get('createdAt');
}

function getPermision (user) {
	position = user.get("Position");
	if (position != "Concierge" || position != "Admin"){
		window.location.href = "../HTML/app.html"
	}
}