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

  var Δx = (x - xʹ) / 2;
  var Δy = (y - yʹ) / 2;

  if ((vertical || rotate) && !(vertical && rotate)) {
    return [
      Math.floor(Δy),         // crop top left x
      Math.floor(Δx),         // crop top left y
      Math.floor(y - Δy * 2), // crop width
      Math.floor(x - Δx * 2)  // crop height
    ];
  } else {
    return [
      Math.floor(Δx),         // crop top left x
      Math.floor(Δy),         // crop top left y
      Math.floor(x - Δx * 2), // crop width
      Math.floor(y - Δy * 2)  // crop height
    ];
  }
};

exports.fixed = deprecate(exports.crop, 'aspect.fixed: Use aspect.crop instead');

exports.resize = function(x, y, xMax, yMax) {
  if (xMax && yMax) {
    // Maximum values of height and width given, aspect ratio preserved.
    if (y > x) {
      return [Math.floor(yMax * x / y), yMax];
    } else {
      return [xMax, Math.floor(xMax * y / x)];
    }

  } else if (xMax) {
    // Width given, height automagically selected to preserve aspect ratio.
    return [xMax, Math.floor(xMax * y / x)];

  } else {
    // Height given, width automagically selected to preserve aspect ratio.
    return [Math.floor(yMax * x / y), yMax];
  }
};
