(function($)
	{
		$.fn.my_magicline = function()
		{
			var $my_el, my_leftPos, my_newWidth;
			this.append("<li><a id='magic-line'>&nbsp;</a></li>");
			var $magicLine = $("#magic-line");if($("li a.active", this).length > 0)
			{
				$magicLine.width($("li a.active", this).width())
				.css("left", $("li a.active", this).position().left)
				.data("origLeft", $("li a.active", this).position().left)
				.data("origWidth", $("li a.active", this).width());
			}
			else
			{
				$magicLine.width(0).css("left", 0).data("origLeft", 0).data("origWidth", 0);
			}
			$("li a", this).hover(function()
			{
				$my_el = $(this);
				my_leftPos = $my_el.position().left;my_newWidth = $my_el.width();$magicLine.stop().animate({left: my_leftPos,width: my_newWidth});
			},
			function(){$magicLine.stop().animate({left: $magicLine.data("origLeft"),width: $magicLine.data("origWidth")});})
		;}
	;})(jQuery);
	
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length} ;
  for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].classList.remove("active");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].classList.add("active");
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
  }
}


 function changeImage1() {
    var image = document.getElementById('myImage1');
    if (image.src.match("open")) {
        image.src = "images/triangle-close.gif";
    } else {
        image.src = "images/triangle-open.gif";
    }
}
 function changeImage2() {
    var image = document.getElementById('myImage2');
    if (image.src.match("open")) {
        image.src = "images/triangle-close.gif";
    } else {
        image.src = "images/triangle-open.gif";
    }
}
 function changeImage3() {
    var image = document.getElementById('myImage3');
    if (image.src.match("open")) {
        image.src = "images/triangle-close.gif";
    } else {
        image.src = "images/triangle-open.gif";
    }
}



	

