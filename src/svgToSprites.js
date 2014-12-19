var PIXI = require('pixi.js');

// create a PIXI.DisplayObjectContainer for each layer
// convert each top-level object in layer to a PIXI.Sprite
module.exports = function(SVG){
  var svgGroups = SVG.getElementsByTagName("g");
  var keys = [];
  var vals = [];
  var i, s;
  for (i in svgGroups){
    if(svgGroups[i] && svgGroups[i].attributes){
      name = 'layer' + i;
      if (svgGroups[i].attributes['inkscape:label']){
        name = svgGroups[i].attributes['inkscape:label'].value;
      }else if (svgGroups[i].attributes.id){
        name = svgGroups[i].attributes.id.value;
      }
      if (keys.indexOf(name) === -1){
        keys.push(name);
        vals.push(svgGroups[i]);
      }
    }
  }
  var containers = [];
  var header = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="800" height="600" version="1.1">';
  for (i in keys){
    var group = vals[i];
    var layerName = keys[i];
    var container = new PIXI.DisplayObjectContainer();

    var svgSprites = group.getElementsByTagName("*");
    for (i in svgSprites){
      var str = 'data:image/svg+xml;utf8,' + encodeURIComponent(header + svgSprites.item(i).outerHTML + '</svg>');
      var sprite = PIXI.Sprite.fromImage(str);
      container.addChild(sprite);
    }
    containers.push(container);
  }
  return containers;
}
