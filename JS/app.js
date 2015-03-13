Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var name = currentUser.get("first_name");
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var created = currentUser.get('createdAt');
var Restaurant = Parse.Object.extend("Request");
var query = new Parse.Query(Restaurant);
query.equalTo("parent", currentUser);
query.notEqualTo("status","Completed");
query.find({
  success: function(results) {
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      $(".request_column").append(
        "<div class='trending_card'>"+
        "<h3 class='res_name'>"+ object.get("date") + " - " + object.get("status") +
        "</h3></div>"
        )
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});
var Reservation = Parse.Object.extend("Reservation");
var query = new Parse.Query(Reservation);
query.equalTo("diner", currentUser);
query.notEqualTo("date","Confirmed");
query.include("restaurant");

query.find({
  success: function(results) {
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      var restaurant = object.get("restaurant");
      var restaurant_name = restaurant.get("name");
      $(".reservation_column").append(
        "<div class='trending_card'>"+
        "<h3 class='res_name'>"+ object.get("date") + " - " + restaurant_name+ 
        "</h3></div>"
        )
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

$(".name").text(name);

$(".take_quiz").click(function(){
  window.location.href = "quiz.html";
});
$(".new_menu").click(function(){
  window.location.href = "new_request.html";
});
