import Scene from '../engine/scene';

export default Scene.extend({
  textureAtlasUrl: '/assets/bunny.jpg',
  initialize() {
    // load the texture we need
    PIXI.loader.add('bunny', this.textureAtlasUrl).load((loader, resources) => {

      // This creates a texture from a 'bunny.png' image.
      var bunny = new PIXI.Sprite(resources.bunny.texture);

      // Setup the position of the bunny
      bunny.x = this.app.renderer.width / 2;
      bunny.y = this.app.renderer.height / 2;

      // Rotate around the center
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      // Add the bunny to the scene we are building.
      this.container.addChild(bunny);

      // Listen for frame updates
      this.app.ticker.add(function() {
        // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
      });
    });
  }
});
