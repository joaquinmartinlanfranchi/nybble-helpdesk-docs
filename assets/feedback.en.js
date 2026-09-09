(function () {
  // Same Apps Script Web App endpoint as the Spanish version (ends in /exec).
  var GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7VAU_e4UNb-dry-XYM15LGR8SwHJvPcY-kO5zkA3AJAI3SqwVSPqllSHkonnStKfK/exec";

  var form = document.getElementById('feedback-form');
  if (!form) return; // this page has no feedback form

  var textarea = document.getElementById('feedback-text');
  var counter = document.getElementById('feedback-count');
  var submitBtn = document.getElementById('feedback-submit');
  var status = document.getElementById('feedback-status');
  var MAX = 2000;

  textarea.addEventListener('input', function () {
    counter.textContent = textarea.value.length + ' / ' + MAX;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = textarea.value.trim();
    if (!text) return;

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.indexOf('REEMPLAZAR') === 0) {
      status.textContent = 'The form is not connected to a destination yet. Let Joaquín know.';
      status.className = 'mini err';
      return;
    }

    submitBtn.disabled = true;
    status.textContent = 'Sending…';
    status.className = 'mini';

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script doesn't respond with CORS headers; we can't read the response, only confirm it went out.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        feedback: text,
        page: location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    })
      .then(function () {
        status.textContent = 'Thanks! Your feedback was recorded.';
        status.className = 'mini ok';
        form.reset();
        counter.textContent = '0 / ' + MAX;
        submitBtn.disabled = false;
      })
      .catch(function () {
        status.textContent = 'Could not send it. Please try again in a bit.';
        status.className = 'mini err';
        submitBtn.disabled = false;
      });
  });
})();
