$("#continue-btn").click(function(){
	$("#welcome_all").css("display","none");
	$("#phone_permisions").css("display","block");
})

$("#phone_submit").click(function(){
	var phone1 = $("#phone1").val();
	var phone2 = $("#phone2").val();
	var phone3 = $("#phone3").val();
	var phone = "(" + phone1 + ")-" + phone2 + "-" + phone3;
	var permision = document.getElementById("permision").checked;
	if (phone1 != ""  && phone1 != ""  && phone1 != ""){
		if (permision ==true) {
			currentUser.set("permision", "Yes");
	} else if (permision == false){
		currentUser.set("permision","No");
	}
	currentUser.set("phone", phone);
	currentUser.save(null,{
    success: function(user){
     $("#intro").css("display","block");
	$("#phone_permisions").css("display","none");
    },
    error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  
  }	
})
}})

$("#continue2").click(function(){
	console.log(continue2)
	window.location = "restrictions.html"
})