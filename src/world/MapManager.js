/**
 * MapManager — Ilha do Despertar v2.1
 * Tiles reais + props densos (poço, barril, árvore, casas)
 */

import { DEPTH } from '../config/gameConfig.js';

const TILE = 16;

/*
  Legenda:
  0 grama | 1 caminho | 2 água | 4 árvore | 5 flor | 7 areia
  9 wall_wood | 10 wall_plaster | 11 roof | 12 door | 14 bush
  15 stone_floor (academia)
*/

const MAP = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,4,0,0,0,0,0,0,15,15,15,15,15,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,15,11,11,11,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,15,10,12,10,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,15,10,10,10,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,15,15,15,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,4,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,11,11,11,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,10,12,10,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,5,0,0,0,10,10,10,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,1,0,0,0,11,11,11,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,1,0,0,0,9,12,9,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,1,1,1,1,9,9,9,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,11,11,11,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,10,12,10,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,10,10,10,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,7,2],
  [2,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,7,2],
  [2,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,1,7,7,7,7,7,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const KEY = {
  0: ['tile_grass_01', 'tile_grass_02', 'tile_grass_03'],
  1: ['tile_path_01', 'tile_path_02'],
  2: ['tile_water_01', 'tile_water_02'],
  7: ['tile_sand'],
  9: ['tile_wall_wood'],
  10: ['tile_wall_plaster'],
  11: ['tile_roof'],
  12: ['tile_door'],
  14: ['tile_bush'],
  15: ['tile_stone'],
};

const COLLIDE = new Set([2, 4, 9, 10, 11, 12]);

const ZONES = {
  academy: { id: 'zone_academy', name: 'Academia', x1: 8, y1: 2, x2: 16, y2: 9 },
  village: { id: 'zone_initial_village', name: 'Vila Inicial', x1: 4, y1: 9, x2: 22, y2: 20 },
  market: { id: 'zone_market', name: 'Mercado', x1: 22, y1: 10, x2: 36, y2: 24 },
  dock: { id: 'zone_dock', name: 'Cais', x1: 28, y1: 22, x2: 36, y2: 28 }
};

export class MapManager {
  constructor(scene) {
    this.scene = scene;
    this.mapData = MAP;
    this.tileSize = TILE;
    this.width = MAP[0].length * TILE;
    this.height = MAP.length * TILE;
    this.walls = null;
    this.zones = ZONES;
  }

  build() {
    this.walls = this.scene.physics.add.staticGroup();

    for (let row = 0; row < MAP.length; row++) {
      for (let col = 0; col < MAP[row].length; col++) {
        this._place(row, col);
      }
    }
    this._placeDecor();
    this.scene.physics.world.setBounds(0, 0, this.width, this.height);
    return this;
  }

  _place(row, col) {
    const type = MAP[row][col];
    const x = col * TILE + TILE / 2;
    const y = row * TILE + TILE / 2;
    const seed = (row * 17 + col * 31) % 3;

    let keys = KEY[type] || KEY[0];
    const key = keys[seed % keys.length];

    // Base grass under objects
    if ([4, 5, 9, 10, 11, 12, 14].includes(type)) {
      const gkey = KEY[0][seed % 3];
      this.scene.add.image(x, y, gkey).setDepth(DEPTH.GROUND);
    }

    // Trees: trunk + canopy
    if (type === 4) {
      this.scene.add.image(x, y + 4, 'tile_tree_trunk').setDepth(DEPTH.OBJECTS);
      this.scene.add.image(x, y - 10, 'tile_tree_top').setDepth(DEPTH.OBJECTS + 1);
      const body = this.walls.create(x, y + 2, 'tile_tree_trunk');
      body.setVisible(false);
      body.setSize(10, 10).setOffset(3, 8);
      body.refreshBody();
      return;
    }

    const depth = (type >= 9 && type <= 12) || type === 14
      ? DEPTH.OBJECTS : DEPTH.GROUND;

    this.scene.add.image(x, y, key).setDepth(depth);

    if (COLLIDE.has(type)) {
      const body = this.walls.create(x, y, key);
      body.setVisible(false);
      body.refreshBody();
    }
  }

  _placeDecor() {
    const props = [
      // Vila
      { x: 10 * TILE + 8, y: 13 * TILE + 8, key: 'prop_lantern' },
      { x: 18 * TILE + 8, y: 13 * TILE + 8, key: 'prop_lantern' },
      { x: 12 * TILE + 8, y: 16 * TILE + 8, key: 'prop_well' },
      { x: 14 * TILE + 8, y: 15 * TILE + 8, key: 'prop_barrel' },
      { x: 15 * TILE + 8, y: 16 * TILE + 8, key: 'prop_crate' },
      { x: 9 * TILE + 8, y: 15 * TILE + 8, key: 'prop_bush' },
      { x: 19 * TILE + 8, y: 15 * TILE + 8, key: 'prop_fence' },
      { x: 17 * TILE + 8, y: 14 * TILE + 8, key: 'prop_table' },
      // Mercado
      { x: 26 * TILE + 8, y: 15 * TILE + 8, key: 'prop_barrel' },
      { x: 28 * TILE + 8, y: 14 * TILE + 8, key: 'prop_crate' },
      { x: 27 * TILE + 8, y: 16 * TILE + 8, key: 'prop_crate' },
      { x: 30 * TILE + 8, y: 15 * TILE + 8, key: 'prop_lantern' },
      { x: 24 * TILE + 8, y: 13 * TILE + 8, key: 'prop_bush' },
      // Academia
      { x: 11 * TILE + 8, y: 5 * TILE + 8, key: 'prop_lantern' },
      { x: 14 * TILE + 8, y: 5 * TILE + 8, key: 'prop_lantern' },
      { x: 13 * TILE + 8, y: 7 * TILE + 8, key: 'prop_table' },
      // Cais
      { x: 32 * TILE + 8, y: 21 * TILE + 8, key: 'prop_lantern' },
      { x: 34 * TILE + 8, y: 22 * TILE + 8, key: 'prop_barrel' },
      { x: 31 * TILE + 8, y: 23 * TILE + 8, key: 'prop_crate' },
    ];

    props.forEach(p => {
      this.scene.add.image(p.x, p.y, p.key).setDepth(DEPTH.OBJECTS);
    });

    // Casas completas (sprites de edifício) — decorativo sobre o tilemap
    const houses = [
      { x: 9 * TILE + 8, y: 11 * TILE, key: 'prop_house_thatch', scale: 0.7 },
      { x: 17 * TILE + 8, y: 15 * TILE, key: 'prop_house_red', scale: 0.65 },
      { x: 32 * TILE + 8, y: 20 * TILE, key: 'prop_house_thatch', scale: 0.6 },
    ];
    houses.forEach(h => {
      const img = this.scene.add.image(h.x, h.y, h.key).setDepth(DEPTH.OBJECTS + 2);
      if (h.scale) img.setScale(h.scale);
    });
  }

  getZoneAt(worldX, worldY) {
    const tx = Math.floor(worldX / TILE);
    const ty = Math.floor(worldY / TILE);
    for (const z of Object.values(this.zones)) {
      if (tx >= z.x1 && tx <= z.x2 && ty >= z.y1 && ty <= z.y2) return z;
    }
    return null;
  }

  getWalls() { return this.walls; }
  getBounds() { return { width: this.width, height: this.height }; }
  getZones() { return this.zones; }
}
