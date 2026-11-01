# MANDARIN ODYSSEY — LISTA OFICIAL DE ASSETS PRIORITÁRIOS
**Versão 1.0 · 2026-10-31**  
Documento de produção visual baseado nas imagens-conceito oficiais + ART_ASSET_GUIDELINES.

Este documento define a ordem de produção e as especificações mínimas para que o jogo atinja o nível visual das referências enviadas.

---

## 1. REFERÊNCIAS VISUAIS OBRIGATÓRIAS

As imagens-conceito abaixo são a **fonte oficial de estilo**. Qualquer asset novo deve ser avaliado contra elas:

| ID | Arquivo | Uso principal |
|----|---------|---------------|
| R01 | REGIÃO 01 — Ilha do Despertar | Tileset base, vila costeira, cais, farol, casas de madeira |
| R02 | REGIÃO 02 — Cidade das Lanternas | Mercado noturno, lanternas, arquitetura urbana, iluminação |
| R03 | REGIÃO 03 — Vale da Vida | Canais, jardins, casas brancas + telhado preto, vegetação |
| R04 | REGIÃO 04 — Montanhas de Jade | Dojo, pedras, bambu, templos, treinamento |
| R05 | REGIÃO 05 — Cidade Imperial | Mercado sofisticado, canais largos, arquitetura imperial |
| C01 | Sr Chen, Dono da casa de chá | Design definitivo do NPC principal da Missão 01 |
| M01 | Missão 01 - A Casa de Chá | Interior da casa de chá + vendedor |
| UI01 | Tela Principal do Jogo | Referência de overworld / mapa de regiões |

**Estilo geral observado nas referências:**
- Pixel art top-down / isometric leve
- Chibi proporcional (cabeça maior)
- Contornos escuros definidos
- Sombreamento por blocos (não gradiente suave)
- Arquitetura chinesa tradicional (telhados curvos, lanternas, portões paifang)
- Paleta quente em áreas diurnas + iluminação artificial forte à noite
- Personagens legíveis mesmo em escala pequena

---

## 2. PRIORIDADE DE PRODUÇÃO

### PRIORIDADE 0 — Pacote de Referência Visual (obrigatório antes de qualquer volume)

Conforme seção 9 do ART_ASSET_GUIDELINES. Sem este pacote aprovado, **não se produz volume**.

| # | Asset | Nome de arquivo | Dimensão | Notas |
|---|-------|-----------------|----------|-------|
| 0.1 | Player (idle + walk 4 dirs) | `player.png` (spritesheet) | 32×48 por frame | Estilo jovem aventureiro, roupa simples azul/vermelha (ver conceito 2 e overworld) |
| 0.2 | NPC masculino (Sr. Chen) | `npc_chen.png` | 32×48 | Baseado na imagem “Sr Chen”. Barba branca, óculos, roupa tradicional azul/branca, postura sábia |
| 0.3 | NPC feminino | `npc_woman_01.png` | 32×48 | Ex.: vendedora ou moradora (ver mercado e vida cotidiana) |
| 0.4 | Prop de cenário | `prop_lantern_hanging.png` | 16×24 ou 16×32 | Lanterna clássica vermelha/dourada |
| 0.5 | Item de inventário | `item_red_apple.png` | 16×16 | Silhueta clara |
| 0.6 | Tileset terreno base | `tileset_island_01.png` | 16×16 (múltiplos) | Grama, caminho de terra/pedra, areia, água |
| 0.7 | Elemento de UI | `ui_dialogue_box.png` | ~312×78 | Moldura legível, estilo papel/madeira |

**Critério de aprovação:** os 7 itens acima devem parecer do mesmo jogo e compatíveis com as imagens-conceito.

---

### PRIORIDADE 1 — Ilha do Despertar (primeira área jogável)

Tudo o que é necessário para a Missão 01 e exploração inicial.

#### 1.1 Personagens
| Asset | Nome | Dimensão | Descrição visual (extraída das refs) |
|-------|------|----------|-------------------------------------|
| Player completo | `player.png` | 32×48 sheet | Idle + walk 4 direções (mín. 3 frames walk) |
| Sr. Chen | `npc_chen.png` | 32×48 sheet | Idoso, barba longa branca, óculos redondos, robe azul escuro + branco, postura sentada/em pé |
| Mercador da vila | `npc_merchant_island.png` | 32×48 | Chapéu de palha ou roupa de comerciante, expressão amigável |
| Aldeão genérico | `npc_villager_01.png` | 32×48 | Variação masculina simples |
| Aldeã genérica | `npc_villager_02.png` | 32×48 | Variação feminina |

#### 1.2 Tileset – Ilha do Despertar
| Categoria | Exemplos de nomes | Dimensão |
|-----------|-------------------|----------|
| Terreno | `tile_grass_01~03`, `tile_dirt`, `tile_path_stone`, `tile_sand`, `tile_water_01~02` | 16×16 |
| Construção | `tile_wall_wood`, `tile_wall_plaster`, `tile_roof_thatch`, `tile_roof_tile_red`, `tile_door_wood`, `tile_window` | 16×16 / 16×32 |
| Natureza | `tile_tree_top`, `tile_tree_trunk`, `tile_bush`, `tile_flower_red`, `tile_rock` | 16×16 / 32×32 |
| Cais / água | `tile_dock_wood`, `tile_boat_small` (objeto), `tile_water_edge` | 16×16 / 32×32 |
| Farol | `prop_lighthouse` (ou tiles modulares) | 32×64 ou composto |

