// Carousel Widget, by Raul Galindo
// rgalindo33@gmail.com
//  oct 2013


// Creates an Inbox widget that contains two Carousels, an upper brand navigation
// messages on the bottom.
//
// USAGE:
// Call CarouselWidget.init() To start the Widget
//      CarouselWidget.centerCarousel() can be called anytime to place it 
// on the very middle of the screen
//
//  DEPENDENCIES:
//
//  - jQuery
//  - Mobify Scooch ( formerly known as Carousel)  https://github.com/mobify/scooch
//
// TODOS:
//  - Pass all dependencies to a constructor, avoiding such DOM dependency??
//  - Create a jQuery plugin?
//
// ==========================

var CarouselWidget = (function(){

  var settings = {
    mainNavigationHeight: 50,
    sizeAvailable:        0,
    inboxNavigation:      $(".inbox-navigation-container"),
    body:                 $("body"),
    carouselContent:      $('.m-carousel'),
    carouselNavigation:   $('.m-carousel-navigation'),
    mainSection:          $(".main-section")
  },
  widget = {};

  // PUBLIC METHODS

  widget.init = function() {

    createCarousel();

  };

  widget.centerCarousel = function() {
  //This function is called every time a Orientation change or window resize is called

    $.doTimeout("nose",300,function(){  
      fixCarouselDisplayedItem();
      centerCarouselNavigation();
      resizeCarouselItem();
      centerCarouselVertically();
    });

  };
  
 // PRIVATE METHODS
  function createCarousel() {
    // Initialize both Carousels, content and upper navigation
    settings.carouselContent.carousel();  
    settings.carouselNavigation.carousel();

    widget.centerCarousel();

    addClickNavigationBehaviour();

    settings.carouselContent.on("afterSlide", function(e, prev, next){
      settings.carouselNavigation.carousel('move',next);
    });
  }

  function centerCarouselNavigation() {
  // Places the carousel navigation so that the selected item is always on the middle
    var factor = (settings.body.width()/2) - ($(".m-item").first().width()/2);

    settings.carouselNavigation.css("padding-left", factor);
  }

  function resizeCarouselItem() {
    // Give the image the maximun width it can take while being fully visible
    $(".inbox-messages a>img").css("max-width", settings.inboxNavigation.width())

    //we do the same with but vertically
    //calculate how much space we have for the image, vertically

    settings.sizeAvailable = settings.body.height() - settings.inboxNavigation.height() - settings.mainNavigationHeight;

    // set the image size for resizing 
    settings.imageHeight = settings.sizeAvailable - 42; //42 pixels is what a two rows text would take

    $(".inbox-messages a>img").css("max-height",settings.imageHeight);
  }

  function fixCarouselDisplayedItem() {
  //this function scrolles the carousel to the right index, which can be displaced when rotating the device or 
  //resizing the window
    settings.carouselContent.carousel("repair");
  }

  function centerCarouselVertically() {
  //make sure that the carousel item is always on the center of the container so that it doesnt leave white spaces on top or bottom
    $.doTimeout("verticalAlign", 500, function(){

      var margin = ((settings.sizeAvailable - settings.carouselContent.height())/2-21);

      if (margin>0){
        settings.carouselContent.css("margin-top", margin);
      } else {
        settings.carouselContent.css("margin-top", 0);
      }
    });

  }

  function addClickNavigationBehaviour() {

    $(".inbox-navigation li").click(function(e){
      settings.carouselContent.carousel("move", $(this).index()+1);    
    });

    $(".inbox-navigation-controller.prev").click(function(e){  
      settings.carouselContent.carousel("prev");
    });
    $(".inbox-navigation-controller.next").click(function(e){  
      settings.carouselContent.carousel("next");
    });

  };

  return widget; // EXPOSE our public api

}());   // END CAROUSEL WIDGET