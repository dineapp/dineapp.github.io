Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var requestID = window.location.toString().split("?")[1];
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var created = currentUser.get('createdAt');
var response;
var has_reservation;
var requestor;
var requestorFN;
var requestorLN;
var requestorM;
var requestorID;
var id;
var test;
var rID;
var names = [];
var foods = [];
var images = [];
var ids = []; 
var optName = []; 
var optId1 = [];
var optionArray;
var response;
var Requests = Parse.Object.extend("Request");
var User = Parse.Object.extend("User");
var openRequests = new Parse.Query("Request");
openRequests.equalTo("objectId", requestID);
openRequests.include("diner");
openRequests.include("reservation");
openRequests.find({
  
  success: function(results) {
     for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      requestor =  object.get("diner");
      requestorFN = requestor.get("first_name");
      requestorLN = requestor.get("last_name");
      requestorID = requestor.id
      var restrictions = requestor.get("restrictions");
      var allergies = requestor.get("allergies");
      var quiz_results = requestor.get("quizResults");
      var request
      id = object.id;
      var date = setDate(object.get("date"));
      var party_size = object.get("party_size");
      var time = object.get("time");
      var preferences = object.get("preferences");
      var status = object.get("status");
      requestorM = requestor.get("email");
      var phone = requestor.get("phone");
      response = object.get("options");
      has_reservation = object.get("reservation");
      var info =object.get("other_info")
      var permision = requestor.get("permision")
      
        $("#request").append(
      "<h3>" + id +" - " + requestorLN + ", " + requestorFN + "</h3>"+
      "<h3><label>Time: </label>"+ "  " + date + ", " + time + "</h3><h3 id='status'><label>Status: </label>"+ "  " + status +  "</h3>"+
      "<h4><label>Preferences: </label>"+ "  " + preferences + "</h4>"+
      "<h4><label>Other Info:</label>"+ "  "+ info + "</h4>"+ 
      "<h4><label>Flavor Preferences:</label>"+ "  " + quiz_results + "</h4>"+
      "<h4><label>Dietary Restrictions:</label>"+ "  " +restrictions + "</h4>"+
      "<h4><label>Allergies:</label>"+ "  " +allergies  +"</h4>"+
      "<h4><label>Email:</label>"+ " " +requestorM + "</h4>"+
      "<h4><label>Phone:</label><span class='"+permision+"''>"+ " " + phone + "</span></h4>"+
      
      "<br>"
    );

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
    } else if (response != undefined && has_reservation == undefined){
        var Restaurant = Parse.Object.extend("Restaurant");
        var query = new Parse.Query(Restaurant);
        query.containedIn( "objectId" , response);
        query.find({
          success: function(results) {
              
             var optId = response;
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              optName[i] = object.get("name");
              optId1[i] = object.id;
      }

      $('#reservation').append(
        "<h3>Options:</h3>"+
        "<form id='reservation_creation' onsubmit='return createReservation()'>"+
        "<div  id='"+optName[0]+"_btn'>"+  
        "<input class='rest_options' name='restaurant' type='radio' id='"+optName[0] +"' value='"+optId1[0] +"'>"+optName[0] + "</input></div>"+
        "<div id='"+optName[1]+"_btn'>"+  
        "<input class='rest_options' name='restaurant'  type='radio' id='"+optName[1] +"' value='"+optId1[1] +"'>"+optName[1] + "</input></div>"+
        "<div id='"+optName[2]+"_btn'>"+  
        "<input class='rest_options' name='restaurant' type='radio' id='"+optName[2] +"' value='"+optId1[2] +"'>"+optName[2] + "</input></div>"+
        "<label>Date:</label><input type='date' id='res_date'>"+
        "<label>time:</label><input type='time' id='res_time'>"+
        "<label>Party Size:</label><input type='number' id='res_size'>"+
        "<label>Name on Reservation:</label><input type='text' id='res_name'>"+
        "<label>Reservation Source:</label><input type='text' id='res_source'><br>"+
        "<button id='reserve' type='submit'>Reserve</button>"+
        "</form>"
        )

    },
        error: function(error) {
          console.log("Error: " + error.code + " " + error.message);
        }

    })} else {
        $('#reservation').append(
          "<h1>This request has a reservation.</h1>")
}

             
      

      analytics.identify(requestorID, {
        "name": requestorFN + " " + requestorLN ,
        "email": requestorM,
        "id":  requestorID,
      });   

  }; 
},
  error: function(error) {
    // There was an error.
  }
});



var object1;

