(function () {
  // Pegá acá la URL de tu Apps Script Web App (termina en /exec).
  var GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw7VAU_e4UNb-dry-XYM15LGR8SwHJvPcY-kO5zkA3AJAI3SqwVSPqllSHkonnStKfK/exec";

  var form = document.getElementById('feedback-form');
  if (!form) return; // esta página no tiene el formulario

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
      status.textContent = 'El formulario todavía no está conectado a destino. Avisale a Joaquín.';
      status.className = 'mini err';
      return;
    }

    submitBtn.disabled = true;
    status.textContent = 'Enviando…';
    status.className = 'mini';

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script no responde con headers CORS; no podemos leer la respuesta, solo confirmar que salió.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        feedback: text,
        page: location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    })
      .then(function () {
        status.textContent = '¡Gracias! Tu feedback quedó registrado.';
        status.className = 'mini ok';
        form.reset();
        counter.textContent = '0 / ' + MAX;
        submitBtn.disabled = false;
      })
      .catch(function () {
        status.textContent = 'No se pudo enviar. Probá de nuevo en un rato.';
        status.className = 'mini err';
        submitBtn.disabled = false;
      });
  });
})();
