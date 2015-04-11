Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var requestID = window.location.toString().split("?")[1];
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var robject;
var Restaurant = Parse.Object.extend("Restaurant");
var openRestaurants = new Parse.Query("Restaurant");
openRestaurants.equalTo("objectId", requestID);
openRestaurants.find({
  
  success: function(results) {
     for (var i = 0; i < results.length; i++) { 
      	var object = results[i];
      	robject = results[i];
      	var img_src = object.get("picture");
      	var name = object.get("name");
      	var food = object.get("food");
      	var address1 = object.get("Address1");
      	var address2 = object.get("Address2");
      	var price = object.get("price_range");
      	var desc = object.get("description");
        var rphone= object.get("phone");
        var rmenu = object.get("menu_url");
        var rweb = object.get("website");

      	$("#rname").text(name);
      	$(".background").attr("src",img_src);
      	$("#rline3").text(food +", " + price);
      	$("#raddress1").text(address1);
      	$("#raddress2").text(address2);
      	$("#rdesc").text(desc);
        $("#rphone").text(rphone);

        $(".infobox").append(
            "<a target='_blank' href='"+rmenu+"' id='rmenu'>Menu <span class='glyphicon glyphicon-new-window'></span></a>"+ 
            "<a target='_blank' href='"+rweb+"' id='rmenu'>Website <span class='glyphicon glyphicon-new-window'></span></a>"
          )
      }},
      error: function(error){
      	console.log(error);
      }
  });
