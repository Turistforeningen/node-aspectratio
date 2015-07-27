# aspectratio

[![Build status](https://img.shields.io/wercker/ci/55281116a26c78542c01d251.svg "Build status")](https://app.wercker.com/project/bykey/90dda5965d63c43c484b2e29c7d4ba92)
[![NPM downloads](https://img.shields.io/npm/dm/aspectratio.svg "NPM downloads")](https://www.npmjs.com/package/aspectratio)
[![NPM version](https://img.shields.io/npm/v/aspectratio.svg "NPM version")](https://www.npmjs.com/package/aspectratio)
[![Node version](https://img.shields.io/node/v/aspectratio.svg "Node version")](https://www.npmjs.com/package/aspectratio)
[![Dependency status](https://img.shields.io/david/turistforeningen/node-aspectratio.svg "Dependency status")](https://david-dm.org/turistforeningen/node-aspectratio)

Image aspect ratio utilities.

## Install

```
npm install aspectratio --save
```

## API

```js
var aspect = require('aspectratio');
```

### crop(**integer** `width`, **integer** `height`, **string** `ratio`)

Apply a fixed aspect `ratio` crop without distoring the image aspect ratio.

* **integer** `width` - original image width
* **integer** `height` - original image height
* **string** `ratio` - new image ratio

> The `ratio` must be on the following format: `x`:`y` where `x` and `y` are
> integers. The order of `x` and `z` does not matter and `3:4` will be treated
> as `4:3`.

> By default #crop() will match the orientation of the original image unless a
> forced orientation is given on the follwing format: `x`:`y`!`z` where `z` is
> the orientation (`v` for vertical, or `h` for horizontal).

#### Return

This will return an `Array` of four values:

1. **integer** `x` - top lef x coordinate
2. **integer** `y` - top lef y coordinate
3. **integer** `width` - new image width
4. **integer** `height` - new image height

#### Example

```js
var crop = aspect.crop(2048, 768, '4:3');
// [512, 768, 1024, 768]
```

![Cropp with fixed ratio](https://docs.google.com/drawings/d/1Lu8eLqcjjlI0YL7Q-YHg0ttjRC8I8Vkwq6PVXRgxNUo/pub?w=960&h=720)

### resize(**integer** `x`, **integer** `y`, **integer** `maxX`, **integer** `maxY`)

Get resized height and width of an image while perserving the aspect ratio of
the image.

* **integer** `x` - original image width
* **integer** `y` - original image height
* **integer** `maxX` - max image width
* **integer** `maxY` - max image height

### Return

Returns an `Array` of the resized `x` and `y` values:

* **integer** `x` - resized image width
* **integer** `y` - resized image height

## [MIT License](https://github.com/Turistforeningen/node-aspectratio/blob/master/LICENSE)
