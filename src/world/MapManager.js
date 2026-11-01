/**
 * MapManager — Responsável por construir o mapa a partir de dados.
 * Mantém colisões e profundidade corretas.
 */

import { DEPTH } from '../config/gameConfig.js';

const TILE_SIZE = 16;

const GRASS = ['tile_grass_01', 'tile_grass_02', 'tile_grass_03'];
const PATH  = ['tile_path_01', 'tile_path_02'];
const WATER = ['tile_water_01', 'tile_water_02'];

/**
 * Tipos de tile:
 * 0 grama | 1 caminho | 2 água | 3 parede
 * 4 árvore | 5 flor | 6 pedra
 */
export class MapManager {
  /**
   * @param {Phaser.Scene} scene
   * @param {number[][]} mapData
   */
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;
    this.tileSize = TILE_SIZE;
    this.width = mapData[0].length * TILE_SIZE;
    this.height = mapData.length * TILE_SIZE;
    this.walls = null;
  }

  build() {
    this.walls = this.scene.physics.add.staticGroup();

    for (let row = 0; row < this.mapData.length; row++) {
      for (let col = 0; col < this.mapData[row].length; col++) {
        this._placeTile(row, col);
      }
    }

    this.scene.physics.world.setBounds(0, 0, this.width, this.height);
    return this;
  }

  _placeTile(row, col) {
    const type = this.mapData[row][col];
    const x = col * TILE_SIZE + TILE_SIZE / 2;
    const y = row * TILE_SIZE + TILE_SIZE / 2;
    const seed = (row * 17 + col * 31) % 3;

    let key = GRASS[seed % 3];
    let depth = DEPTH.GROUND;
    let collide = false;

    if (type === 1) {
      key = PATH[seed % 2];
    } else if (type === 2) {
      key = WATER[seed % 2];
      collide = true;
    } else if (type === 3) {
      key = 'tile_wall';
      collide = true;
    } else if (type === 4) {
      this.scene.add.image(x, y, GRASS[seed % 3]).setDepth(DEPTH.GROUND);
      key = 'tile_tree';
      depth = DEPTH.OBJECTS;
      collide = true;
    } else if (type === 5) {
      this.scene.add.image(x, y, GRASS[seed % 3]).setDepth(DEPTH.GROUND);
      key = 'tile_flower';
      depth = DEPTH.OBJECTS;
    } else if (type === 6) {
      this.scene.add.image(x, y, GRASS[seed % 3]).setDepth(DEPTH.GROUND);
      key = 'tile_rock';
      depth = DEPTH.OBJECTS;
      collide = true;
    }

    this.scene.add.image(x, y, key).setDepth(depth);

    if (collide) {
      const body = this.walls.create(x, y, key);
      body.setVisible(false);
      body.refreshBody();
      if (type === 4 || type === 6) {
        body.setSize(12, 12);
        body.setOffset(2, 2);
      }
    }
  }

  getWalls() {
    return this.walls;
  }

  getBounds() {
    return { width: this.width, height: this.height };
  }
}
