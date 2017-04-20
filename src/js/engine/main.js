import '../styles/index.css';
import 'pixi.js/dist/pixi.min.js';
import {TextureAtlasScene} from '../scenes';
import State from 'ampersand-state';

const Main = State.extend({
  currentScene: null,
  initialize() {
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.app.view);
  },
  showScene(Scene) {
    this.currentScene = new Scene({
      app: this.app
    });
    this.app.stage.x = 300;
    this.app.stage.y = 300;
    this.app.stage.addChild(this.currentScene.container);
  },
  keyDown(e) {
    const keyMap = {
      ArrowLeft: [-1, 0],
      ArrowUp: [0, -1],
      ArrowRight: [1, 0],
      ArrowDown: [0, 1]
    }
    this.scrollDireciton = keyMap[e.code];
  },
  moveMap() {
  }
});

const main = new Main();
main.showScene(TextureAtlasScene);
