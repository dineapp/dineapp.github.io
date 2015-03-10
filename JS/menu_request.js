Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var requestID = window.location.toString().split("?")[1];
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var created = currentUser.get('createdAt');
var response;
var requestor;
var requestorFN;
var requestorLN;
var requestorM;
var id;
var Requests = Parse.Object.extend("Request");
var User = Parse.Object.extend("User");
var openRequests = new Parse.Query("Request");
openRequests.equalTo("objectId", requestID);
openRequests.include("parent");
openRequests.find({
  
  success: function(results) {
     for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      requestor =  object.get("parent");
      requestorFN = requestor.get("first_name");
      requestorLN = requestor.get("last_name");
      var quiz_results = requestor.get("quizResults");
      var request
      id = object.id;
      var date = object.get("date");
      var party_size = object.get("party_size");
      var time = object.get("time");
      var preferences = object.get("preferences");
      var status = object.get("status");
      requestorM = requestor.get("email");
      var phone = requestor.get("phone");
      var response = object.get("reservation")

      
        $("#request").append(
      "<div class='request'>"+
      "<h4>"+ date + " " + time + "</h4><h4 id='status'>"+ status +  "</h4>"+
      "<h4>"+ preferences + "</h4>"+
      "</div><br>"
    );
        $("#user").append(
      "<div class='request'>"+
      "<h3 id='name'>" + requestorLN + ", " + requestorFN + "</h3>"+
      "<h4>"+ requestorM + ", " + phone + "</h4>"+
      "<h4>"+ quiz_results + "</h4>"+
      "</div><br>"
    );

         
      };     
},
  error: function(error) {
    // There was an error.
  }
});

if (response == undefined){
  $("#reservation").append(
    "<form id='response_input' onsubmit='return getOptions()''>"+
    "<label>Option 1:</label><input type='text' id='restaurant1_id'"+
    "placeholder='restaurant id' class='option-input'><br>"+
    "<label>Option 2:</label><input type='text' id='restaurant2_id'"+
    "placeholder='restaurant id'class='option-input'><br>"+
    "<label>Option 3:</label><input type='text' id='restaurant3_id'"+
    "placeholder='restaurant id'class='option-input'><br>"+
    "<button id='reserve'>reserve</button>"
    )
} else{
  $('#reservation').css("background", "red")
}

function sendTheMail(){
  analytics.track('sendTheMail', {
  plan: 'Enterprise'
});
}
  

function getOptions (){
  var optionArray =[$("#restaurant1_id").val(), $("#restaurant2_id").val(), $("#restaurant3_id").val() ]
  var rID;
  var names = [];
  var foods = [];
  var images = [];
  var ids = [];

  /*for (i = 0; i < optionArray.length; i++){
  rID = optionArray[i]*/
  var Restaurant = Parse.Object.extend("Restaurant");
  var query = new Parse.Query(Restaurant);
  query.containedIn( "objectId" , optionArray);
  query.find({
    success: function(results) {
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      var name = object.get("name");
      var food = object.get("food");
      var picture = object.get("picture");
      var oid = object.get("objectId");

      names.push(name);
      foods.push(food);
      images.push(picture);
      ids.push(oid);
    }
      console.log(names + " " + foods +  " " + ids + " " + images)

       analytics.track('send_options', {
        "option1.name": names[0],
        "option2.name": names[1],
        "option3.name": names[2],
        "option1.food": foods[0],
        "option2.food": foods[1],
        "option3.food": foods[2],
        "option1.picture": images[0],
        "option2.picture": images[1],
        "option3.picture": images[2],
        "option1.id": optionArray[0],
        "option2.id": ids[1],
        "option3.id": ids[2],
        "request_id": id,
        "requestor_fn": requestorFN,
        "requestor_ln": requestorLN,
        "requestor_email": requestorM,
});
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });



  
  return false
};


function status_change(){
  var status = $(".status-select:checked").val();
  var item = $(".status-select:checked");
  var openRequests = new Parse.Query("Request");
  openRequests.equalTo("objectId", requestID);
  openRequests.first({
    
    success: function(results) {
      results.set("status", status);
      results.save();
      item.attr('checked',false);

      analytics.track('status_change', {
        "requestor_fn": requestorFN,
        "requestor_ln": requestorLN,
        "requestor_email": requestorM,
        "status": status,
        "request_id": id,
        "id": userID,

});
      

   
    _cio.track("status_change", {
        "requestor_fn": requestorFN,
        "requestor_ln": requestorLN,
        "requestor_email": requestorM,
        "status": status,
        "request_id": id,
        "id": userID,

});

      $("#status").text(status);
      

      },
  error: function(error) {
    // There was an error.
  }
});

  return false
}



 


  