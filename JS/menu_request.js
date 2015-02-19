Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();




var ref = new Firebase("https://blinding-fire-7221.firebaseio.com/requests");

ref.on("child_added", function(request) {
  var newRequest = request.val(); 
  var email = newRequest.sender_field_address;
  var name = newRequest.sender_field_name;
  var restaurant_name = newRequest.restaurant_text;
  var date = newRequest.reservation_date_text;
  var status = newRequest.status;
  var id = newRequest.id;
  var request_array = [restaurant_name, date];

  $("#request_list").append(
    "<div class='request'>"+
      "<a href='menu_request.html?"+ id +"''><h3>"+ name + "</h3></a>"+
      "<h3>"+ restaurant_name + "</h3><br>"+
      "<h4>"+ date + "</h4><h4>"+ status + "</h4></div><br>"
    );

};

  