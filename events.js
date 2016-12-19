/**
 * d3MouseOver add the mouseover event to jQuery
 * element
 * @returns {undefined}
 */
jQuery.fn.d3MouseOver = function () {
  this.each(function (i, e) {
    var evt = new MouseEvent("mouseover");
    e.dispatchEvent(evt);
  });
};

/**
 * d3MouseOut add the mouseout event to jQuery
 * element
 * @returns {undefined}
 */
jQuery.fn.d3MouseOut = function () {
  this.each(function (i, e) {
    var evt = new MouseEvent("mouseout");
    e.dispatchEvent(evt);
  });
};