/* global DOMParser requestAnimationFrame */
var PIXI = require('pixi.js')
var ajax = require('superagent')
var svgToSprites = require('./svgToSprites.js')

var stage = new PIXI.Stage(0)
var renderer = PIXI.autoDetectRenderer(800, 600)
document.body.appendChild(renderer.view)
var layers

ajax.get('assets/levels/level1.svg')
  .end(function (res) {
    var SVG = new DOMParser().parseFromString(res.text, 'text/xml')
    layers = svgToSprites(SVG)
    for (var i in layers) {
      stage.addChild(layers[i])
    }
    console.log(layers)
  })

function animate () {
  requestAnimationFrame(animate)
  renderer.render(stage)
  if (layers && layers.enemies) {
    layers.enemies.children.forEach(function (enemy) {
      enemy.x -= 1
      enemy.y += 1
    })
  }
}
animate()
