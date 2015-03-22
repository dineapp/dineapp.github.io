Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var name = currentUser.get("first_name");
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
var username = currentUser.username;
var Phone = currentUser.get("phone")
var interPhone = currentUser.get("phone").toString()
var userPhone = interPhone.substr(0,3) + "-" + interPhone.substr(3,3)+ "-" + interPhone.substr(6,7)


$(".name").text(name);
$('#first_name').text(userFirstName);
$("#last_name").text(userLastName);
$("#email").text(userEmail);
$("#phone").text(Phone);
$("#edit_fn").val(userFirstName);
$("#edit_ln").val(userLastName);
$("#edit_email").val(userEmail);
$("#edit_pn").val(Phone)
$("#edit_pass").attr("placeholder","******")


$("#edit_details").click(function(){
$(".text").css("display", "none");
$(".editing").css("display","flex");
$("#edit_details").css("display","none")
$("#edit_details1").css("display","flex");

$("#edit_details1").click(function(){
  var update_fname = $("#edit_fn").val();
  var update_lname = $("#edit_ln").val();
  var update_email = $("#edit_email").val();
  var update_phone = $("#edit_pn").val();
  var update_pass = $("#edit_pass").val();

  currentUser.set("first_name", update_fname);
  currentUser.set("last_name", update_lname);
  currentUser.set("email", update_email);
  currentUser.set("username", update_email);
  //currentUser.set("phone", update_phone);
  currentUser.set("password",update_pass)
  currentUser.save(null,{
    success: function(user){
     location.reload()
    },
    error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
  })
})      

}

);


