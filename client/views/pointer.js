Template.pointer.position = function () {
    return Session.get('pointerPosition');
};

Template.motionMetrics.hitTestPosition = function () {
    return Session.get('hitTestPosition');
};

Template.motionMetrics.fingers = function () {
    return Session.get('fingers');
};


