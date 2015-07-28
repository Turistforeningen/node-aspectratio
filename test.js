var assert = require('assert');
var aspect = require('./index');

describe('aspect.resize', function() {
  var vertical = { x: 3456, y: 5184 };
  var horizontal = { x: 5184, y: 3456 };

  var maxX = 500;
  var maxY = 500;

  describe('maxX only', function() {
    it('returns bounds for horizontal image', function() {
      var bounds = aspect.resize(horizontal.x, horizontal.y, maxX);
      assert.deepEqual(bounds, [ 500, 333 ]);
    });

    it('returns bounds for vertical image', function() {
      var bounds = aspect.resize(vertical.x, vertical.y, maxX);
      assert.deepEqual(bounds, [ 500, 750 ]);
    });
  });

  describe('maxY only', function() {
    it('returns bounds for horizontal image', function() {
      var bounds = aspect.resize(horizontal.x, horizontal.y, undefined, maxY);
      assert.deepEqual(bounds, [ 750, 500 ]);
    });

    it('returns bounds for vertical image', function() {
      var bounds = aspect.resize(vertical.x, vertical.y, undefined, maxY);
      assert.deepEqual(bounds, [ 333, 500 ]);
    });
  });

  describe('maxX and maxY', function() {
    it('returns bounds for horizontal image', function() {
      var bounds = aspect.resize(horizontal.x, horizontal.y, 500, 500);
      assert.deepEqual(bounds, [ 500, 333 ]);
    });

    it('returns bounds for vertical image', function() {
      var bounds = aspect.resize(vertical.x, vertical.y, 500, 500);
      assert.deepEqual(bounds, [ 333, 500 ]);
    });

    it('properly rounds all edges', function() {
      var bounds = aspect.resize(800, 534, 500, 500);
      assert.deepEqual(bounds, [ 500, 334 ]);
    });
  });
});

describe('horizontal image', function() {
  // 5184 × 3456
  var width  = 5184;
  var height = 3456;

  describe('same orientation', function() {
    it('returns crop for 1:1 aspect ratio', function() {
      // 3456 × 3456
      var crop = aspect.crop(width, height, '1:1');
      assert.deepEqual(crop, [ 864, 0, 3456, 3456 ]);
    });

    it('returns crop for 3:2 aspect ratio', function() {
      // 5184 × 3456
      var crop = aspect.crop(width, height, '3:2');
      assert.deepEqual(crop, [ 0, 0, 5184, 3456 ]);
    });

    it('returns crop for 3:5 aspect ratio', function() {
      // 5184 × 3110
      var crop = aspect.crop(width, height, '3:5');
      assert.deepEqual(crop, [ 0, 172, 5184, 3112 ]);
    });

    it('returns crop for 4:3 aspect ratio', function() {
      // 4608 × 3456
      var crop = aspect.crop(width, height, '4:3');
      assert.deepEqual(crop, [ 288, 0, 4608, 3456 ]);
    });

    it('returns crop for 5:7 aspect ratio', function() {
      // 4838 × 3456
      var crop = aspect.crop(width, height, '5:7');
      assert.deepEqual(crop, [ 172, 0, 4840, 3456 ]);
    });

    it('returns crop for 8:10 aspect ratio', function() {
      // 4320 × 3456
      var crop = aspect.crop(width, height, '8:10');
      assert.deepEqual(crop, [ 1209, 0, 2766, 3456 ]);
    });

    it('returns crop for 16:9 aspect ratio', function() {
      // 5184 × 2916
      var crop = aspect.crop(width, height, '16:9');
      assert.deepEqual(crop, [ 0, 270, 5184, 2916 ]);
    });
  });

  describe('vertical orientation', function() {
    it('returns crop for 1:1 aspect ratio', function() {
      // 3456 × 3456
      var crop = aspect.crop(width, height, '1:1!v');
      assert.deepEqual(crop, [ 864, 0, 3456, 3456 ]);
    });

    it('returns crop for 3:2 aspect ratio', function() {
      // 2304 × 3456
      var crop = aspect.crop(width, height, '3:2!v');
      assert.deepEqual(crop, [ 1440, 0, 2304, 3456 ]);
    });

    it('returns crop for 3:5 aspect ratio', function() {
      // 2074 × 3456
      var crop = aspect.crop(width, height, '3:5!v');
      assert.deepEqual(crop, [ 1555, 0, 2074, 3456 ]);
    });

    it('returns crop for 4:3 aspect ratio', function() {
      // 2592 × 3456
      var crop = aspect.crop(width, height, '4:3!v');
      assert.deepEqual(crop, [ 1296, 0, 2592, 3456 ]);
    });

    it('returns crop for 5:7 aspect ratio', function() {
      // 2469 × 3456
      var crop = aspect.crop(width, height, '5:7!v');
      assert.deepEqual(crop, [ 1357, 0, 2470, 3456 ]);
    });

    it('returns crop for 8:10 aspect ratio', function() {
      // 2765 × 3456
      var crop = aspect.crop(width, height, '8:10!v');
      assert.deepEqual(crop, [ 1209, 0, 2766, 3456 ]);
    });

    it('returns crop for 16:9 aspect ratio', function() {
      // 1944 × 3456
      var crop = aspect.crop(width, height, '16:9!v');
      assert.deepEqual(crop, [ 1620, 0, 1944, 3456 ]);
    });
  });
});

