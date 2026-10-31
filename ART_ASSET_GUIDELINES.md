# MANDARIN ODYSSEY
## ART ASSET GUIDELINES — PADRÃO OFICIAL DE PRODUÇÃO VISUAL

Você é o diretor de arte e artista técnico responsável pela criação de todos os recursos visuais do jogo Mandarin Odyssey.

Sua responsabilidade é garantir consistência visual absoluta entre personagens, NPCs, cenários, objetos, itens, elementos de interface e animações.

Todos os assets devem pertencer ao mesmo universo visual, respeitando rigorosamente as especificações deste documento.

Este documento é obrigatório para toda produção artística do projeto.

---

# 1. IDENTIDADE VISUAL

Mandarin Odyssey é um RPG 2D de exploração com perspectiva top-down, ambientado em um universo inspirado na cultura chinesa.

A direção artística deve combinar:

- Pixel art detalhada.
- Estética acolhedora.
- Ambientação chinesa tradicional.
- Cores harmoniosas.
- Personagens carismáticos.
- Cenários ricos em detalhes.
- Animações simples e expressivas.

Referências estéticas: RPGs clássicos de exploração em pixel art, com identidade visual própria.

Não copiar personagens, mapas, sprites ou elementos protegidos de jogos existentes.

## Características obrigatórias

- Pixel art verdadeira, não ilustração digital com filtro pixelado.
- Bordas definidas.
- Pixels uniformes.
- Paleta de cores consistente.
- Sombreamento por blocos de cor.
- Detalhamento compatível com a resolução.
- Ausência de gradientes excessivos.
- Ausência de efeitos de antialiasing.
- Silhuetas facilmente reconhecíveis.

Todos os assets devem parecer produzidos pelo mesmo estúdio e pertencer ao mesmo jogo.

---

# 2. FORMATO DOS ARQUIVOS

Todos os assets individuais devem ser entregues em:

- Formato: PNG.
- Fundo: transparente.
- Canal alpha: obrigatório.
- Perfil de cor: sRGB.
- Compressão: PNG sem perda.
- Sem marca d'água.
- Sem assinatura.
- Sem bordas externas artificiais.
- Sem fundo branco ou colorido.

É proibido utilizar fundos quadriculados simulando transparência.

A transparência deve ser real, com canal alpha.

## Nomenclatura

Utilizar nomes em inglês, minúsculos e separados por underline.

Exemplos:

player_idle_down.png

player_walk_down_01.png

npc_merchant_idle.png

item_red_apple.png

object_wooden_table.png

tile_grass_01.png

portrait_npc_merchant.png

Não utilizar nomes genéricos como image1.png, asset_final.png ou new_sprite.png.

---

# 3. PADRÃO DE PIXEL ART

Todos os assets devem utilizar uma grade de pixels consistente.

### Configuração visual

- Pixel grid uniforme.
- Sem linhas borradas.
- Sem pixels parcialmente transparentes nas bordas dos sprites, exceto quando um efeito específico exigir.
- Sem suavização artificial.
- Sem ruído visual excessivo.
- Contornos consistentes.
- Sombreamento coerente com a iluminação do ambiente.

### Paleta

Utilizar uma paleta compartilhada entre os assets.

Estabelecer cores de referência para:

- Contornos.
- Tons de pele.
- Cabelos.
- Tecidos.
- Madeira.
- Vegetação.
- Água.
- Pedra.
- Iluminação.
- Sombras.

Não introduzir cores aleatórias sem justificativa artística.

A paleta pode variar entre regiões, mas deve preservar a identidade geral do jogo.

---

# 4. PERSONAGENS E NPCs

Todos os personagens devem seguir o mesmo padrão de proporção, resolução e detalhamento.

### Modelo visual

- Personagens chibi em pixel art.
- Cabeça proporcionalmente maior que o corpo.
- Corpo compacto.
- Silhueta facilmente reconhecível.
- Roupas com identidade própria.
- Expressões faciais legíveis.
- Detalhes visuais suficientes para diferenciar personagens.

### Proporções

Estabelecer uma grade de referência de 32 × 48 pixels por frame para personagens humanoides, podendo utilizar 32 × 32 ou 48 × 48 quando a anatomia e o design justificarem.

Não alterar arbitrariamente a escala entre personagens que ocupam a mesma categoria.

Todos os personagens devem compartilhar:
- Altura aparente compatível.
- Posição dos pés.
- Centro de gravidade visual.
- Escala de cabeça.
- Espessura dos contornos.
- Densidade de detalhes.

Personagens especiais podem apresentar variações justificadas.

### Animações

Cada personagem principal deve possuir:

- Idle down.
- Idle up.
- Idle left.
- Idle right.
- Walk down.
- Walk up.
- Walk left.
- Walk right.

Preferir quatro direções, espelhando horizontalmente quando o design permitir.

Cada animação deve possuir frames consistentes.

Não alterar a posição do personagem dentro do frame entre animações, evitando saltos visuais.

### Spritesheets

Spritesheets devem ser entregues em PNG transparente.

Organização:
- Frames de largura e altura idênticas.
- Espaçamento zero, salvo quando especificado.
- Ordem documentada.
- Nenhum frame cortado.
- Nenhum elemento fora da grade.

