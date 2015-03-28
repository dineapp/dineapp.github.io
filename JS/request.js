Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var requestID = window.location.toString().split("?")[1];
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var concierge;
var concierge_name;
var concierge_email;
var request;
var Restaurant = Parse.Object.extend("Request");
var openRestaurants = new Parse.Query("Request");
openRestaurants.equalTo("objectId", requestID);
openRestaurants.include("concierge");
openRestaurants.find({
  
  success: function(results) {
     for (var i = 0; i < results.length; i++) { 
      	var object = results[i];
      	request = results[i];
      	var day = setDate(object.get("date"));
      	var status = statusText(object.get("status"));
      	var stat = object.get("status");
      	var size = object.get("party_size");
      	var time = object.get("time");
      	concierge = object.get("concierge");
      	concierge_fname = concierge.get("first_name");
      	concierge_email = concierge.get("email");
      	concierge_picture = concierge.get("picture");
      	concierge_phone = concierge.get("phone");
      	concierge_name = concierge.get("first_name") + " "+ concierge.get("last_name");; 
      	var options = object.get("options");
      	var preferences = object.get("preferences");
      	var other = object.get("other_info")
      	var options = object.get("options")

      		$(".request_info").append(
      			"<div class='top'>"+
            "<div class='day_box'><div class='date'>"+"<div class='mdiv'><h3 class='month'>"+ day[0] +"</h3></div>"+
        		"<h2 class='day'>"+day[1]+"</h2><span class='time display1'></div>" + time+" PM </span></div>"+
            "<div class='status "+stat+"'><h3>"+status+"</h3></div>"+
        		"</div>"+
            "<div class='other-stuff'>"+
            "<h3>Request Details:</h3>"+
      			"<div class='details'><input type='number' id='size2' class='display2' value='"+size+"'><h5 class='diplay1'>"+size+" People</h5>"+
      			"<select id='time1' class='display2'>"+ 
			        "<option value='4:00'>4:00 PM</option>"+
			        "<option value='4:30'>4:30 PM</option>"+
			        "<option value='5:00'>5:00 PM</option>"+
			        "<option value='5:30'>5:30 PM</option>"+
			        "<option value='6:00'>6:00 PM</option>"+
			        "<option value='6:30'>6:30 PM</option>"+
			        "<option value='7:00'>7:00 PM</option>"+
			        "<option value='7:30'>7:30 PM</option>"+
			        "<option value='8:00'>8:00 PM</option>"+
			        "<option value='8:30'>8:30 PM</option>"+
			        "<option value='9:00'>9:00 PM</option>"+
			        "<option value='9:30'>9:30 PM</option>"+
			      "</select><span class='display2'> - </span>"+ 
			      "<select id='time2' class='display2'>"+
			        "<option value='5:00'>5:00 PM</option>"+
			        "<option value='5:30'>5:30 PM</option>"+
			        "<option value='6:00'>6:00 PM</option>"+
			        "<option value='6:30'>6:30 PM</option>"+
			        "<option value='7:00'>7:00 PM</option>"+
			        "<option value='7:30'>7:30 PM</option>"+
			        "<option value='8:00'>8:00 PM</option>"+
			        "<option value='8:30'>8:30 PM</option>"+
			        "<option value='9:00'>9:00 PM</option>"+
			        "<option value='9:30'>9:30 PM</option>"+
			        "<option value='10:00'>10:00 PM</option>"+
			        "<option value='10:30'>10:30 PM</option>"+
			      "</select>"+
      			"</div>"+
      			"<div class='preferences'><h4>"+preferences+"</h4></div>"+

      			"<div class='other'><h4><span class='notes'>Notes to the Concierge: </span><span class='display1'>"+other+"</span></h4>"+
      			"<input type='text' id='other2' class='display2' value='"+other+"'></div></div>"
			)

			if (concierge != undefined){
				$(".concierge_info").append(
					"<div class='concierge media'>"+
					"<div class='picture media-left'><img class='img-circle img img-responsive media-object' src='"+ concierge_picture +"'></div>"+
					"<div class='cname media-body'><h2 class='name'>"+ concierge_name + "</h2>"+
					"<div class='contact media-body'>Email: <a class='email' href='mailto:"+concierge_email+"?Subject=Request%20#:%20"+requestID+"'>"+concierge_email+"</a> <br> Phone: "+concierge_phone+"</div></div>"
					)
				$(".con_name").text(concierge_fname)
			};

			if (options != undefined) {

				var Restaurant = Parse.Object.extend("Restaurant");
				var openRestaurants = new Parse.Query("Restaurant");
				openRestaurants.containedIn("objectId", options);				openRestaurants.include("concierge");
				openRestaurants.find({
				  
				  success: function(results) {
				     for (var i = 0; i < results.length; i++) { 
				      	var object = results[i];
				      	var pic = object.get("picture");
				      	var name = object.get("name");
				      	var id = object.id
							$(".option_info").append(
                  "<a href='restaurant.html?"+id+"'><div class='b1'>"+
									"<div class='restaurant'><img class='restaurant restaurant-img img-circle' src='"+pic+"'>"+
									"</div><h3 class='rname'>"+name+"</h3></div></a>"
								)}
              },
      error: function(error){

      }
    });
      };
      }}})


$(".cancel").click(function(){
	request.destroy({
  success: function(myObject) {
  	analytics.track("request_deleted",{
				"requestID": requestID,
				"concierge_email":concierge_email	
			});
    window.location.href = "app.html"
  },
  error: function(myObject, error) {
  	console.log(error)
	
	  }
});
})

$(".edit").click(function(){
	$('.display1').css("display","none");
	$('.display2').css("display","inline");
	$('.edit').css("display","none");
  $('.cancel').css("display","none");
	$('.save').css("display","inline");
});

$(".save").click(function(){
	var size = $("#size2").val();
	var rtime1 = $("#time1").val();
	var rtime2 = $("#time2").val();
	var rtime= rtime1 + "-" + rtime2;
	var other = $("other2").val()
	return updateRequest(size, rtime, other);
})

function updateRequest(size, time, other){
	var openRestaurants = new Parse.Query("Request");
	openRestaurants.equalTo("objectId", requestID);
	openRestaurants.include("concierge");
	openRestaurants.first({
  
  success: function(results) {
     results.set("time",time);
     results.set("party_size", size);
     results.set("other_info", other);
     results.save(null,{
     	success: function(){
     		analytics.track("request_updated",{
				"time": rtime,
				"party_size": rppl,
				"other_info":other,
				"concierge_email": concierge_email
			});
     		location.reload()
     	},
     	error: function(error){
     		console.log(error)
     	}
     })},
      error: function(error){
      	console.log(error)
      }

})}

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


function statusText(status){
	
	switch (status) {
	    case "Pending":
	        status_txt = "Sit tight! We haven't gotten a chance to start on your request yet.";
	        break;
	    case "Received":
	        status_txt = "You're on your way to a great dining experience!  Yumm!";
	        break;
	    case "Completed":
	        status_txt =  "We've has found some great options for you! Check them out and let <span class='con_name'></span> know which looks the best, and they'll make a reservation for you.";
	        break;
	    	}
	    	
	        return status_txt
}