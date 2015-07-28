var deprecate = require('util').deprecate;

exports.crop = function(x, y, r) {
  var orient = r.split('!')[1];
  var ratio  = r.split('!')[0].split(':').sort();

  var vertical = y > x;
  var rotate = y > x && orient === 'h' || x > y && orient === 'v';

  if ((vertical || rotate) && !(vertical && rotate)) {
    x = x + y;
    y = x - y;
    x = x - y;
  }

  var xʹ = x;
  var yʹ = x * (ratio[1] / ratio[0]);

  if (yʹ > y || rotate && yʹ > x) {
    yʹ = y;
    xʹ = y * (ratio[1] / ratio[0]);

    if (xʹ > x) {
      xʹ = x;
      yʹ = x * (ratio[0] / ratio[1]);
    }
  }

  var Δx = Math.floor((x - xʹ) / 2);
  var Δy = Math.floor((y - yʹ) / 2);

  if ((vertical || rotate) && !(vertical && rotate)) {
    return [
      Δy,         // crop top left x
      Δx,         // crop top left y
      y - Δy * 2, // crop width
      x - Δx * 2  // crop height
    ];
  } else {
    return [
      Δx,         // crop top left x
      Δy,         // crop top left y
      x - Δx * 2, // crop width
      y - Δy * 2  // crop height
    ];
  }
};

exports.fixed = deprecate(exports.crop, 'aspect.fixed: Use aspect.crop instead');

exports.resize = function(x, y, xMax, yMax) {
  if (xMax && yMax) {
    // Maximum values of height and width given, aspect ratio preserved.
    if (y > x) {
      return [Math.round(yMax * x / y), yMax];
    } else {
      return [xMax, Math.round(xMax * y / x)];
    }

  } else if (xMax) {
    // Width given, height automagically selected to preserve aspect ratio.
    return [xMax, Math.round(xMax * y / x)];

  } else {
    // Height given, width automagically selected to preserve aspect ratio.
    return [Math.round(yMax * x / y), yMax];
  }
};