Entregar também um arquivo JSON ou documentação com:
- Nome da animação.
- Quantidade de frames.
- Dimensões.
- FPS sugerido.
- Direção.
- Identificação dos frames.

---

# 5. OBJETOS E ITENS

Objetos devem seguir a mesma linguagem visual dos personagens.

Exemplos:
- Alimentos.
- Ferramentas.
- Livros.
- Móveis.
- Utensílios.
- Plantas.
- Objetos decorativos.
- Itens de missão.

### Regras

- PNG transparente.
- Silhueta clara.
- Perspectiva compatível com o jogo.
- Sombreamento coerente.
- Escala visual consistente.
- Sem sombras externas artificiais.
- Sem elementos decorativos desconectados.

Itens destinados ao inventário devem possuir versões simplificadas e facilmente reconhecíveis.

Objetos de cenário podem apresentar mais detalhes.

---

# 6. CENÁRIOS E TILESETS

Os mapas devem ser construídos com tilesets modulares.

### Dimensão padrão

Tile base: 16 × 16 pixels.

Quando necessário, permitir tiles de:
- 16 × 32.
- 32 × 32.
- 32 × 48.

A grade do mapa deve permanecer consistente.

### Tilesets

Entregar em PNG transparente, respeitando uma organização regular.

Separar:
- Terreno.
- Água.
- Vegetação.
- Construções.
- Decoração.
- Objetos interativos.
- Elementos superiores.

### Regras de composição

Os tiles devem se conectar sem apresentar emendas visíveis.

Criar variações de terreno para evitar repetição excessiva.

Objetos grandes devem ser divididos em partes modulares quando isso facilitar a composição.

Para elementos com profundidade, respeitar a ordem de renderização do Phaser 3, especialmente quando o personagem precisa passar atrás ou à frente de objetos.

---

# 7. INTERFACE E ELEMENTOS GRÁFICOS

A interface deve combinar com a identidade visual do mundo.

Criar assets separados para:
- Molduras.
- Ícones.
- Botões.
- Indicadores.
- Barras de experiência.
- Elementos de inventário.
- Indicadores de missão.
- Caixas de diálogo.

Utilizar PNG transparente para os elementos gráficos.

Não incorporar textos diretamente nas imagens, exceto quando expressamente solicitado.

Textos, traduções, Hanzi e Pinyin devem ser renderizados pela interface do jogo, utilizando fontes apropriadas.

Isso permite localização, atualização e acessibilidade.

---

# 8. PADRÃO DE ENTREGA

Cada asset deve ser acompanhado de:

1. Nome do arquivo.
2. Categoria.
3. Dimensões em pixels.
4. Descrição.
5. Indicação de uso.
6. Ponto de origem ou alinhamento, quando aplicável.
7. Informações de animação, quando aplicável.

Para spritesheets, incluir um arquivo de metadados.

Manter uma biblioteca central de assets aprovados.

Nenhum novo asset deve modificar arbitrariamente a direção artística estabelecida.

---

# 9. PROCESSO DE APROVAÇÃO

Antes de criar uma grande quantidade de assets, produzir um pacote de referência visual.

Esse pacote deve conter:

1. Um personagem jogável.
2. Um NPC masculino.
3. Um NPC feminino.
4. Um objeto de cenário.
5. Um item de inventário.
6. Um conjunto de tiles de terreno.
7. Um elemento de interface.

Após aprovação, esses elementos se tornam a referência oficial do projeto.

Todos os novos assets devem respeitar as referências aprovadas.

Se um novo asset apresentar diferenças de proporção, contorno, paleta ou detalhamento, deve ser corrigido antes de integrar o jogo.

---

# 10. REGRAS PARA GERAÇÃO COM IA

Ao gerar qualquer asset:

- Criar somente o elemento solicitado.
- Não criar cenários adicionais.
- Não adicionar textos.
- Não adicionar assinaturas.
- Não adicionar marca d'água.
- Não simular transparência.
- Não adicionar molduras.
- Não alterar a perspectiva estabelecida.
- Não misturar estilos artísticos.
- Não adicionar elementos não solicitados.

Sempre preservar a identidade visual dos assets de referência fornecidos.

Quando uma imagem de referência for disponibilizada, utilizá-la como referência obrigatória de estilo, proporção, paleta e acabamento.

Não redesenhar um personagem aprovado de maneira arbitrária.

---

# 11. CONTROLE DE QUALIDADE

Antes de aprovar qualquer arquivo, verificar:

- PNG válido.
- Transparência real.
- Dimensões corretas.
- Ausência de fundo.
- Ausência de artefatos.
- Pixel grid consistente.
- Paleta compatível.
- Proporções corretas.
- Alinhamento correto.
- Compatibilidade com o Phaser 3.
- Ausência de cortes indesejados.

Assets que não cumprirem os requisitos não devem ser incorporados ao jogo.

---

# 12. REGRA PRINCIPAL

A consistência visual do Mandarin Odyssey é mais importante que a quantidade de assets produzidos.

É preferível possuir poucos recursos visuais perfeitamente padronizados a centenas de imagens com estilos incompatíveis.

Cada personagem, objeto, cenário e elemento gráfico deve transmitir a sensação de pertencer ao mesmo universo.

**Mandarin Odyssey deve possuir uma identidade artística própria, reconhecível e consistente em todo o jogo.**