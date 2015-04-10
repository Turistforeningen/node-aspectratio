exports.r_up = function(ratio) {
  ratio = ratio.split(':').sort();
  return ratio[1] / ratio[0]
}

exports.r_down = function(ratio) {
  ratio = ratio.split(':').sort();
  return ratio[0] / ratio[1]
}

exports.fixed = function(x, y, ratio) {
  var yʹ = y;
  var xʹ = x;

  // This is a vertical image
  if (y > x) {
    yʹ = x * exports.r_up(ratio);

    if (yʹ > y) {
      yʹ = y;
      xʹ = y * exports.r_down(ratio);
    }

  // This is a horizontal image
  } else {
    xʹ = y * exports.r_up(ratio);

    if (xʹ > x) {
      xʹ = x;
      yʹ = x * exports.r_down(ratio);
    }
  }

  var Δx = Math.floor((x - xʹ) / 2);
  var Δy = Math.floor((y - yʹ) / 2);

  return [
    0 + Δx,     // crop top left x
    y - Δy,     // crop top left y
    x - Δx * 2, // crop width
    y - Δy * 2  // crop height
  ]
}

