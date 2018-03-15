$.fn.carrousel = function(options) {
  var settings = $.extend({
      'transitionSpeed': 3000,
      'snap': false
  }, options);

var $this = $(this);

$this.addClass('carrousel-slider-wrap');
$this.children('ul').addClass('carrousel-slider-group');
$this.find('li').addClass('carrousel-slide');

var $slide = $('.carrousel-slide'),
		$firstEl = $('.carrousel-slide:first'),
		$group = $('.carrousel-slider-group'),
		$wrap = $('.carrousel-slider-wrap');

var slideWidth = $slide.outerWidth(),
		slideHeight = $('.carrousel-slide').height(),
		slideCount = $slide.length,
		totalWidth = slideWidth * slideCount;

$group.width(totalWidth);
$wrap.height(slideHeight);
$wrap.wrap('<div class="carrousel-container"></div>');

if (!$group.find($firstEl).hasClass("carrousel-first")) {
    $group.find($firstEl).addClass("carrousel-first");
}

var transitionSnap = function() {
    var $firstEl = $group.find('.carrousel-first').html();
    $group.find('.carrousel-first').animate({
      'margin-left': '-' + slideWidth + 'px'
    }, function(){
     $group.append('<li class="carrousel-slide">' + $firstEl + '</li>');
     $(this).remove();
     $group.find('li:first').addClass("carrousel-first");
    });
  };

var transitionScroll = function() {
     var $firstEl = $group.find('.carrousel-first').html();
    $group.find('.carrousel-first').animate({
      'margin-left': '-' + slideWidth + 'px'
    }, settings.transitionSpeed, 'linear', function(){
     $group.append('<li class="carrousel-slide">' + $firstEl + '</li>');
     $(this).remove();
     $group.find('li:first').addClass("carrousel-first");
     transitionScroll();
    });
  };

if (settings.snap) {
    window.setInterval(transitionSnap, settings.transitionSpeed);
  } else {
    transitionScroll();
  }
}

window.addEventListener('load',function(){
  $('#carrousel').carrousel({
    'transitionSpeed': 2000,
    'snap': true
  });
});
