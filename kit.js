// Copy buttons on the media kit page.
// A button with data-copy="some-id" copies the text of that element.
(function () {
  var toast = document.getElementById('toast');
  var timer;

  function confirmCopy(button, label) {
    toast.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('on'); }, 1600);
    button.textContent = 'Copied';
    setTimeout(function () { button.textContent = label; }, 1600);
  }

  function copyText(text, source) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Older browsers: select the text and use execCommand.
    var range = document.createRange();
    range.selectNodeContents(source);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    return Promise.resolve();
  }

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var source = document.getElementById(button.dataset.copy);
      var label = button.textContent;
      copyText(source.innerText.trim(), source).then(function () {
        confirmCopy(button, label);
      });
    });
  });
})();
