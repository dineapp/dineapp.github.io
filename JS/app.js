Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var name = currentUser.get("first_name");
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var created = currentUser.get('createdAt');
var rdate;
var rmonth;
var rday;
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
query.notEqualTo("status","Confirmed");
query.greaterThanOrEqualTo("date", today);
query.ascending("date");
query.find({
  success: function(results) {
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      rdate = object.get("date");
      var status = object.get("status");
      var id = object.id;

        var day = setDate(rdate);
      $(".request_column").append(
        "<a href='request.html?" + id +"'>"+
        "<div class='request_card'>"+
        "<div class='date'>"+"<h3 class='month'>"+ day[0] +"</h3>"+
        "<h2 class='day'>"+day[1]+"</h2></div>"+
        "<div class='status "+status+"'><h4 class='status_text'>"+status+"</h4></div>"+
        "</div></a>"
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
      var rpicture = restaurant.get("picture")
      var restaurant_id = restaurant.id
      var object = results[i];
      rdate = object.get("date");
      
        var day = setDate(rdate);
      $(".reservation_column").append(
        "<a href='restaurant.html?" + restaurant_id +"'>"+
        "<div class='reservation_card'>"+
         "<div class='restaurant'><img class='rpic' src='"+ rpicture+"'><h4 class='name'>"+restaurant_name+"</h4></div>"+
        "<div class='date1'>"+"<h4 class='month1'>"+ day[0] +"</h4>"+
        "<h3 class='day1'>"+day[1]+"</h3></div>"+
        "</div></a>"
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

  switch (mm) {
    case "01":
        mm = "January";
        break;
    case "02":
        mm = "February";
        break;
    case "03":
        mm = "March";
        break;
    case "04":
        mm = "April";
        break;
    case "05":
        mm = "May";
        break;
    case "06":
        mm = "June";
        break;
    case "07":
        mm = "July";
        break;
    case "08":
        mm = "August";
        break;
    case "09":
        mm = "September";
        break;
    case "10":
        mm = "October";
        break;
    case "11":
        mm = "November";
        break;
    case "12":
        mm = "December";
        break;
}
  rmonth = mm;
  rday = dd;

  return [mm, dd]
};

$(".name").text(name);

$(".logout").click(function(){
  Parse.User.logOut();
  console.log("logout");
  window.location.href ="../index.html"
})

