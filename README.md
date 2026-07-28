# Baby Ofertas

Site estático (HTML/CSS/JS puro, sem build) do Baby Ofertas — guias honestos e achadinhos de bebê, com captura de e-mail/Telegram para envio de ofertas.

Publicado via GitHub Pages no domínio `babyofertas.com.br` (ver `CNAME`).

## Estrutura

```
index.html                     → página inicial (guias em destaque, achadinhos, captura de e-mail)
guias/
  index.html                   → lista de todos os guias
  enxoval-o-que-comprar.html
  quanto-custa-primeiro-ano.html
  sono-recem-nascido.html
  mamadeira-bicos-esterilizacao.html
  mala-da-maternidade.html
  brinquedos-por-idade.html
  fraldas-descartavel-ou-ecologica.html
css/site.css                   → estilos compartilhados por todas as páginas
js/site.js                     → modal de política de privacidade, ano do rodapé e envio do formulário
```

## Rodar localmente

Como é um site 100% estático, basta servir a pasta com qualquer servidor HTTP simples:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Captura de e-mail / Telegram

O formulário de inscrição (seção "Entre na lista", em `index.html`) envia os dados via `POST` para um Google Apps Script. Antes de publicar, configure:

1. Abra `js/site.js` e substitua `APPS_SCRIPT_URL` pela URL do seu Apps Script publicado como Web App.
2. O formulário registra nome (opcional), e-mail, canais escolhidos, consentimento (versão + IP + data/hora), conforme a LGPD.
3. Atualize o e-mail de contato do encarregado/DPO no modal de Política de Privacidade (em cada página, procure por `seu-email-de-contato@exemplo.com`).

## Achadinhos

Os itens da seção "Achadinhos da semana" na home ainda são exemplos ilustrativos. Substitua pelos produtos e links de afiliado reais (Amazon, Shopee, Mercado Livre etc.) quando estiverem definidos.

## Adicionar um novo guia

1. Duplique um arquivo existente em `guias/` como base.
2. Ajuste `<title>`, `<meta name="description">`, breadcrumb, `.tag`, título e conteúdo do artigo.
3. Adicione um card para ele em `guias/index.html` e, se fizer sentido, em `index.html`.
