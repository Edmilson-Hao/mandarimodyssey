# MANDARIN ODYSSEY
## WORLD DESIGN — ILHA DO DESPERTAR (MVP)
**Versão 1.0 · 2026-10-31**  
Status: **Aprovado para implementação**  
Responsável: Diretor de Worldbuilding + Game Designer Narrativo

---

## 1. VISÃO GERAL DA ILHA

| Campo | Valor |
|-------|-------|
| **ID** | `region_dawn_island` |
| **Nome PT** | Ilha do Despertar |
| **Nome ZH** | 初来岛 |
| **Pinyin** | Chū lái dǎo |
| **Função** | Área inicial do jogador. Introduz o universo, controles, primeiros NPCs e vocabulário HSK-1 básico. |
| **Nível pedagógico** | HSK-1 (cumprimentos, nomes, objetos cotidianos, números 1-10, alimentos básicos) |
| **Acesso** | Disponível desde o início do jogo |
| **Conexões futuras** | Barco para Cidade das Lanternas (após missão principal da ilha) |

### História e contexto
A Ilha do Despertar é o primeiro ponto de contato do jogador com o mundo. É uma pequena ilha costeira habitada por pescadores, comerciantes e estudiosos que preservam o conhecimento antigo. O jogador chega como um viajante que perdeu a memória das palavras (metáfora pedagógica), e precisa reaprender o mandarim conversando com os habitantes.

### Identidade visual
- Casas de madeira e adobe com telhados de palha ou telha vermelha
- Caminhos de pedra e terra
- Cais de madeira, barcos, farol
- Vegetação tropical leve + pinheiros e bambu
- Atmosfera acolhedora, diurna, com lanternas ao entardecer

### Características geográficas
Ilha pequena, forma irregular, cercada por água azul. Três zonas distintas conectadas por caminhos.

---

## 2. AS TRÊS ZONAS PRINCIPAIS

### 2.1 Vila Inicial
**ID:** `zone_initial_village`

| Campo | Conteúdo |
|-------|----------|
| Nome PT | Vila Inicial |
| Nome ZH | 初始村 |
| Pinyin | Chūshǐ cūn |
| Função | Introdução ao mundo, primeiros NPCs, cumprimentos e apresentações |
| Identidade visual | Casas de madeira, praça central com poço, jardins simples, casa de chá |
| Arquitetura | Madeira + telhado de palha/telha, portas de madeira, janelas pequenas |
| Clima | Ameno, ensolarado |
| Pontos de interesse | Praça Central, Casa de Chá do Sr. Chen, Residências, Poço, Caminho para o Mercado |
| NPCs residentes | Sr. Chen, Aldeão Li, Aldeã Mei |
| Vocabulário predominante | 你好, 我叫, 你呢, 家, 茶, 朋友, 谢谢, 再见 |
| Nível | HSK-1 inicial |
| Requisitos de acesso | Nenhum |
| Conexões | → Mercado (caminho leste), → Academia (caminho norte) |

**Locais internos/externos:**
- `loc_village_square` — Praça central
- `loc_tea_house` — Casa de Chá (interior + exterior)
- `loc_chen_residence` — Residência do Sr. Chen (atrás da casa de chá)
- `loc_well` — Poço da vila

---

### 2.2 Mercado
**ID:** `zone_market`

| Campo | Conteúdo |
|-------|----------|
| Nome PT | Mercado da Ilha |
| Nome ZH | 市场 |
| Pinyin | Shìchǎng |
| Função | Interações comerciais, reconhecimento de objetos, números, cores, pedidos |
| Identidade visual | Bancas cobertas, lanternas, caixas de frutas, cheiro de comida |
| Arquitetura | Barracas de madeira + lona, mesas baixas, estantes |
| Clima | Movimentado durante o dia |
| Pontos de interesse | Banca de Frutas, Banca de Chá e Doces, Loja de Utensílios, Praça de Alimentação |
| NPCs residentes | Lao Ban (comerciante), Vendedora Hua |
| Vocabulário predominante | 苹果, 多少钱, 一, 二, 三..., 红色, 大, 小, 要, 买, 这个 |
| Nível | HSK-1 (objetos + números + cores) |
| Requisitos de acesso | Ter falado com pelo menos 1 NPC da Vila |
| Conexões | ← Vila Inicial, → Cais (futuro barco) |

**Locais:**
- `loc_fruit_stall`
- `loc_tea_stall`
- `loc_tools_shop`
- `loc_food_plaza`

---

### 2.3 Academia do Conhecimento
**ID:** `zone_academy`

