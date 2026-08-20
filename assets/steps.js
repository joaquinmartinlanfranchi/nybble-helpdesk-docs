document.querySelectorAll('[data-steps]').forEach(function(root){
  var tabs = root.querySelectorAll('.steps-tab');
  var panels = root.querySelectorAll('.steps-panel');
  var prev = root.querySelector('.steps-prev');
  var next = root.querySelector('.steps-next');
  var current = root.querySelector('[data-step-current]');
  var total = tabs.length;

  function show(n){
    tabs.forEach(function(t){
      var active = t.dataset.step === String(n);
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function(p){ p.classList.toggle('is-active', p.dataset.stepPanel === String(n)); });
    if(current) current.textContent = n;
    if(prev) prev.disabled = (n === 1);
    if(next) next.disabled = (n === total);
    root.dataset.current = n;
  }

  tabs.forEach(function(t){
    t.addEventListener('click', function(){ show(Number(t.dataset.step)); });
  });
  if(prev) prev.addEventListener('click', function(){ show(Math.max(1, Number(root.dataset.current || 1) - 1)); });
  if(next) next.addEventListener('click', function(){ show(Math.min(total, Number(root.dataset.current || 1) + 1)); });

  show(1);
});