describe('vertical image', function() {
  // 3456 x 5184
  var width  = 3456;
  var height = 5184;

  describe('same orientation', function() {
    it('returns crop for 1:1 aspect ratio', function() {
      // 3456 × 3456
      var crop = aspect.crop(width, height, '1:1');
      assert.deepEqual(crop, [ 0, 864, 3456, 3456 ]);
    });

    it('returns crop for 3:2 aspect ratio', function() {
      // 5184 × 3456
      var crop = aspect.crop(width, height, '3:2');
      assert.deepEqual(crop, [ 0, 0, 3456, 5184 ]);
    });

    it('returns crop for 3:5 aspect ratio', function() {
      // 5184 × 3110
      var crop = aspect.crop(width, height, '3:5');
      assert.deepEqual(crop, [ 172, 0, 3112, 5184 ]);
    });

    it('returns crop for 4:3 aspect ratio', function() {
      // 4608 × 3456
      var crop = aspect.crop(width, height, '4:3');
      assert.deepEqual(crop, [ 0, 288, 3456, 4608 ]);
    });

    it('returns crop for 5:7 aspect ratio', function() {
      // 4838 × 3456
      var crop = aspect.crop(width, height, '5:7');
      assert.deepEqual(crop, [ 0, 172, 3456, 4840 ]);
    });

    it('returns crop for 8:10 aspect ratio', function() {
      // 4320 × 3456
      var crop = aspect.crop(width, height, '8:10');
      assert.deepEqual(crop, [ 0, 1209, 3456, 2766 ]);
    });

    it('returns crop for 16:9 aspect ratio', function() {
      // 5184 × 2916
      var crop = aspect.crop(width, height, '16:9');
      assert.deepEqual(crop, [ 270, 0, 2916, 5184 ]);
    });
  });

  describe('horizontal orientation', function() {
    it('returns crop for 1:1 aspect ratio', function() {
      // 3456 × 3456
      var crop = aspect.crop(width, height, '1:1!h');
      assert.deepEqual(crop, [ 0, 864, 3456, 3456 ]);
    });

    it('returns crop for 3:2 aspect ratio', function() {
      // 3456 × 2304
      var crop = aspect.crop(width, height, '3:2!h');
      assert.deepEqual(crop, [ 0, 1440, 3456, 2304 ]);
    });

    it('returns crop for 3:5 aspect ratio', function() {
      // 3456 × 2074
      var crop = aspect.crop(width, height, '3:5!h');
      assert.deepEqual(crop, [ 0, 1555, 3456, 2074 ]);
    });

    it('returns crop for 4:3 aspect ratio', function() {
      // 3456 × 2592
      var crop = aspect.crop(width, height, '4:3!h');
      assert.deepEqual(crop, [ 0, 1296, 3456, 2592 ]);
    });

    it('returns crop for 5:7 aspect ratio', function() {
      // 3456 × 2469
      var crop = aspect.crop(width, height, '5:7!h');
      assert.deepEqual(crop, [ 0, 1357, 3456, 2470 ]);
    });

    it('returns crop for 8:10 aspect ratio', function() {
      // 3456 × 2765
      var crop = aspect.crop(width, height, '8:10!h');
      assert.deepEqual(crop, [ 0, 1209, 3456, 2766 ]);
    });

    it('returns crop for 16:9 aspect ratio', function() {
      // 3456 × 1944
      var crop = aspect.crop(width, height, '16:9!h');
      assert.deepEqual(crop, [ 0, 1620, 3456, 1944 ]);
    });
  });
});