| Campo | Conteúdo |
|-------|----------|
| Nome PT | Academia do Conhecimento |
| Nome ZH | 知识书院 |
| Pinyin | Zhīshì shūyuàn |
| Função | Introdução à leitura, Hanzi, estudo, revisão contextualizada |
| Identidade visual | Prédio de madeira mais elaborado, pátio com árvores, estantes de livros, mesas de estudo |
| Arquitetura | Estilo acadêmico tradicional (telhado curvo, colunas, portão) |
| Clima | Tranquilo, sombra de árvores |
| Pontos de interesse | Biblioteca, Pátio de Estudos, Sala do Mestre, Arquivo |
| NPCs residentes | Mestre Wen (professor), Estudante Xiao Yu |
| Vocabulário predominante | 书, 读, 写, 字, 学, 老师, 学生, 请, 问题, 回答 |
| Nível | HSK-1 avançado / transição HSK-2 |
| Requisitos de acesso | Completar a missão “Primeiro Encontro” + ter aprendido pelo menos 15 palavras |
| Conexões | ← Vila Inicial |

**Locais:**
- `loc_library`
- `loc_study_courtyard`
- `loc_master_room`
- `loc_archive`

---

## 3. NPCs PRINCIPAIS (5)

### 3.1 Sr. Chen — 陈先生
**ID:** `npc_chen`

| Campo | Valor |
|-------|-------|
| Nome PT | Sr. Chen |
| Nome ZH | 陈先生 |
| Pinyin | Chén xiānsheng |
| Idade | 68 |
| Ocupação | Dono da Casa de Chá / Guardião do conhecimento local |
| Região | Vila Inicial (`loc_tea_house`) |
| Personalidade | Paciente, sábio, irônico de forma gentil, adora chá e histórias antigas |
| Aparência | Cabelo e barba brancos longos, óculos redondos, robe azul escuro com detalhes brancos e vermelhos |
| Vestimentas | Roupas tradicionais de estudioso |
| Maneirismos | Fala devagar, gesticula com as mãos ao redor da xícara de chá, sorri com os olhos |
| Gostos | Chá de jasmim, caligrafia, ouvir os jovens |
| Desgostos | Pressa, falta de respeito, chá frio |
| Objetivos | Ajudar o jogador a “despertar” as palavras; preservar as histórias da ilha |
| História | Viveu toda a vida na ilha. Foi professor na Academia antes de se aposentar e abrir a casa de chá. |
| Rotina | Manhã: prepara chá na casa. Tarde: conversa na praça. Noite: lê em casa. |
| Estilo de comunicação | Formal educado, frases curtas e claras, usa muitas metáforas de chá |
| Vocabulário predominante | Cumprimentos, família, chá, tempo, sentimentos básicos |
| Função narrativa | Mentor inicial + NPC da Missão Principal 01 |
| Função pedagógica | Introduz cumprimentos, autoapresentação e vocabulário de cortesia |
| Missões | `quest_first_meeting`, `quest_tea_invitation` |
| Itens que oferece | Chá de boas-vindas (item simbólico) |

---

### 3.2 Lao Ban — 老板
**ID:** `npc_laoban`

| Campo | Valor |
|-------|-------|
| Nome PT | Lao Ban |
| Nome ZH | 老板 |
| Pinyin | Lǎobǎn |
| Idade | 42 |
| Ocupação | Comerciante do Mercado |
| Região | Mercado (`loc_fruit_stall`) |
| Personalidade | Extrovertido, falante, bom de barganha, mas justo |
| Aparência | Chapéu de palha, robe laranja/marrom, sash dourado |
| Gostos | Boas vendas, conversa animada, maçãs vermelhas |
| Desgostos | Clientes que não cumprimentam, discussão sem educação |
| Função pedagógica | Números, preços, cores, objetos (frutas) |
| Missões | `quest_first_purchase` |

---

### 3.3 Mei — 美
**ID:** `npc_mei`

| Campo | Valor |
|-------|-------|
| Nome PT | Mei |
| Nome ZH | 美 |
| Pinyin | Měi |
| Idade | 28 |
| Ocupação | Aldeã / ajuda na casa de chá |
| Região | Vila Inicial |
| Personalidade | Gentil, curiosa, um pouco tímida no início |
| Função pedagógica | Família, gostos, perguntas simples “你呢？” |
| Missões | Side quest de apresentação |

---

### 3.4 Mestre Wen — 文老师
**ID:** `npc_master_wen`

| Campo | Valor |
|-------|-------|
| Nome PT | Mestre Wen |
| Nome ZH | 文老师 |
| Pinyin | Wén lǎoshī |
| Idade | 55 |
| Ocupação | Professor da Academia |
| Região | Academia do Conhecimento |
| Personalidade | Sério, exigente, mas justo e encorajador |
| Função pedagógica | Introdução a Hanzi, leitura, estudo |
| Missões | `quest_first_lesson` |

---

### 3.5 Xiao Yu — 小雨
**ID:** `npc_xiaoyu`

| Campo | Valor |
|-------|-------|
| Nome PT | Xiao Yu |
| Nome ZH | 小雨 |
| Pinyin | Xiǎo Yǔ |
| Idade | 16 |
| Ocupação | Estudante da Academia |
| Região | Academia / às vezes Vila |
| Personalidade | Animada, quer fazer amigos, fala um pouco rápido |
| Função pedagógica | Diálogos entre pares, vocabulário de escola e amizade |
| Missões | Side quest de amizade |

