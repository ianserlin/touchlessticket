Template.pointer.position = function () {
    return Session.get('pointerPosition');
};

Template.motionMetrics.gesture = function () {
    return Session.get('gesture');
};

Template.motionMetrics.fingers = function () {
    return Session.get('fingers');
};

