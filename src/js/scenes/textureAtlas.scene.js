import Scene from '../engine/scene';
import utils from '../engine/utilities';

export default Scene.extend({
  scrollDireciton: [0, 0],
  tile: {
    width: 128,
    height: 64
  },
  ground: {
    atlasUrl: '/assets/textures/ground.json',
    textureMap: [
      'brickpavers2.png',
      'concrete368a.png',
      'cretebrick970.png'
    ],
    data: [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 2, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  buildings: {
    atlasUrl: '/assets/textures/single.json',
    textureMap: [
      'untitled.png',
      'untitled2.png',
      'untitled3.png',
      'untitled4.png',
      'untitled5.png',
      'untitled6.png'
    ],
    data: [
      [null, 1, null, null, null],
      [null, null, null, null, null],
      [null, null, 1, null, null],
      [null, null, null, null, null],
      [null, null, null, 4, null]
    ]
  },
  initialize() {
    PIXI.loader.add([this.ground.atlasUrl, this.buildings.atlasUrl]).load((loader, resources) => {
      this.drawGround(loader, resources);
      this.drawBuildings(loader, resources);
    });
    document.addEventListener('keydown', this.keyDown);
    PIXI.ticker.shared.add(() => this.moveMap);
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
    this.container.x = this.container.x + this.scrollDirection[0];
  },
  drawBuildings(loader, resources) {
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        if (this.buildings.data[col][row] === null) {
          continue;
        }
        const texture = resources[this.buildings.atlasUrl].textures[this.buildings.textureMap[this.buildings.data[col][row]]];
        let sprite = new PIXI.Sprite(texture);
        sprite.width = texture.width;
        sprite.height = texture.height;
        sprite.position = utils.twoDToIso(col / 2 * this.tile.width, row / 2 * this.tile.width, texture.height);
        this.container.addChild(sprite);
      }
    }
  },
  drawGround(loader, resources) {
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        const texture = resources[this.ground.atlasUrl].textures[this.ground.textureMap[this.ground.data[col][row]]];
        let sprite = new PIXI.Sprite(texture);
        sprite.width = 128;
        sprite.height = 64;
        sprite.position = utils.twoDToIso(col / 2 * this.tile.width, row / 2 * this.tile.width, 64);
        this.container.addChild(sprite);
      }
    }
  }
});