---

## 4. FLUXO NARRATIVO INICIAL (MVP)

1. **Chegada** — Jogador aparece na praça da Vila Inicial.
2. **Primeiro contato** — Falar com Mei ou Sr. Chen → aprende 你好 / 我叫...
3. **Missão Principal 01** — “Conheça o Sr. Chen” (visitar a casa de chá).
4. **Exploração da Vila** — Interagir com poço, casas, outros NPCs.
5. **Desbloqueio do Mercado** — Após completar Missão 01.
6. **Missão 02** — “Primeira Compra” com Lao Ban.
7. **Desbloqueio da Academia** — Após Missão 02 + 15 palavras conhecidas.
8. **Missão 03** — “Primeira Lição” com Mestre Wen.
9. **Conclusão do arco da Ilha** — Sr. Chen revela que o jogador está pronto para a próxima ilha.

---

## 5. MISSÕES (Estrutura completa)

### 5.1 quest_first_meeting — “Primeiro Encontro”
- **Categoria:** Main Quest
- **Região:** Vila Inicial
- **NPC responsável:** npc_chen
- **Objetivo narrativo:** O jogador conhece o Sr. Chen e aprende a se apresentar.
- **Objetivo pedagógico:** Cumprimentos + autoapresentação (你好, 我叫, 你呢, 很高兴)
- **Etapas:**
  1. Falar com qualquer NPC da vila (desbloqueia marcador)
  2. Ir até a Casa de Chá
  3. Conversar com Sr. Chen (diálogo roteirizado + livre)
  4. Receber o chá de boas-vindas
- **Recompensa:** Item “Chá de Boas-Vindas”, XP, desbloqueio do Mercado
- **Vocabulário novo permitido:** 你好, 先生, 茶, 请, 谢谢

### 5.2 quest_first_purchase — “Primeira Compra”
- **Categoria:** Main Quest
- **NPC:** npc_laoban
- **Objetivo:** Comprar uma maçã no mercado usando números e cores.
- **Pedagogia:** 多少钱, 一/二/三, 红色, 苹果, 要
- **Recompensa:** Maçã Vermelha, desbloqueio parcial da Academia

### 5.3 quest_first_lesson — “Primeira Lição”
- **Categoria:** Main Quest
- **NPC:** npc_master_wen
- **Objetivo:** Participar da primeira aula na Academia.
- **Pedagogia:** 书, 读, 字, 老师, 学生
- **Recompensa:** Caderno do Estudante, progresso narrativo para saída da ilha

### Side Quests (exemplos)
- `quest_help_mei` — Ajudar Mei a encontrar algo
- `quest_tea_invitation` — Aceitar convite para tomar chá com Chen
- `quest_make_friend` — Tornar-se amigo de Xiao Yu

---

## 6. VOCABULÁRIO CONTROLADO POR ZONA (HSK-1)

**Vila Inicial (core):**
你好, 我, 你, 叫, 什么, 名字, 是, 的, 朋友, 家, 茶, 请, 谢谢, 再见, 先生, 很, 高兴

**Mercado:**
苹果, 红色, 大, 小, 多少, 钱, 一, 二, 三, 四, 五, 要, 买, 这个, 好, 不好

**Academia:**
书, 读, 写, 字, 学, 老师, 学生, 请, 问题, 回答, 懂, 不懂, 再, 一次

---

## 7. LAYOUT ESPACIAL (referência para MapManager)

Mapa lógico da Ilha (aproximado 40×30 tiles):

```
        [Academia]
            |
            |
[Vila Inicial] ---- [Mercado] ---- [Cais]
     |                  |
  [Casa de Chá]     [Bancas]
```

- Vila: centro-oeste
- Mercado: centro-leste
- Academia: norte
- Cais + farol: sudeste (visual + futuro transporte)

---

## 8. ASSETS NECESSÁRIOS (prioridade)

Já listados em `ASSET_PRIORITY_LIST.md`.  
Itens adicionais específicos deste documento:

- Interior da Casa de Chá (chão madeira, mesas, lanternas suspensas)
- Banca de frutas
- Portão da Academia
- Estantes de livros
- Caderno do estudante (item)

---

## 9. STATUS DE IMPLEMENTAÇÃO

| Conteúdo | Status |
|----------|--------|
| Documento de world design | **Criado** (este arquivo) |
| JSON de regiões/zonas | Em criação |
| JSON de NPCs | Em criação |
| JSON de missões | Em criação |
| Mapa no código alinhado às 3 zonas | Pendente de ajuste |
| Diálogos roteirizados | Parcial |
| Sistema de desbloqueio de zonas | Não implementado |

---

**Próxima ação técnica:** gerar os arquivos JSON e integrar no código o mínimo necessário para as 3 zonas e os 5 NPCs.
