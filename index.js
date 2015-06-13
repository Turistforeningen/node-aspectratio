exports.fixed = function(x, y, ratio) {
  var yʹ = y;
  var xʹ = x;

  ratio = ratio.split(':').sort();

  // This is a vertical image
  if (y > x) {
    yʹ = x * (ratio[1] / ratio[0]);

    if (yʹ > y) {
      yʹ = y;
      xʹ = y * (eratio[0] / ratio[1]);
    }

  // This is a horizontal image
  } else {
    xʹ = y * (ratio[1] / ratio[0]);

    if (xʹ > x) {
      xʹ = x;
      yʹ = x * (ratio[0] / ratio[1]);
    }
  }

  var Δx = Math.floor((x - xʹ) / 2);
  var Δy = Math.floor((y - yʹ) / 2);

  return [
    Δx,         // crop top left x
    Δy,         // crop top left y
    x - Δx * 2, // crop width
    y - Δy * 2  // crop height
  ];
};
