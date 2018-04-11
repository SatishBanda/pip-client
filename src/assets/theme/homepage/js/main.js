jQuery(function($) { 

  // settings
    var slidermain = $('.slidermain'); // class or id of carousel slider
  var $slide = 'li'; // could also use 'img' if you're not using a ul
  var $transition_time = 1000; // 1 second
  var $time_between_slides = 4000; // 4 seconds

  function slides(){
      return slidermain.find($slide);
  }

  slides().fadeOut();

  // set active classes
  slides().first().addClass('active');
  slides().first().fadeIn($transition_time);

  // auto scroll 
  $interval = setInterval(
    function(){
        var $i = slidermain.find($slide + '.active').index();

      slides().eq($i).removeClass('active');
      slides().eq($i).fadeOut($transition_time);

      if (slides().length == $i + 1) $i = -1; // loop to start

      slides().eq($i + 1).fadeIn($transition_time);
      slides().eq($i + 1).addClass('active');
    }
    , $transition_time +  $time_between_slides 
  );

});
$(function () {
    $('.custom-menu-primary').addClass('js-enabled'); $('.custom-menu-primary .hs-menu-wrapper').before('<div class="mobile-trigger"><i></i></div>');
    $('.custom-menu-primary .flyouts .hs-item-has-children > a').after(' <div class="child-trigger"><i></i></div>');
    $('.mobile-trigger').click(function () { $(this).next('.custom-menu-primary .hs-menu-wrapper').slideToggle(250); $('body').toggleClass('mobile-open'); $('.child-trigger').removeClass('child-open'); $('.hs-menu-children-wrapper').slideUp(250); return false; });
    $('.child-trigger').click(function () {
        $(this).parent().siblings('.hs-item-has-children').find('.child-trigger').removeClass('child-open'); $(this).parent().siblings('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250); $(this).next('.hs-menu-children-wrapper').slideToggle(250);
        $(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250); $(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.child-trigger').removeClass('child-open'); $(this).toggleClass('child-open'); return false;
    }); $(".blog .blog-sidebar .widget-type-google_search .hs-input").attr("placeholder", "Type your search here");
});





