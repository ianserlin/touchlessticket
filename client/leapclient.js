// Setup Leap loop with frame callback function

function convertHorizontalMillimetersToScreenPercent(mm) {
    return mm;
}

function convertVerticalMillimetersToScreenPercent(mm) {
    return mm;
}

var rangeX = 400;
var rangeY = 150;
var offsetX = 200;
var offsetY = 150;

function convertCoordinates(mmX, mmY) {

    var left = (mmX * -1) + offsetX;
    var percentLeft = left / rangeX;

    var top = (mmY - offsetY) * -1;
    var bottom = offsetY + rangeY;
    var percentTop = top / bottom;

    return {x: percentLeft, y: percentTop};

}


var controllerOptions = {
    enableGestures: true
};

Leap.loop(controllerOptions, function (frame) {
    // Body of callback function
    var fingers = frame.fingers;
    if (fingers && fingers.length > 0) {
        var finger = fingers[0];
        // console.log(finger.tipPosition[0], finger.tipPosition[1]);
        if (finger) {
            var position = convertCoordinates(finger.tipPosition[0], finger.tipPosition[1]);
            // console.log(position);
            Session.set('pointerPosition', position);
            // console.log(finger.tipPosition);
        }
    }
})
