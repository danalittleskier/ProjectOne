
//trigger for dropdown
$('.dropdown-trigger').dropdown();

//makes the dropdown select work
$(document).ready(function () {
  $('select').formSelect();
});


$(document).ready(function(){
  $('.collapsible').collapsible();
});

$(document).on("scroll", function(){
  if
    ($(document).scrollTop() > 100){
    $("header").addClass("shrink");
  }
  else
  {
    $("header").removeClass("shrink");
  }
});




