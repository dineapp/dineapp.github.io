Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var ans0;
var ans1;
var ans2;
var ans3;
var ans4;
var ans5;
var ans6;
var ans7;
var ansArray;
var userID;
var currentUser = Parse.User.current();
var results = currentUser.get("quizResults")
var has_taken = results != undefined;

$(".ans0").click(function(){
	ans0 = " " + $(this).text();
	$(".ans0").css("display","none");
	$("#q0").css("display","none");
	$(".ans1").css("display","inline");
	$("#q1").css("display","inline");
});

$(".ans1").click(function(){
	ans1 = " " + $(this).text();
	$(".ans1").css("display","none");
	$("#q1").css("display","none");
	$(".ans2").css("display","inline");
	$("#q2").css("display","inline");
});

$(".ans2").click(function(){
	ans2 = " " + $(this).text();
	$(".ans2").css("display","none");
	$("#q2").css("display","none");
	$(".ans3").css("display","inline");
	$("#q3").css("display","inline");
});

$(".ans3").click(function(){
	ans3 =" " +  $(this).text();
	$(".ans3").css("display","none");
	$("#q3").css("display","none");
	$(".ans4").css("display","inline");
	$("#q4").css("display","inline");
});

$(".ans4").click(function(){
	ans4 =" " +  $(this).text();
	$(".ans4").css("display","none");
	$("#q4").css("display","none");
	$(".ans5").css("display","inline");
	$("#q5").css("display","inline");
});

$(".ans5").click(function(){
	ans5 =" " +  $(this).text();
	$(".ans5").css("display","none");
	$("#q5").css("display","none");
	$(".ans6").css("display","inline");
	$("#q6").css("display","inline");
});

$(".ans6").click(function(){
	ans6 =" " +  $(this).text();
	$(".ans6").css("display","none");
	$("#q6").css("display","none");
	$(".ans7").css("display","inline");
	$("#q7").css("display","inline");
});

/*$(".ans7").click(function(){
	ans7 =" " +  $(this).text();
	$(".ans7").css("display","none");
	$("#q7").css("display","none");
	$(".ans8").css("display","inline");
	$("#q8").css("display","inline");
});*/

$(".ans7").click(function(){
	ans7 =" " +  $(this).text();
	
	ansArray = [ans0, ans1, ans2, ans3, ans4, ans5, ans6, ans7];
	currentUser.set("quizResults",ansArray);
	currentUser.save(null, {
		success: function(user) {
			if (has_taken == true){
			 analytics.track("profile",{
				"answer0": ans0,
				"answer1": ans1,
				"answer2": ans3,
				"answer3": ans4,
				"answer4": ans5,
				"answer5": ans6,
				"answer6": ans7,
			});
    	window.location.href="../HTML/app.html"
    } else{
    	$("#new_user").css("display","inline");
    	$(".ans4").css("display","none");
		$("#q4").css("display","none");
    }
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});
});


