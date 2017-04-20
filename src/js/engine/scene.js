import Scene from 'ampersand-state';

export default Scene.extend({
  container: new PIXI.Container(),
  props: {
    app: {
      type: 'object'
    }
  },
  addChild(object) {
    this.container.addChild(object);
  }
});
