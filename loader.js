
function revealBranding() {
    var elementS = document.getElementById('shuja-s');
    var elementRest = document.getElementById('shuja-rest');
    var overlay = document.getElementById('syed-loader-overlay');

    if (elementS && elementRest && overlay) {
      setTimeout(function() {
        elementS.classList.add('shift-left');
      }, 400);

      setTimeout(function() {
        elementRest.classList.add('reveal-active');
      }, 550);

      setTimeout(function() {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
      }, 2100);
    }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', revealBranding, { once: true });
} else {
  revealBranding();
}
