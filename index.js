const events = {
  MouseEvent: [
    'altKey',
    'button',
    'buttons',
    'clientX',
    'clientY',
    'ctrlKey',
    'metaKey',
    'movementX',
    'movementY',
    'offsetX',
    'offsetY',
    'pageX',
    'pageY',
    'region',
    'relatedTarget',
    'screenX',
    'screenY',
    'shiftKey',
    'which',
    // 'mozPressure', -> PointerEvent.pressure
    'mozInputSource',
    'webkitForce',
    'x',
    'y'
  ],
  TouchEvent: [
    'altKey',
    'changedTouches',
    'ctrlKey',
    'metaKey',
    'shiftKey',
    'targetTouches',
    'touches',
    'rotation',
    'scale'
  ],
  PointerEvent: [
    'pointerId',
    'width',
    'height',
    'pressure',
    'tangentialPressure',
    'tiltX',
    'tiltY',
    'twist',
    'pointerType',
    'isPrimary'
  ]
};

window.addEventListener('load', () => {
  for (const event in events) {
    const eventDetails = document.createElement('details');
    eventDetails.open = true;
    const eventSummary = document.createElement('summary');
    eventDetails.append(eventSummary);
    const eventA = document.createElement('a');
    eventA.textContent = event;
    eventA.href = 'https://developer.mozilla.org/en-US/docs/Web/API/' + event;
    eventSummary.append(eventA);
    const eventTable = document.createElement('table');
    const props = events[event];
    for (const prop of props) {
      const propTr = document.createElement('tr');
      const nameTh = document.createElement('th');
      nameTh.textContent = prop;
      propTr.append(nameTh);
      const valueTd = document.createElement('td');
      valueTd.id = event + '.' + prop;
      propTr.append(valueTd);
      eventTable.append(propTr);
    }

    eventDetails.append(eventTable);
    document.body.append(eventDetails);

    for (const variant of ['down', 'move', 'up']) {
      window.addEventListener(event.slice(0, -'event'.length).toLowerCase() + variant, e => {
        for (const prop of props) {
          const value = e[prop];
          document.getElementById(event + '.' + prop).textContent = value;
        }
      }, { passive: true });
    }
  }
});
