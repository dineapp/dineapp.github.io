Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var Restaurant = Parse.Object.extend("Restaurant");
var query = new Parse.Query(Restaurant);
query.equalTo("open", true);
query.find({
  success: function(results) {
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      $(".trending_column").append(
        "<div class='trending_card'>"+
        "<h3 class='res_name'>"+ object.get("name") +
        "</h3></div>"
        )
    }
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});
var currentUser = Parse.User.current();
var name = currentUser.get("first_name");
$(".name").text(name);

$(".take_quiz").click(function(){
  window.location.href = "quiz.html";
});
$(".new_menu").click(function(){
  window.location.href = "new_request.html";
});
