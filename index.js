const events = {
  mouse: {
    altKey: e => e.altKey ? 'yes' : 'no',
    button: e => ['left', 'middle', 'right', 'back', 'forward'][e.button] + ' button',
    buttons: e => ['no', 'left', 'right', '?', 'middle', '?', '?', '?', 'back', '?', '?', '?', '?', '?', '?', '?', 'forward'][e.buttons] + ' button',
    clientX: e => e.clientX + 'px from viewport edge (excludes scroll)',
    clientY: e => e.clientY + 'px from viewport edge (excludes scroll)',
    ctrlKey: e => e.ctrlKey ? 'yes' : 'no',
    metaKey: e => e.metaKey ? 'yes' : 'no',
    movementX: e => e.movementX + 'px',
    movementY: e => e.movementY + 'px',
    offsetX: e => e.offsetX + 'px from self edge',
    offsetY: e => e.offsetY + 'px from self edge',
    pageX: e => e.pageX + 'px from document edge (includes scroll)',
    pageY: e => e.pageY + 'px from document edge (includes scroll)',
    region: e => e.region ? 'a canvas region' : 'no canvas region',
    relatedTarget: e => e.relatedTarget ? e.relatedTarget.tagName + ' element' : 'no element',
    screenX: e => e.screenX + 'px from monitor edge',
    screenY: e => e.screenY + 'px from monitor edge',
    shiftKey: e => e.shiftKey ? 'yes' : 'no',
    which: e => ['no', 'left', 'middle', 'right'][e.which] + ' button',
    // mozPressure = PointerEvent.pressure
    mozInputSource: e => ['unknown', 'mouse', 'pen', 'eraser', 'cursor', 'touch', 'keyboard'][e.mozInputSource],
    webkitForce: e => e.webkitForce ? e.webkitForce + ' (force touch)' : 'no force touch',
    x: e => e.x + 'px (= clientX)',
    y: e => e.y + 'px (= clientY)'
  },
  touch: {
    altKey: e => e.altKey ? 'yes' : 'no',
    changedTouches: e => e.changedTouches ? renderTouchList(e.changedTouches) : 'none',
    ctrlKey: e => e.ctrlKey ? 'yes' : 'no',
    metaKey: e => e.metaKey ? 'yes' : 'no',
    shiftKey: e => e.shiftKey ? 'yes' : 'no',
    targetTouches: e => e.targetTouches ? renderTouchList(e.targetTouches) : 'none',
    touches: e => e.touches ? renderTouchList(e.touches) : 'none',
    rotation: e => e.rotation ? e.rotation + 'deg' : 'none (2+ touches)',
    scale: e => e.scale ? e.scale : 'none (2+ touches)'
  },
  pointer: {
    pointerId: e => e.pointerId,
    width: e => e.width + 'px',
    height: e => e.height + 'px',
    pressure: e => '~' + Math.round(e.pressure * 100) + '%',
    tangentialPressure: e => '~' + Math.round(e.tangentialPressure * 100) + '%',
    tiltX: e => e.tiltX ? e.tiltX + 'deg' : 'none',
    tiltY: e => e.tiltY ? e.tiltY + 'deg' : 'none',
    twist: e => e.twist ? e.twist + 'deg' : 'none',
    pointerType: e => e.pointerType || 'none',
    isPrimary: e => e.isPrimary ? 'yes' : 'no'
  }
};

function renderTouchList(touches) {
  let result = touches.length + ' touches<br />';
  for (const touch of touches) {
    result += `screen: ${t.screenX}, ${t.screenY} |`;
    result += `client: ${t.clientX}, ${t.clientY} |`;
    result += `page: ${t.pageX}, ${t.pageY} |`;
    result += `target: ${t.target ? 'some' : 'none'}`;
    result += '<br />';
  }

  return result;
}

const variants = {
  mouse: ['down', 'move', 'up', 'enter', 'leave'],
  touch: ['down', 'move', 'up'],
  pointer: ['down', 'move', 'up']
}

const attachedEvents = [];
function resetEvents() {
  for (const attachedEvent of attachedEvents) {
    window.removeEventListener(attachedEvent.event, attachedEvent.listener);
  }

  attachedEvents.splice(0, attachedEvents.length);

  for (const event in events) {
    if (!document.getElementById(event + 'Input').checked) {
      continue;
    }

    const props = events[event];
    for (const variant of variants[event]) {
      const listener = e => {
        for (const prop in props) {
          const value = props[prop](e);
          document.getElementById(event + '.' + prop).innerHTML = value;
        }
      };

      window.addEventListener(event + variant, listener, { passive: true });
      attachedEvents.push({ event: event + variant, listener });
    }
  }
}

window.addEventListener('load', () => {
  for (const event in events) {
    const eventDetails = document.createElement('details');
    eventDetails.open = true;
    const eventSummary = document.createElement('summary');
    const eventInput = document.createElement('input');
    eventInput.type = 'checkbox';
    eventInput.checked = true;
    eventInput.id = event + 'Input';
    eventInput.addEventListener('change', resetEvents);
    eventSummary.append(eventInput);
    const eventA = document.createElement('a');
    eventA.textContent = event;
    eventA.href = `https://developer.mozilla.org/en-US/docs/Web/API/${event}Event`;
    eventA.target = 'blank';
    eventSummary.append(eventA);
    eventDetails.append(eventSummary);
    const eventTable = document.createElement('table');
    const props = events[event];
    for (const prop in props) {
      const propTr = document.createElement('tr');
      const nameTh = document.createElement('th');
      const nameA = document.createElement('a');
      nameA.textContent = prop;
      nameA.href = `https://developer.mozilla.org/en-US/docs/Web/API/${event}Event/${prop}`;
      nameA.target = 'blank';
      nameTh.append(nameA);
      propTr.append(nameTh);
      const valueTd = document.createElement('td');
      valueTd.id = event + '.' + prop;
      propTr.append(valueTd);
      eventTable.append(propTr);
    }

    eventDetails.append(eventTable);
    document.body.append(eventDetails);
  }

  resetEvents();
});
