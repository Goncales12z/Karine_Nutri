# Karine Herd Nutricionista: site institucional

Site estático (HTML, CSS e JavaScript puro) para a Karine Herd, nutricionista (CRN 04100336) no Centro do Rio de Janeiro. Sem build, sem framework, sem banco de dados.

Quinto site da série, com identidade própria: paleta laranja-pôr-do-sol + dourado + verde-folha (extraída da logo KCH), tipografia arredondada e amigável (Baloo 2 + Mulish) — bem diferente dos quatro sites anteriores (despachantes em preto/amarelo, navy/ciano e carmim/dourado; e a outra nutricionista em rosa/sálvia e serifa elegante).

## Estrutura

```
karine-nutricionista/
├── index.html                  Página única (todas as seções)
├── README.md                   Este arquivo
├── favicon.ico
├── css/
│   └── style.css               Estilos, tokens de cor e tipografia
├── js/
│   ├── main.js                 Animações, revelações no scroll, cópia de contato
│   └── vendor/
│       ├── anime.min.js        anime.js 3.2.2 (licença MIT)
│       └── anime-LICENSE.md
└── img/
    ├── logo.png                Logo completa "KCH" (letras laranja/amarelo/verde), fundo e cabelo removidos
    ├── heart-icon.png          Só o ícone de coração com folha, usado no cabeçalho e rodapé
    ├── karine.jpg              Foto de lifestyle (recortada do post original, sem o bloco de texto)
    ├── favicon-180.png
    ├── favicon-192.png
    └── favicon-512.png
```

## Como testar no computador

```bash
cd karine-nutricionista
python3 -m http.server 8000
# abra http://localhost:8000
```
Abra por um servidor local, não clicando duas vezes no arquivo.

## Como publicar

1. **GitHub Pages:** suba a pasta inteira (mantendo a estrutura) em um repositório, vá em *Settings > Pages* e escolha a branch `main` na raiz.
2. **Domínio próprio:** aponte o domínio para o GitHub Pages depois de publicado.

## O que editar

| O quê | Onde |
|---|---|
| Número do WhatsApp e mensagem padrão | `js/main.js`, objeto `CFG` no topo |
| Textos, especializações, FAQ, avaliações | `index.html` |
| Cores, fontes e espaçamentos | `css/style.css`, bloco `:root` (tokens) |
| Logo e foto | `img/logo.png`, `img/heart-icon.png`, `img/karine.jpg` |
| Dados para o Google (nota, endereço, telefone) | `index.html`, bloco `application/ld+json` no `<head>` |

## Confirmar com a cliente antes de publicar

- Se (21) 99133-6016 é o WhatsApp certo para agendamentos (veio do perfil do Google).
- **CRN 04100336** está em destaque em três lugares (selo na hero, faixa de números, cartão de confiança) — confirme que está correto, já que é a principal prova de legitimidade do site.
- "+20 anos de experiência" veio da descrição dela no Google ("mais de 20 anos de experiência") — vale confirmar o número exato.
- A lista de especializações (reeducação alimentar, fitoterapia, nutrição biofuncional, ortomolecular) também veio da descrição do perfil dela — confirme se é isso mesmo que ela quer destacar.
- Se atende presencial, online, ou os dois — o FAQ ficou em aberto ("me chame para confirmar a modalidade") por não ter essa informação.
- A foto foi recortada de um post do Instagram (tinha um bloco de texto do lado esquerdo) — se ela tiver a imagem original sem o texto, em resolução maior, fica ainda melhor no hero.
- Ela também tem avaliação 5,0 no Doctoralia (2 comentários) — mencionei isso no site; vale confirmar se ela quer manter esse selo em destaque.

## Detalhes de design

- **Hero:** foto de lifestyle dela (pôr do sol, prato de comida) em destaque, com um anel tracejado girando lentamente ao redor, selo de nota do Google e selo "+20 anos" sobrepostos.
- **Faixa de números:** CRN, anos de experiência, nota no Google e no Doctoralia, lado a lado em fundo escuro.
- **Especializações:** em formato de "chips" (pílulas) coloridas, diferente dos cards em grade dos outros sites.
- **Como funciona:** três passos em cards simples, sem linha de conexão nem mascote animado.
- **Confiança:** cartão laranja com o CRN em destaque, ao lado dos itens de verificação.
- **Acessibilidade:** foco visível, `prefers-reduced-motion` respeitado, tema claro/escuro (testado em ambos os modos, com atenção especial aos elementos de fundo sempre claro/sempre escuro para nunca ficarem ilegíveis), textos longos com quebra segura.
- **Revelação sincronizada:** cartões de um mesmo grupo (especializações, passos, avaliações) entram juntos na tela.

## Dependências externas

- Fontes: Baloo 2 e Mulish, via Google Fonts (com fontes de reserva se falharem).
- anime.js 3.2.2 incluído localmente em `js/vendor/` — não depende de CDN.

## Créditos

Logo e foto: Karine Herd Nutricionista - KCH Nutrição e Qualidade de Vida. anime.js: Julian Garnier, licença MIT.
