$(document).ready(() => {
  var logo = $("#img-logo-fixed");
  $(document).scroll(function () {
    var scroll = $(document).scrollTop();
    if (scroll >= 300) $(logo).fadeIn();
    if (scroll < 146) $(logo).fadeOut();
  });
});