# MANDARIN ODYSSEY — LISTA DE ASSETS QUE VOCÊ PRECISA ENVIAR
**Para o jogo ter cara de jogo de verdade**

Os placeholders atuais **nunca** vão ficar no nível das suas imagens-conceito.  
Abaixo está a lista **exata** do que você (ou um artista) precisa produzir e me enviar em PNG.

---

## FORMATO OBRIGATÓRIO (não negociável)

| Tipo | Dimensão | Formato | Observação |
|------|----------|---------|------------|
| Personagem | **32 × 48** por frame | PNG transparente | Spritesheet horizontal |
| Tile | **16 × 16** | PNG transparente | Sem anti-aliasing |
| Prop / objeto | 16×16 ou 16×32 ou 32×32 | PNG transparente | — |
| UI | conforme lista | PNG transparente | Sem texto embutido |

**Estilo de referência obrigatório:** as imagens-conceito que você já enviou (especialmente REGIÃO 01, mercado de lanternas e Sr. Chen).

---

## PRIORIDADE 1 — Personagens (crítico)

Cada personagem precisa de **spritesheet 96×192** (3 frames walk × 4 direções) **ou** arquivos separados.

| Arquivo | Quem é | Frames necessários |
|---------|--------|--------------------|
| `player.png` | Jogador (jovem aventureiro) | idle + walk 4 dirs |
| `npc_chen.png` | Sr. Chen (idoso, barba branca, óculos, robe azul/branco) | idle + walk 4 dirs |
| `npc_laoban.png` | Lao Ban (comerciante, chapéu de palha, robe laranja) | idle + walk 4 dirs |
| `npc_mei.png` | Mei (aldeã jovem, gentil) | idle + walk 4 dirs |
| `npc_wen.png` | Mestre Wen (professor, robe de estudioso) | idle + walk 4 dirs |
| `npc_xiaoyu.png` | Xiao Yu (estudante 16 anos, animada) | idle + walk 4 dirs |
| `npc_hai.png` | Tio Hai (pescador, roupa desgastada) | idle + walk 4 dirs |
| `npc_hua.png` | Hua (vendedora de comida, avental) | idle + walk 4 dirs |

**Ordem do spritesheet recomendada:**
```
Row 0: down  (idle, walk1, walk2)
Row 1: left
Row 2: right
Row 3: up
```

---

## PRIORIDADE 2 — Tileset da Ilha do Despertar

| Arquivo | Descrição |
|---------|-----------|
| `tile_grass_01.png` ~ `03.png` | Grama com variação |
| `tile_path_stone.png` | Caminho de pedra |
| `tile_dirt.png` | Terra |
| `tile_sand.png` | Areia da praia |
| `tile_water_01.png` / `02.png` | Água com animação leve |
| `tile_wall_wood.png` | Parede de madeira |
| `tile_wall_plaster.png` | Parede clara |
| `tile_roof_red.png` | Telhado vermelho |
| `tile_roof_thatch.png` | Telhado de palha |
| `tile_door.png` | Porta de madeira |
| `tile_window.png` | Janela |
| `tile_dock.png` | Madeira de cais |
| `tile_tree_top.png` / `tile_tree_trunk.png` | Árvore |
| `tile_bush.png` | Arbusto |
| `tile_flower.png` | Flor |
| `tile_rock.png` | Pedra |

---

## PRIORIDADE 3 — Props e objetos de cenário

| Arquivo | Uso |
|---------|-----|
| `prop_lantern.png` | Lanterna de poste / suspensa |
| `prop_barrel.png` | Barril |
| `prop_crate.png` | Caixa |
| `prop_table.png` | Mesa |
| `prop_well.png` | Poço da vila |
| `prop_boat_small.png` | Barco no cais |
| `prop_bench.png` | Banco |
| `prop_fruit_stall.png` | Banca de frutas (pode ser 32×32 ou maior) |
| `prop_tea_table.png` | Mesa da casa de chá |
| `prop_bookshelf.png` | Estante (Academia) |

---

## PRIORIDADE 4 — UI

| Arquivo | Dimensão sugerida |
|---------|-------------------|
| `ui_dialogue_box.png` | ~312 × 78 |
| `ui_button.png` | ~100 × 26 |
| `ui_quest_panel.png` | fundo do painel de missões |
| `ui_inventory_slot.png` | 16×16 ou 24×24 |
| `ui_interact_marker.png` | 16×16 (exclamação / balão) |

---

## PRIORIDADE 5 — Itens de inventário (16×16)

- `item_welcome_tea.png`
- `item_red_apple.png`
- `item_student_notebook.png`
- `item_fish.png`
- `item_dumpling.png`

---

## COMO ME ENVIAR

1. Todos os arquivos em **PNG com transparência real** (canal alpha).
2. Nomes exatamente como na lista (minúsculo, underline).
3. Pode mandar em pastas:
   ```
   sprites/
   tiles/
   props/
   ui/
   items/
   ```
4. Assim que receber, eu integro em < 1 hora e o visual sobe de verdade.

---

## O QUE NÃO PRECISA MANDAR AGORA

- Animações complexas de combate
- Tiles de outras regiões (Cidade das Lanternas etc.) — depois
- Efeitos de partículas
- Áudio

---

**Resumo:**  
Com os **8 personagens + tileset da ilha + props básicos + UI**, o jogo finalmente terá cara de jogo real no padrão das suas referências.

Qualquer dúvida sobre um asset específico, pergunte antes de produzir.
