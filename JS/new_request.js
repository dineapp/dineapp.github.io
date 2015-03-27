Parse.initialize("RnRYjP71R4vP3HiQoApoBIYK6WZbqre87TLSMFtv", "euBHIslJrC2Xa5y0tuJNl1iVZTPXmGBqcKyyga6j");
var currentUser = Parse.User.current();
var name = currentUser.get("first_name");
var userEmail = currentUser.get("email");
var userFirstName = currentUser.get("first_name");
var userLastName = currentUser.get("last_name");
var userID = currentUser.id;
$(".name").text(name);
var date = new Date();
var month = date.getMonth();
var day = date.getDate();
var year = date.getFullYear();
var minDate = year + "-" + month + "-" + day;
var rans0;
var rans1;
var rans2;
var rans3;
var rans4;
var other;
var rAnswerArray;
var rdate;
var rppl;
var rtime1;
var rtime2;
var rtime;
var userID =  currentUser.id;



$("#rdate").attr("min", minDate);
function requesting(){
	rdate = $("#rdate").val();
	rppl = $("#rppl").val();
	rtime1 = Number($("#time1").val());
	rtime2 = Number($("#time2").val());
	rtime= rtime1 + "-" + rtime2;

		if (rtime1 > rtime2 || rtime2 < rtime1 + 2) {

			$("#request_input").prepend("<div class='alert alert-warning alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>Please ensure there is at least a 2 hour difference between the beginning and ending of your time range.</div>")
		} else{
			$("#request_input").css("display","none");
			$(".rans0").css("display", "inline");
			$("#rq0").css("display","flex");
		}
	

	return false
}

$(".rans0").click(function(){
	rans0 = " " + $(this).text();
	$(".rans0").css("display","none");
	$("#rq0").css("display","none");
	$(".rans1").css("display","inline");
	$("#rq1").css("display","flex");
});

$(".rans1").click(function(){
	rans1 = " " + $(this).text();
	$(".rans1").css("display","none");
	$("#rq1").css("display","none");
	$(".rans2").css("display","inline");
	$("#rq2").css("display","flex");
});

$(".rans2").click(function(){
	rans2 = " " + $(this).text();
	console.log(rans2);
	$(".rans2").css("display","none");
	$("#rq2").css("display","none");
	$(".rans3").css("display","inline");
	$("#rq3").css("display","flex");
});

$(".rans3").click(function(){
	rans3 = " " + $(this).text();
	console.log(rans3);
	$(".rans3").css("display","none");
	$("#rq3").css("display","none");
	$(".rans4").css("display","inline");
	$("#rq4").css("display","flex");
});

$(".rans4").click(function(){
	rans4 = " " + $(this).text();
	$(".rans4").css("display","none");
	$("#rq4").css("display","none");
	$("#rabox5").css("display","inline");
});

$("#submit").click(function(){
	other = $("#other-inpt").val();
	rAnswerArray = [rans0, rans1, rans2, rans3, rans4];
	console.log(rAnswerArray + " " + rppl + " " + rtime + " " + rdate + " " + userID)
	var Request = Parse.Object.extend("Request");
	var request = new Request();
	request.set("date", rdate);
	request.set("time",rtime);
	request.set("party_size", rppl);
	request.set("preferences",rAnswerArray);
	request.set("status","Pending");
	request.set("other_info",other);
	request.set("diner", currentUser);

	request.save(null, {
		success: function(request) {
			analytics.track("new_request",{
				"date": rdate,
				"time": rtime,
				"party_size": rppl,
				"other_info":other,
				"preferences": rAnswerArray,
				"status": "Pending"
			});
    	$("#rabox5").css("display","none");
    	$(".confirmation").css("display","inline");
  },
  error: function(request, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});
});
