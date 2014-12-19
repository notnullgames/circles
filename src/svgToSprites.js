var PIXI = require('pixi.js');

// create a PIXI.DisplayObjectContainer for each inkscape layer
// convert each top-level object in layer to a PIXI.Sprite
module.exports = function(SVG){
  var svgGroups = SVG.getElementsByTagName("g");
  var keys = [];
  var vals = [];
  var i, s;
  for (i in svgGroups){
    console.log(svgGroups.item(i).parentNode.tagName);
    if (svgGroups.item(i).parentNode.tagName != 'svg') continue;
    var item = svgGroups.item(i);
    if(svgGroups[i] && item.attributes){
      name = 'layer' + i;
      if (item.attributes['inkscape:label']){
        name = item.attributes['inkscape:label'].value;
      }else if (item.attributes.id){
        name = item.attributes.id.value;
      }
      if (keys.indexOf(name) === -1){
        keys.push(name);
        vals.push(item);
      }
    }
  }
  var containers = {};
  var header = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="800" height="600" version="1.1">';
  for (i in keys){
    var group = vals[i];
    var layerName = keys[i];
    var container = new PIXI.DisplayObjectContainer();
    var svgSprites = group.querySelectorAll("*");
    for (s in svgSprites){
      var str = 'data:image/svg+xml;utf8,' + encodeURIComponent(header + svgSprites.item(s).outerHTML + '</svg>');
      var sprite = PIXI.Sprite.fromImage(str);
      container.addChild(sprite);
    }
    containers[layerName] = container;
  }
  return containers;
}
