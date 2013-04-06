// Setup Leap loop with frame callback function

function convertHorizontalMillimetersToScreenPercent(mm){
	return mm;
}

function convertVerticalMillimetersToScreenPercent(mm){
	return mm;
}

var controllerOptions = {
	enableGestures: true
};

Leap.loop(controllerOptions, function(frame) {
	// Body of callback function
	var fingers = frame.fingers;
	if(fingers && fingers.length > 0){
		var finger = fingers[0];
		// console.log(finger.tipPosition[0], finger.tipPosition[1]);
		if(finger){
			var position = {
				x: convertHorizontalMillimetersToScreenPercent(finger.tipPosition[0])
				, y: convertVerticalMillimetersToScreenPercent(finger.tipPosition[1])
			};
			// console.log(position);
			Session.set('pointerPosition', position);
			console.log(finger.tipPosition);
		}
	}
})