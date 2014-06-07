// Sliders Widget, by Raul Galindo
// rgalindo33@gmail.com
//  Summer 2013


// Creates a group of widgets IOS like to input users preferences on the Webapp
//
// USAGE:
// Call SliderWidget.init(sliders) To start the Widget
//      sliders must be an array of divs that are to be each slider item
//
// Each slider item must have a data-value attribute where the value will be loaded from/written to
//     setValue and getValue act as expected
//
// DEPENDENCIES:
//
//  noUiSlider.js      https://github.com/leongersen/noUiSlider
//
// TODOS:
//  - Stop polluting the global namespace?
//
// ==========================

var s,
SlidersWidget = {

  settings: {
    alignFactor: 17,
    boxSize: 30
  },

  init: function(sliders) { // 
    s = this.settings;
    s.sliders = $(sliders);
    this.createSliders();
  },

  createSliders: function() {
    var slider,
    value_box,
    value;

    s.sliders.each(function(){
      slider = $(this);

      slider.noUiSlider({
        range:   [1, 5],
        start:   slider.attr("data-value"),
        handles: 1,
        step:    1,
        serialization: {
          to:[false]
        },
        slide: function(){
          slider    = $(this), 
          value_box = slider.parent().find(".slider-value");

          value = slider.val();
          slider.attr("data-value",value);
          value_box.html(value);
          value_box.css('left', ((value-1)*s.boxSize)-s.alignFactor);

          if (value_box.is(":hidden")){
            value_box.fadeIn(100);
          }
          $.doTimeout("nose",400,function(){
            value_box.fadeOut(400);
          });
         }// END SLIDE

      });  //END NOUISLIDER

    }); // END EACH

  },

  setValue: function(element, value) {
    var slider = $(element);
    slider.attr("data-value", value);
    slider.val(value);
  },

  getValue: function(element) {
    return $(element).attr("data-value");
  }

}; // END WIDGET