#### 1.3 Props e objetos de cenário
| Asset | Nome | Dimensão | Uso |
|-------|------|----------|-----|
| Lanterna de poste | `prop_lantern_post.png` | 16×32 | Vila e caminhos |
| Barril | `prop_barrel.png` | 16×16 | Cais e armazéns |
| Caixa / saco | `prop_crate.png`, `prop_sack.png` | 16×16 | Mercado da vila |
| Mesa de chá | `prop_tea_table.png` | 32×16 | Interior / exterior casa de chá |
| Banco de madeira | `prop_bench.png` | 32×16 | Praças |
| Poço | `prop_well.png` | 32×32 | Centro da vila |
| Barco pequeno | `prop_boat_small.png` | 48×32 | Cais |

#### 1.4 Interior – Casa de Chá (Missão 01)
Baseado na imagem “Missão 01 - A Casa de Chá” + “Sr Chen”.

| Asset | Nome | Dimensão |
|-------|------|----------|
| Chão de madeira | `tile_floor_wood.png` | 16×16 |
| Parede interior | `tile_wall_interior.png` | 16×16 |
| Mesa longa | `prop_table_long.png` | 48×16 |
| Banquinho redondo | `prop_stool.png` | 16×16 |
| Cesteira de vapor | `prop_bamboo_steamer.png` | 16×16 |
| Rolinho de massa | `prop_rolling_pin.png` | 16×8 |
| Prateleira | `prop_shelf.png` | 32×16 |
| Lanterna suspensa interior | `prop_lantern_hanging.png` | 16×24 |

---

### PRIORIDADE 2 — Cidade das Lanternas

Foco em mercado noturno e atmosfera.

| Tipo | Assets prioritários |
|------|---------------------|
| Tiles | Pedra de rua (`tile_street_stone`), telhado escuro, parede branca/preta |
| Props | Estantes de lanternas coloridas, barracas de comida, portão paifang, leão de pedra, fogos de artifício (efeitos) |
| NPCs | Vendedores de lanternas, clientes, guardas leves |
| Iluminação | Versões “acesas” das lanternas + glow (pode ser tile separado ou efeito) |

---

### PRIORIDADE 3 — Vale da Vida + Montanhas de Jade

| Região | Foco de assets |
|--------|----------------|
| Vale da Vida | Casas brancas + telhado preto, pontes de madeira, jardins, canais, cerejeiras, lotos |
| Montanhas de Jade | Pedras grandes, bambu, telhados verdes, bandeiras vermelhas com 武, piso de treinamento, armas em suporte |

---

### PRIORIDADE 4 — Cidade Imperial + Overworld

- Arquitetura mais ornamentada
- Mapa de overworld (estilo da “Tela Principal do Jogo”)
- Ícones de localização

---

## 3. ESPECIFICAÇÕES TÉCNICAS OBRIGATÓRIAS

### Personagens
- **Frame size:** 32 × 48 px
- **Spritesheet:** horizontal (frames de animação) × vertical (direções)
- **Ordem recomendada de direções:** down → left → right → up
- **Animações mínimas:** idle (1–2 frames) + walk (3–4 frames) por direção
- **Origem:** pés centralizados na base do frame
- **Estilo:** chibi, contorno escuro (#1C1814 ou similar), sombreamento em blocos

### Tiles
- **Base:** 16 × 16 px
- **Autotile / variações:** no mínimo 3 variações de grama e 2 de água
- **Construções:** preferir módulos (parede, teto, porta, janela) para montagem flexível

### Props
- PNG transparente real
- Sem sombra projetada externa (a sombra deve fazer parte do próprio sprite se necessário)
- Escala compatível com personagem 32×48

### Nomenclatura
```
player.png
npc_chen.png
npc_merchant_island.png
tile_grass_01.png
tile_path_stone.png
prop_lantern_hanging.png
item_red_apple.png
ui_dialogue_box.png
```

---

## 4. ORDEM DE ENTREGA RECOMENDADA PARA ARTISTA

1. **Pacote de Referência Visual** (Prioridade 0) → aprovação
2. Player completo + Sr. Chen + tileset terreno da Ilha
3. Props da vila + interior da Casa de Chá
4. NPCs secundários da Ilha
5. Expansão para Cidade das Lanternas
6. Demais regiões

---

## 5. O QUE NÃO FAZER

- Não usar anti-aliasing
- Não misturar estilos (realista + pixel, cartoon ocidental + chinês tradicional)
- Não alterar a proporção 32×48 dos personagens principais sem justificativa
- Não entregar assets com fundo branco ou quadriculado
- Não colocar texto (Hanzi/Pinyin) dentro das imagens de personagem ou tile (texto é responsabilidade da UI)

---

## 6. STATUS ATUAL DO PROJETO (código)

| Item | Status |
|------|--------|
| Estrutura de pastas `assets/` | Implementado |
| Carregamento de spritesheet 32×48 | Implementado |
| Sistema de animações 4 direções | Implementado |
| MapManager modular | Implementado |
| Diálogo legível | Implementado (v1.2+) |
| Assets visuais de qualidade conceito | **Pendente** (placeholders atuais) |

Os placeholders existentes **devem ser substituídos** pelos assets desta lista assim que aprovados. O código já está preparado para a troca (nomes de chave + dimensões).

---

**Próximo passo recomendado:**  
Produzir e aprovar o **Pacote de Referência Visual (Prioridade 0)**.  
Somente depois disso iniciar volume de produção.

Documento mantido em: `ASSET_PRIORITY_LIST.md`
