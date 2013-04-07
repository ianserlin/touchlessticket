Template.pointer.position = function () {
    return Session.get('pointerPosition');
};

Template.motionMetrics.fingers = function () {
    return Session.get('fingers');
};

Template.motionMetrics.lastSelected = function () {
    return Session.get('lastSelected');
};

Template.motionMetrics.selectedElement = function () {
    return Session.get('selectedElement');
};

