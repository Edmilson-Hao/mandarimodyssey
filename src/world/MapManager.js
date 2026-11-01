/**
 * MapManager — Mapa real da Ilha do Despertar (v1.3)
 * Tileset expandido + props + colisões.
 */

import { DEPTH } from '../config/gameConfig.js';

const TILE = 16;

// Legenda:
// 0 grama | 1 caminho | 2 água | 3 parede (colisão)
// 4 árvore | 5 flor | 6 pedra | 7 areia | 8 dirt
// 9 wall_wood | 10 wall_plaster | 11 roof | 12 door | 13 window
// 14 bush | 15 stone_floor

const MAP = [
  // 0
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,4,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,4,0,0,0,0,0,4,0,0,7,2],
  [2,7,0,0,0,0,0,1,0,0,0,0,0,1,0,0,5,0,0,0,0,0,0,0,0,5,0,0,0,0,7,2],
  // 5 — vila central
  [2,7,0,0,0,0,0,1,0,11,11,11,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,1,0,10,12,10,0,1,0,0,0,1,0,0,0,0,11,11,11,0,0,0,0,0,7,2],
  [2,7,0,5,0,0,0,1,0,10,10,10,0,1,0,0,0,1,0,0,0,0,9,12,9,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,9,9,9,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,7,2],
  // 10
  [2,7,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,4,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,5,0,0,7,2],
  // 15 — caminho para o cais / casa de chá
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,7,2],
  [2,7,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,7,2],
  // 20 — área da casa de chá + cais
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,11,11,0,0,1,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,12,10,0,0,1,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10,10,0,0,1,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,7,2],
  [2,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,1,7,7,7,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const KEY = {
  0: ['tile_grass_01','tile_grass_02','tile_grass_03'],
  1: ['tile_path_01','tile_path_02'],
  2: ['tile_water_01','tile_water_02'],
  7: ['tile_sand'],
  8: ['tile_dirt'],
  9: ['tile_wall_wood'],
  10:['tile_wall_plaster'],
  11:['tile_roof'],
  12:['tile_door'],
  13:['tile_window'],
  14:['tile_bush'],
  15:['tile_stone'],
};

const COLLIDE = new Set([2, 3, 4, 6, 9, 10, 11, 12, 13]); // água, parede, árvore, pedra, construções

export class MapManager {
  constructor(scene) {
    this.scene = scene;
    this.mapData = MAP;
    this.tileSize = TILE;
    this.width = MAP[0].length * TILE;
    this.height = MAP.length * TILE;
    this.walls = null;
  }

  build() {
    this.walls = this.scene.physics.add.staticGroup();

    for (let row = 0; row < MAP.length; row++) {
      for (let col = 0; col < MAP[row].length; col++) {
        this._place(row, col);
      }
    }

    // Árvores e props extras (decoração)
    this._placeDecor();

    this.scene.physics.world.setBounds(0, 0, this.width, this.height);
    return this;
  }

  _place(row, col) {
    const type = MAP[row][col];
    const x = col * TILE + TILE / 2;
    const y = row * TILE + TILE / 2;
    const seed = (row * 17 + col * 31) % 3;

    let keys = KEY[type];
    if (!keys) keys = KEY[0];
    const key = keys[seed % keys.length];

    // base grama sob construções e props
    if ([4,5,6,9,10,11,12,13,14].includes(type)) {
      const gkey = KEY[0][seed % 3];
      this.scene.add.image(x, y, gkey).setDepth(DEPTH.GROUND);
    }

    const depth = (type >= 9 && type <= 13) ? DEPTH.OBJECTS : 
                  (type === 4 || type === 14) ? DEPTH.OBJECTS : DEPTH.GROUND;

    this.scene.add.image(x, y, key).setDepth(depth);

    if (COLLIDE.has(type) || type === 4) {
      const body = this.walls.create(x, y, key);
      body.setVisible(false);
      body.refreshBody();
      if (type === 4 || type === 14) {
        body.setSize(12, 12).setOffset(2, 2);
      }
    }
  }

  _placeDecor() {
    // lanternas, barris, caixas em posições fixas da vila
    const props = [
      { x: 9*TILE+8, y: 7*TILE+8, key: 'prop_lantern' },
      { x: 13*TILE+8, y: 7*TILE+8, key: 'prop_lantern' },
      { x: 10*TILE+8, y: 9*TILE+8, key: 'prop_barrel' },
      { x: 14*TILE+8, y: 6*TILE+8, key: 'prop_crate' },
      { x: 22*TILE+8, y: 8*TILE+8, key: 'prop_lantern' },
      { x: 24*TILE+8, y: 21*TILE+8, key: 'prop_lantern' },
      { x: 23*TILE+8, y: 23*TILE+8, key: 'prop_table' },
    ];
    props.forEach(p => {
      this.scene.add.image(p.x, p.y, p.key).setDepth(DEPTH.OBJECTS);
    });
  }

  getWalls() { return this.walls; }
  getBounds() { return { width: this.width, height: this.height }; }
}
