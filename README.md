# Tarot Card

Este é um aplicativo web simples que simula o embaralhamento e seleção de cartas de tarô. O aplicativo exibe um conjunto de cartas de tarô na tela, permitindo que o usuário clique em uma carta para embaralhá-las e, em seguida, clique novamente para selecionar uma carta aleatória.

## Funcionalidades

- Embaralhar as cartas de tarô clicando em um botão.
- Selecionar uma carta aleatória do baralho embaralhado.
- Exibir a imagem e a descrição da carta selecionada.
- Resetar todas as cartas e voltar ao estado inicial.

## Tecnologias utilizadas

- React: biblioteca JavaScript para construção de interfaces de usuário.
- Axios: biblioteca para fazer requisições HTTP.
- Chakra UI: biblioteca de componentes de interface do usuário para React.
- Framer Motion: biblioteca para animações no React.

## Instalação e execução

1. Clone este repositório em sua máquina local:

`git clone https://github.com/seu-usuario/tarot-card-shuffle.git`

2. Navegue até o diretório do projeto:

`cd tarot`

3. Instale as dependências do projeto:

`yarn install`


5. O aplicativo estará disponível em `http://127.0.0.1/5173/` no seu navegador.

## Testes Unitários

Para rodar os testes disponíveis, utilize o comando:

`yarn test`

## Customização

- Para adicionar novas cartas de tarô, você pode editar o arquivo `tarot.json` no diretório `src` e adicionar os dados das cartas conforme necessário.
- As imagens das cartas devem ser colocadas no diretório `public/images` e podem ser referenciadas usando as constantes `URL_BASE` e `URL_FRONT_IMG` no arquivo `src/constants/url.js`.
- Para customizar a aparência do aplicativo, você pode modificar os estilos e componentes no arquivo `src/Home.js` e utilizar a documentação do Chakra UI para mais opções de personalização.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um problema ou enviar um pull request com melhorias, correções de bugs ou novos recursos.
