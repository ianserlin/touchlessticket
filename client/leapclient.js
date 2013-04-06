// Setup Leap loop with frame callback function
var controllerOptions = {
	enableGestures: true}
;

Leap.loop(controllerOptions, function(frame) {
	// Body of callback function
	var hands = frame.hands;
	if(hands && hands.length > 0){
		var pointables = hands[0].pointables;
		if(pointables && pointables.length > 0){
			var finger = pointables[0];
			console.log(finger.tipPosition[0], finger.tipPosition[1]);
		}
	}
})