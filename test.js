var assert = require('assert');
var aspect = require('./index');

describe('fixed()', function() {
  it('returns no crop for horizontal image with correct aspect ratio', function() {
    var crop = aspect.fixed(1024, 768, '4:3');
    assert.deepEqual(crop, [0, 0, 1024, 768]);
  });

  it('returns crop for horizontal image with incorrect aspect ratio', function() {
    var crop = aspect.fixed(2048, 768, '4:3');
    assert.deepEqual(crop, [512, 0, 1024, 768]);
  });

  it('returns crop for near square horizontal image with incorrect aspect ratio', function() {
    var crop = aspect.fixed(780, 768, '4:3');
    assert.deepEqual(crop, [0, 91, 780, 586]);
  });

  it('returns no crop for vertical image with correct aspect ratio', function() {
    var crop = aspect.fixed(768, 1024, '4:3');
    assert.deepEqual(crop, [0, 0, 768, 1024]);
  });

  it('returns crop for vertical image with incorrect aspect ratio', function() {
    var crop = aspect.fixed(768, 2048, '4:3');
    assert.deepEqual(crop, [0, 512, 768, 1024]);
  });
});

