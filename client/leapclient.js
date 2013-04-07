var rangeX = 400;
var rangeY = 300;
var offsetX = 200;
var offsetY = 120;

var screenWidth = screen.width;
var screenHeight = screen.height;
var timeout = new Date().getTime();
var palmLocation = {};
var position = {};

function convertCoordinates(mmX, mmY) {
    var left = (mmX) + offsetX;
    var percentLeft = (100 * (left / rangeX));
    var top = (mmY - offsetY);
    var percentTop = 100 - (100 * (top / rangeY));
    return {x: percentLeft, y: percentTop};
}

Leap.loop({}, function (frame) {
    var hand = frame.hands[0];
    if (hand) {
        var fingers = hand.fingers.length;
        if (new Date().getTime() - timeout > 350) {
            Session.set('oldRadius', fingers);
            timeout = new Date().getTime();
            if (fingers < 2) {
                var newPosition = convertCoordinates(palmLocation.x, palmLocation.y);
                hit(newPosition);
            }
            palmLocation = {x: hand.palmPosition[0], y: hand.palmPosition[1]};
        }
        position = convertCoordinates(hand.palmPosition[0], hand.palmPosition[1]);
        Session.set('pointerPosition', position);
    }
});

function getPosition() {
    return position;
}

var lastSelected;

function hit(position) {
    Session.set('hitTestPosition', JSON.stringify(position));
    $('.ticket').each(function (index, element) {
        var $element = $(element);
        if ($element != lastSelected && $element.hitTest(
            (position.x / 100) * screenWidth,
            (position.y / 100) * screenHeight)) {
            $element.addClass('almostSelected');
            Meteor.setTimeout(function () {
                if ($element != lastSelected && $element.hitTest(
                    (getPosition().x / 100) * screenWidth,
                    (getPosition().y / 100) * screenHeight)) {
                    okActuallyDoIt($element);
                } else {
                    $element.removeClass('almostSelected');
                }
            }, 1000);
        }
    });
}

function okActuallyDoIt(element) {
    $('.ticket').removeClass('selected').removeClass('almostSelected');
    element.addClass('selected').removeClass('almostSelected');
    lastSelected = element;
}
