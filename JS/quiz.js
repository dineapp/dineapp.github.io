Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var ans0;
var ans1;
var ans2;
var ans3;
var ans4;
var ansArray;
var userID;
var currentUser = Parse.User.current();
$(".ans0").click(function(){
	ans0 = $(this).text();
	console.log(ans0);
	$(".ans0").css("display","none");
	$("#q0").css("display","none");
	$(".ans1").css("display","inline");
	$("#q1").css("display","flex");
});

$(".ans1").click(function(){
	ans1 = $(this).text();
	console.log(ans1);
	$(".ans1").css("display","none");
	$("#q1").css("display","none");
	$(".ans2").css("display","inline");
	$("#q2").css("display","flex");
});

$(".ans2").click(function(){
	ans2 = $(this).text();
	console.log(ans2);
	$(".ans2").css("display","none");
	$("#q2").css("display","none");
	$(".ans3").css("display","inline");
	$("#q3").css("display","flex");
});

$(".ans3").click(function(){
	ans3 = $(this).text();
	console.log(ans3);
	$(".ans3").css("display","none");
	$("#q3").css("display","none");
	$(".ans4").css("display","inline");
	$("#q4").css("display","flex");
});

$(".ans4").click(function(){
	ans4 = $(this).text();
	console.log(ans4);
	$(".ans2").css("display","none");
	$("#q2").css("display","none");
	ansArray = [ans0, ans1, ans2, ans3, ans4];
	currentUser.set("quizResults",ansArray);
	currentUser.save(null, {
		success: function(user) {
    	window.location.href="../HTML/app.html"
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});
});