function getOptions (){
  optionArray =[$("#restaurant1_id").val(), $("#restaurant2_id").val(), $("#restaurant3_id").val() ]
  

  /*for (i = 0; i < optionArray.length; i++){
  rID = optionArray[i]*/
  var Restaurant = Parse.Object.extend("Restaurant");
  var query = new Parse.Query(Restaurant);
  query.containedIn( "objectId" , optionArray);
  query.find({
    success: function(results) {
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
      object1 = results[i];
      var name = object1.get("name");
      var food = object1.get("food");
      var picture = object1.get("picture");
      var oid = object1.get("objectId");

      names.push(name);
      foods.push(food);
      images.push(picture);
      ids.push(oid);
    }

       analytics.track('send_options', {
        "option1_name": names[0],
        "option2_name": names[1],
        "option3_name": names[2],
        "option1_food": foods[0],
        "option2_food": foods[1],
        "option3_food": foods[2],
        "option1_picture": images[0],
        "option2_picture": images[1],
        "option3_picture": images[2],
        "option1_id": optionArray[0],
        "option2_id": ids[1],
        "option3_id": ids[2],
        "request_id": id,
        "requestor_fn": requestorFN,
        "requestor_ln": requestorLN,
        "requestor_email": requestorM,
        "concierge": userFirstName,
        "concierge_email": userEmail,
      });

      
      updateStatus("Completed");
      saveOptions(optionArray);

       
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });



  
  return false
};


function statusChange(){
  var status = $(".status-select:checked").val();
  var item = $(".status-select:checked");
  var openRequests = new Parse.Query("Request");
  openRequests.equalTo("objectId", requestID);
  openRequests.first({
    
    success: function(results) {
      results.set("status", status);
      results.set("concierge", currentUser);
      results.save();
      item.attr('checked',false);

      analytics.track('status_change', {
        "requestor_fn": requestorFN,
        "requestor_ln": requestorLN,
        "requestor_email": requestorM,
        "concierge": userFirstName,
        "concierge_email": userEmail,
        "status": status,
        "request_id": id,
        "id": requestorID,


});


      $("#status").text(status);
      

      },
  error: function(error) {
    // There was an error.
  }
});

  return false
}

function updateStatus(new_status){
  var openRequests = new Parse.Query("Request");
  openRequests.equalTo("objectId", requestID);
  openRequests.first({
    
  success: function(results) {
    results.set("status", new_status);
    results.save();


    $("#status").text(new_status);
      

  },
  error: function(error) {
   console.log(error)
  }
});
}

function saveOptions(optArray){
  var openRequests = new Parse.Query("Request");
  openRequests.equalTo("objectId", requestID);
  openRequests.first({
    
  success: function(results) {
    results.set("options", optArray);
    console.log(optArray);
    results.save();

    $("reservation_input").remove();
    
    for (var i = 0; i < optArray.length; i++) {
      $("#reservation").append(
        "<h1>"+names[i]+"</h1>"
        )
     }

  },
  error: function(error) {
   console.log(error)
  }
});
}


function createReservation(){
  var restID = $(".rest_options:checked").val();
  var date = $("#res_date").val();
  var size = $("#res_size").val();
  var name = $("#res_name").val();
  var source = $("#res_source").val();
  var time = $("#res_time").val();
  var rest_name;
  var restaurant;
  var user;
  var Restaurant = Parse.Object.extend("Restaurant");
  var query = new Parse.Query(Restaurant);
  query.equalTo( "objectId" , restID);
  query.first({
    success: function(results) {
      restaurant = results;
      rest_name = results.get("name")
      var theRestaurant = new Parse.Query("User");
      openRequests.equalTo("objectId", rID);
      openRequests.first({
        success: function(results) {
          user = results;
          var Reservation = Parse.Object.extend("Reservation");
          var reservation = new Reservation();

          reservation.set("restaurant", restaurant);
          reservation.set("restaurant_name", rest_name);
          reservation.set("request", user);
          reservation.set("date", date);
          reservation.set("time", time);
          reservation.set("party_size", size);
          reservation.set("platform", source);
          reservation.set("reservation_name", name);
          reservation.set("diner", requestor);
          reservation.set("concierge", currentUser)
          reservation.save(null,{
            success: function(reservation){
              updateStatus("Confirmed");
              var openRequests = new Parse.Query("Request");
              openRequests.equalTo("objectId", requestID);
              openRequests.first({
                
              success: function(results) {
                results.set("reservation", reservation);
                 console.log(reservation);
                results.save();
                analytics.track('createReservation', {
                  "requestor_fn": requestorFN,
                  "requestor_ln": requestorLN,
                  "requestor_email": requestorM,
                  "concierge": userFirstName,
                  "concierge_email": userEmail,
                  "restaurant": rest_name,
                  "date": setDate(date),
                  "psize":size,
                  "source":source,
                  "under":name,
                  "request_id": id,
                  "id": requestorID,
              });

              },
                error: function(error) {
                 console.log(error)
                }
              });
            },
            error: function(reservation, error){
              console.log(error);
            }
          });
        },
        error: function(error) {
         console.log(error)
        }
      });

    },
    error: function(error) {
     console.log(error)
    }
  });
   
      
  

  return false
}



function setDate (rdate){
  var dd = rdate.slice(8,10);
  var mm = rdate.slice(5,7); //January is 0!
  var yyyy = rdate.slice(0,4);


  return rdate = mm+"/"+dd+"/"+yyyy;
};
 


  