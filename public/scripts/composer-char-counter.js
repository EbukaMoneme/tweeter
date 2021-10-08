$(document).ready(function() {
  const text = $('#tweet-text');
  text.on('input', function() {
    let charCount = 140 - $(this).val().length;
    let counter = $(this).siblings().children().last();
    counter.text(charCount);
    if (charCount < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
});