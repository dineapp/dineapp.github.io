Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var name = currentUser.get("first_name");
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var created = currentUser.get('createdAt');
var rdate;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = yyyy+"-"+mm+"-"+dd;
var Restaurant = Parse.Object.extend("Request");
var query = new Parse.Query(Restaurant);
query.equalTo("diner", currentUser);
query.notEqualTo("status","Completed");
query.greaterThanOrEqualTo("date", today)
query.find({
  success: function(results) {
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      rdate = object.get("date");
       

        var day = setDate(rdate);
      $(".request_column").append(
        "<div class='trending_card'>"+
        "<h3 class='res_name'>"+ day +  " - " + object.get("status") +
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
query.greaterThanOrEqualTo("date", today)
query.include("restaurant");
query.find({
  success: function(results) {
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      var restaurant = object.get("restaurant");
      var restaurant_name = restaurant.get("name");
      var restaurant_id = restaurant.id
      var object = results[i];
      rdate = object.get("date");
      
        var day = setDate(rdate);
      $(".reservation_column").append(
        "<div class='trending_card'>"+
        "<h3 class='res_name'>"+ day + " - <a href='../HTML/restaurant.html?" + restaurant_id +"'>"+ restaurant_name+ "</a>"+ 
        "</h3></div>"
        )
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
}); 


function setDate (rdate){
  var dd = rdate.slice(8,10);
  var mm = rdate.slice(5,7); //January is 0!
  var yyyy = rdate.slice(0,4);


  return rdate = mm+"/"+dd+"/"+yyyy;
};

$(".name").text(name);

$(".take_quiz").click(function(){
  window.location.href = "restrictions.html";
});
$(".new_menu").click(function(){
  window.location.href = "new_request.html";
});
