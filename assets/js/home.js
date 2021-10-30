// Based on gist: https://gist.github.com/cferdinandi/2218858af04d5306904fe57c184fc17a

// Get the compiled markdown container
var compiled = document.querySelector('#compiled-markdown');

// Listen for changes to inputs and textareas
document.addEventListener(
  'input',
  function (event) {
    // Only run if the change happened in the #editor
    if (!event.target.matches('#editor')) return;

    compiled.innerHTML = marked(DOMPurify.sanitize(event.target.value));
  },
  false
);
