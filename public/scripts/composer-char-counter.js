$(document).ready(function() {
  $("textarea").keydown(function() {
    const textLength =($(this).val().length);
    let characterRemain =140 - textLength;
    const counter = $(this).parent().children().children(".counter");
    counter.text(characterRemain);
    if (characterRemain < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  })
})
