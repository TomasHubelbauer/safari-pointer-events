window.addEventListener('load', () => {
  /* Note that `document.body` doesn't span the whole viewport by default but `document` does */

  document.addEventListener('mousemove', event => {
    document.getElementById('mouseDiv').textContent = `mouse: ${event.clientX} (${event.movementX}) ✕ ${event.clientY} (${event.movementY}) - ${event.buttons}`;
    event.preventDefault();
    event.stopPropagation();
    return false;
  });

  document.addEventListener('pointermove', event => {
    document.getElementById('pointerDiv').textContent = `pointer: ${event.clientX} (${event.movementX}) ✕ ${event.clientY} (${event.movementY}) - ${event.buttons}`;
    event.preventDefault();
    event.stopPropagation();
    return false;
  });

  document.addEventListener('touchmove', event => {
    document.getElementById('touchDiv').textContent = 'touch: ' + [...event.touches].map(t => `${t.clientX.toFixed(0)} (${t.radiusX.toFixed(0)}) ✕ ${t.clientY.toFixed(0)} (${t.radiusY.toFixed(0)})`).join(', ');
    event.preventDefault();
    event.stopPropagation();
    return false;
  }, { passive: false });
});
