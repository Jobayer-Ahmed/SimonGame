//variable
var usrSeq = [];
var simonSeq = [];
var id, clr, lvl = 0;
$(document).ready(function() {
	$(".start").click(function(){
		lvl++;
		startSequence();
	});
	$(".pad").click(function() {
		id = $(this).attr('id');
		color = $(this).attr("class").split(" ")[1];
		usrSeq.push(id);
		addClassSound(id, color);
		if (!usrCorrect()) {
			displayError();
			usrSeq = [];
		}
		if (usrSeq.length == simonSeq.length) {
			lvl++;
			usrSeq = [];
			startSequence();
		}
	});
});

function usrCorrect() {
	for (var i = 0; i < usrSeq.length; i++) {
		if (usrSeq[i] != simonSeq[i]) {
			return false;
		}
	}
	return true;
}

function displayError() {
	var counter = 0;
	var myError = setInterval(function() {
		$(".display").text("!!");
		counter++;
		if (counter == 3) {
			$(".display").text(lvl)
			clearInterval(myError);
			counter = 0;
		}
	},1000)
}

function startSequence() {
	$(".display").text(lvl);
	getRandomNum();
	var i = 0;
	var myInterval = setInterval(function() {
		id = simonSeq[i];
		color = $("#"+id).attr("class").split(" ")[1];
		addClassSound(id, color);
		i++;
		if (i == simonSeq.length) {
			clearInterval(myInterval)
		}
	}, 1000);
}

function getRandomNum() {
	var random = Math.floor(Math.random() * 4);
	simonSeq.push(random)
}

function addClassSound(id, color) {
	$("#"+id).addClass(color + "-active");
	setTimeout(function() {
		$("#"+id).removeClass(color + "-active");
	}, 500);
}