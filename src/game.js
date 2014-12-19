var PIXI = require('pixi.js');
var ajax = require('superagent');

var stage = new PIXI.Stage(0);
var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);
var startTime = (new Date()).getTime();

var svgToSprites = require('./svgToSprites.js');

ajax.get('assets/levels/level1.svg')
  .end(function(res){
    var SVG = new DOMParser().parseFromString(res.text, 'text/xml');
    svgToSprites(SVG).forEach(function(l){
      stage.addChild(l);
    });
  });


function animate() {
  requestAnimationFrame( animate ); 
  renderer.render(stage);
}
animate();

