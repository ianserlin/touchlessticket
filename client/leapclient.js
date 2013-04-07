var rangeX = 400;
var rangeY = 300;
var offsetX = 200;
var offsetY = 120;

var motionTimeout = 350;
var selectionTimeout = 500;

//var leapOptions = {};
var leapOptions = {enableGestures: true};

var screenWidth = screen.width;
var screenHeight = screen.height;
var timeout = new Date().getTime();
var position = {};

var lastSelected;

function convertCoordinates(mmX, mmY) {
    var left = (mmX) + offsetX;
    var percentLeft = (100 * (left / rangeX));
    var top = (mmY - offsetY);
    var percentTop = 100 - (100 * (top / rangeY));
    return {x: percentLeft, y: percentTop};
}

Leap.loop(leapOptions, function (frame) {

    var handCount = frame.hands.length;

    if (handCount == 1) {
        $("#pointer").show();

        var hand = frame.hands[0];
        position = convertCoordinates(hand.palmPosition[0], hand.palmPosition[1]);
        Session.set('pointerPosition', position);

        if (new Date().getTime() - timeout > motionTimeout) {
            var fingers = hand.fingers.length;
            Session.set('fingers', fingers);
            timeout = new Date().getTime();

            if (fingers == 5) {
                showExpediterOverview();
            } else if (fingers < 2) {
                hit(position);
            } else {
                hideExpediterOverview();
            }
        }
    }

    if (handCount == 2) {
        //showExpediterOverview();
    }
    if (handCount == 0) {
        hideExpediterOverview();
        $("#pointer").hide();
    }

});

function hit(newPosition) {
    Session.set('hitTestPosition', JSON.stringify(newPosition));
    $('.ticket').each(function (index, element) {
        var $element = $(element);
        if ($element != lastSelected && $element.hitTest(
            (newPosition.x / 100) * screenWidth,
            (newPosition.y / 100) * screenHeight)) {
            $element.addClass('almostSelected');
            Meteor.setTimeout(function () {
                if ($element != lastSelected && $element.hitTest(
                    (getPosition().x / 100) * screenWidth,
                    (getPosition().y / 100) * screenHeight)) {
                    $('.ticket').removeClass('almostSelected');
                    selectTicket($element);
                    lastSelected = $element;
                } else {
                    $element.removeClass('almostSelected');
                }
            }, selectionTimeout);
        }
    });
}

function getPosition() {
    return position;
}
