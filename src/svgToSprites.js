var PIXI = require('pixi.js');
var $ = require('sizzle');

var header = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="800" height="600" version="1.1">';

module.exports = function(SVG){
  var containers = {};
  $('svg > g', SVG).forEach(function(SvgGroup){
    var name = SvgGroup.attributes['inkscape:label'].value;
    containers[name] = new PIXI.DisplayObjectContainer();
    $('> *', SvgGroup).forEach(function(el, i){
      console.dir(el)
      var str = 'data:image/svg+xml;utf8,' + encodeURIComponent(header + el.outerHTML + '</svg>');
      containers[name].addChild(PIXI.Sprite.fromImage(str));
    });
  });
  return containers;
}
