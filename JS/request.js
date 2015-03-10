Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var user = [];
var Requests = Parse.Object.extend("Request");
var User = Parse.Object.extend("User");
var openRequests = new Parse.Query("Request");
openRequests.notEqualTo("status", "Confirmed");
openRequests.include("parent");
openRequests.include("[parent.first_name]");
openRequests.find({
  
  success: function(results) {
     for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      var user = object.get("parent");
      var first_name = user.get("first_name");
      var last_name = user.get("last_name");
      var id = object.id;
      var date = object.get("date");
      var party_size = object.get("party_size");
      var time = object.get("time");
      var preferences = object.get("preferences");
      var status = object.get("status");
      
        $("#request_list").append(
      "<div class='request'>"+
      "<a href='menu_request.html?"+ id +"'>"+"<h3 id='name'>" + last_name + ", " + first_name + "</h3></a>"+
      "<h4>"+ date + " " + time + "</h4><h4>"+ status +  "</h4></div><br>"
    );
      };     
},
  error: function(error) {
    // There was an error.
  }
});



 

