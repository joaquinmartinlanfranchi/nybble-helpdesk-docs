(function(){
  var links = document.querySelectorAll('[data-lang-link]');
  links.forEach(function(a){ a.dataset.base = a.getAttribute('href'); });
  function sync(){
    links.forEach(function(a){ a.href = a.dataset.base + location.hash; });
  }
  sync();
  window.addEventListener('hashchange', sync);
})();
