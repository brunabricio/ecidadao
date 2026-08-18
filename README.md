# Petição Cidadã — protótipo interativo

## Estrutura

- `index.html`: núcleo compartilhado e estrutura das etapas do formulário.
- `pages/`: páginas de entrada específicas de cada categoria.
- `assets/css/styles.css`: estilos compartilhados do formulário.
- `assets/css/shared/category-entry.css`: aparência comum das páginas de categoria.
- `assets/js/app.js`: navegação, validações, máscaras e comportamentos compartilhados.
- `assets/js/shared/category-entry.js`: encaminhamento das páginas de categoria ao núcleo.

Cada diretório dentro de `pages/` contém:

- `index.html`: entrada HTML da categoria;
- `category.css`: personalização visual isolada;
- `category.js`: identificação e configuração da categoria.

Categorias disponíveis:

- `pages/interrupcao-servico/`
- `pages/vicio-produto/`
- `pages/voo-bagagens/`
- `pages/acidente-transito/`
- `pages/negativacao/`
- `pages/toi/`

## Execução

O protótipo pode ser iniciado pelo `index.html` ou diretamente pelo `index.html` de uma categoria. Os caminhos são relativos e funcionam localmente e na Vercel.

As etapas comuns não são duplicadas entre as categorias. A página específica informa sua categoria pela URL, e o núcleo compartilhado monta o fluxo correspondente apenas em memória.

## Observação

Não há backend nem persistência de dados. Os valores informados permanecem somente na memória da página durante a simulação.
