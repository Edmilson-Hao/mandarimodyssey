# MANDARIN ODYSSEY — LISTA MESTRE DEFINITIVA DE ASSETS
**Versão 2.0 · Lista completa e final para o jogo ter cara profissional**

Esta é a lista **única e oficial** de todos os arquivos PNG que precisam ser produzidos e enviados.

Formato obrigatório em todos:
- PNG com **transparência real** (canal alpha)
- Sem anti-aliasing
- Sem texto embutido
- Nomes exatamente como escrito abaixo (minúsculo + underline)
- Estilo: pixel art top-down / chibi compatível com as imagens-conceito que você enviou

---

## 1. PERSONAGENS (Spritesheets 32×48)

Cada personagem = 1 spritesheet **96 × 192** px  
(3 frames horizontais × 4 direções verticais)

Ordem das linhas:
```
Linha 0 → down  (idle, walk1, walk2)
Linha 1 → left
Linha 2 → right
Linha 3 → up
```

| # | Arquivo | Personagem | Descrição visual |
|---|---------|------------|------------------|
| 1 | `player.png` | Jogador | Jovem aventureiro, roupa simples azul/vermelha, cabelo escuro |
| 2 | `npc_chen.png` | Sr. Chen | Idoso, barba e cabelo brancos longos, óculos redondos, robe azul escuro + branco |
| 3 | `npc_laoban.png` | Lao Ban | Homem ~40 anos, chapéu de palha, robe laranja/marrom, sash dourado |
| 4 | `npc_mei.png` | Mei | Mulher jovem, roupa de aldeã simples, expressão gentil |
| 5 | `npc_wen.png` | Mestre Wen | Homem ~55 anos, robe de estudioso formal, postura ereta |
| 6 | `npc_xiaoyu.png` | Xiao Yu | Adolescente ~16 anos, roupa de estudante, expressão animada |
| 7 | `npc_hai.png` | Tio Hai | Homem ~50 anos, roupa de pescador desgastada, chapéu de palha |
| 8 | `npc_hua.png` | Hua | Mulher ~35 anos, avental, cabelo preso, expressão calorosa |

**Mínimo para o jogo ficar jogável com cara boa:** itens 1, 2 e 3.

---

## 2. TILESET (16×16)

| # | Arquivo | Uso |
|---|---------|-----|
| 1 | `tile_grass_01.png` | Grama variação 1 |
| 2 | `tile_grass_02.png` | Grama variação 2 |
| 3 | `tile_grass_03.png` | Grama variação 3 |
| 4 | `tile_path_01.png` | Caminho de terra/pedra |
| 5 | `tile_path_02.png` | Caminho variação |
| 6 | `tile_dirt.png` | Terra |
| 7 | `tile_sand.png` | Areia da praia |
| 8 | `tile_water_01.png` | Água (frame 1) |
| 9 | `tile_water_02.png` | Água (frame 2) |
| 10 | `tile_stone.png` | Piso de pedra (Academia) |
| 11 | `tile_wall_wood.png` | Parede de madeira |
| 12 | `tile_wall_plaster.png` | Parede clara / gesso |
| 13 | `tile_roof.png` | Telhado vermelho/telha |
| 14 | `tile_roof_thatch.png` | Telhado de palha |
| 15 | `tile_roof_edge.png` | Beiral do telhado |
| 16 | `tile_door.png` | Porta de madeira |
| 17 | `tile_window.png` | Janela |
| 18 | `tile_dock.png` | Madeira de cais |
| 19 | `tile_tree_top.png` | Copa da árvore |
| 20 | `tile_tree_trunk.png` | Tronco |
| 21 | `tile_bush.png` | Arbusto |
| 22 | `tile_flower.png` | Flor |
| 23 | `tile_rock.png` | Pedra / rocha |

---

## 3. PROPS / OBJETOS DE CENÁRIO

| # | Arquivo | Tamanho sugerido | Uso |
|---|---------|------------------|-----|
| 1 | `prop_lantern.png` | 16×24 ou 16×32 | Lanterna de poste / suspensa |
| 2 | `prop_barrel.png` | 16×16 | Barril |
| 3 | `prop_crate.png` | 16×16 | Caixa |
| 4 | `prop_table.png` | 16×16 ou 32×16 | Mesa |
| 5 | `prop_well.png` | 16×16 ou 32×32 | Poço da vila |
| 6 | `prop_bench.png` | 32×16 | Banco |
| 7 | `prop_boat_small.png` | 48×32 | Barco no cais |
| 8 | `prop_fruit_stall.png` | 32×32 | Banca de frutas |
| 9 | `prop_tea_table.png` | 32×16 | Mesa da casa de chá |
| 10 | `prop_bookshelf.png` | 16×32 | Estante de livros |
| 11 | `prop_fence.png` | 16×16 | Cerca |

---

## 4. UI

| # | Arquivo | Tamanho sugerido |
|---|---------|------------------|
| 1 | `ui_dialogue_box.png` | 312 × 78 |
| 2 | `ui_button.png` | 100 × 26 |
| 3 | `ui_quest_panel.png` | ~140 × 80 (fundo do painel de missões) |
| 4 | `ui_interact_marker.png` | 16×16 |
| 5 | `ui_inventory_slot.png` | 24×24 |

---

## 5. ITENS DE INVENTÁRIO (16×16)

| # | Arquivo | Item |
|---|---------|------|
| 1 | `item_welcome_tea.png` | Chá de Boas-Vindas |
| 2 | `item_red_apple.png` | Maçã Vermelha |
| 3 | `item_student_notebook.png` | Caderno do Estudante |
| 4 | `item_fish.png` | Peixe |
| 5 | `item_dumpling.png` | Pastel / 饺子 |

---

## 6. ESTRUTURA DE PASTAS PARA ENVIO

```
assets_entrega/
├── sprites/
│   ├── player.png
│   ├── npc_chen.png
│   ├── npc_laoban.png
│   ├── npc_mei.png
│   ├── npc_wen.png
│   ├── npc_xiaoyu.png
│   ├── npc_hai.png
│   └── npc_hua.png
├── tiles/
│   └── (todos os tile_*.png)
├── props/
│   └── (todos os prop_*.png)
├── ui/
│   └── (todos os ui_*.png)
└── items/
    └── (todos os item_*.png)
```

---

## 7. ORDEM DE PRODUÇÃO RECOMENDADA

1. **Player + Sr. Chen + Lao Ban** (já dá para sentir o jogo)
2. Tileset básico (grama, caminho, água, parede, telhado, porta)
3. Props essenciais (lanterna, mesa, barril, poço)
4. UI (caixa de diálogo)
5. Restante dos NPCs e itens

---

## 8. O QUE O CÓDIGO JÁ ESPERA

O jogo v2.0 já está preparado para carregar exatamente estes nomes.  
Quando você enviar os PNGs, a integração é direta (substituir na pasta `assets/` e pronto).

---

**Total de arquivos prioritários:** ~50–55 PNGs  
**Mínimo viável para “cara de jogo”:** ~20 PNGs (3 personagens + tileset core + 4 props + dialogue box)

Qualquer dúvida sobre estilo, proporção ou referência visual de um asset específico, pergunte antes de produzir.
