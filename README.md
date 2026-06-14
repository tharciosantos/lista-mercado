# Lista de Mercado

Aplicação web progressiva para criação e organização de listas de compras. O projeto permite separar itens por categorias, controlar quantidades, acompanhar o que já foi colocado no carrinho e compartilhar a lista pendente pelo WhatsApp.

## Status do projeto

**Concluído como projeto de estudo, com versão disponível em produção.**

As funcionalidades principais de gerenciamento da lista e instalação como PWA estão implementadas. O projeto pode continuar evoluindo com testes, acessibilidade e opções adicionais de personalização.

## Objetivo do projeto

O Lista de Mercado foi criado para facilitar a preparação e o acompanhamento de compras diretamente pelo navegador, com uma interface organizada por setores comuns de supermercado.

O projeto também tem como objetivo praticar gerenciamento de estado com React, persistência local, filtros, componentes reutilizáveis, integração com recursos do navegador e configuração de uma Progressive Web App.

## Demonstração

- **Aplicação em produção:** [https://lista-mercado-sage.vercel.app/](https://lista-mercado-sage.vercel.app/)
- **Repositório:** [https://github.com/tharciosantos/lista-mercado](https://github.com/tharciosantos/lista-mercado)

![Tela principal do Lista de Mercado](public/screenshot.PNG)

## Funcionalidades implementadas

### Organização da lista

- Adição manual de itens com nome e quantidade.
- Lista Mestra com 83 itens predefinidos.
- Carregamento dos itens predefinidos na lista atual.
- Organização por categorias: Hortifruti, Açougue, Mercearia, Frios, Padaria, Higiene, Limpeza e Bebidas.
- Filtro de itens por categoria.
- Busca em tempo real pelo nome do item.
- Exclusão individual de itens pendentes.
- Reinicialização completa da lista com confirmação.

### Acompanhamento da compra

- Controle de quantidade com incremento e decremento, respeitando o mínimo de uma unidade.
- Marcação de itens como colocados no carrinho.
- Separação entre as abas de itens pendentes e itens no carrinho.
- Contadores de itens pendentes e concluídos.
- Retorno de um item do carrinho para a lista de pendentes.

### Persistência e compartilhamento

- Persistência dos dados no `localStorage` do navegador.
- Recuperação automática da lista salva ao abrir a aplicação.
- Compartilhamento dos itens pendentes pelo WhatsApp por meio de um link com mensagem formatada.

### Progressive Web App

- Manifest configurado com nome, cores, orientação e modo de exibição independente.
- Ícones próprios nos tamanhos 192 por 192 e 512 por 512 pixels.
- Service Worker gerado pelo `vite-plugin-pwa`.
- Atualização automática do Service Worker.
- Instalação pelo navegador em dispositivos compatíveis.
- Acesso aos arquivos da aplicação armazenados pelo Service Worker quando estiverem disponíveis em cache.

## Tecnologias utilizadas

### Front-end

- React 19
- Vite 7
- Tailwind CSS 3
- Lucide React

### PWA e persistência

- vite-plugin-pwa
- Web App Manifest
- Service Worker
- localStorage

### Qualidade e deploy

- ESLint
- Vercel

> O projeto não possui back-end próprio, banco de dados remoto ou autenticação. Todos os itens são armazenados localmente no navegador em uso.

## Estrutura geral do projeto

```text
lista-mercado/
├── public/
│   ├── pwa-192x192.png         # Ícone da PWA
│   ├── pwa-512x512.png         # Ícone da PWA
│   └── screenshot.PNG          # Imagem utilizada no README
├── src/
│   ├── components/
│   │   ├── Controls.jsx        # Categorias, busca, quantidade e adição
│   │   ├── Header.jsx          # Abas, contadores e ações globais
│   │   └── ItemRow.jsx         # Item, quantidade, status e exclusão
│   ├── App.jsx                 # Estado, regras da lista e composição da interface
│   ├── index.css               # Estilos globais
│   └── main.jsx                # Ponto de entrada da aplicação
├── package.json                # Dependências e scripts
├── tailwind.config.js          # Configuração do Tailwind CSS
└── vite.config.js              # Configuração do Vite e da PWA
```

## Como executar localmente

### Pré-requisitos

- Node.js compatível com o Vite 7
- npm

### 1. Clone o repositório

```bash
git clone https://github.com/tharciosantos/lista-mercado.git
cd lista-mercado
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm run dev
```

O Vite informará a URL local no terminal, normalmente [http://localhost:5173](http://localhost:5173).

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera o build de produção e os arquivos da PWA. |
| `npm run lint` | Executa o ESLint. |
| `npm run preview` | Executa localmente o build gerado. |

## Variáveis de ambiente

O projeto não utiliza variáveis de ambiente atualmente e não possui arquivos `.env`.

Não é necessário configurar serviços externos para executar a aplicação. O compartilhamento utiliza o endereço público do WhatsApp e os dados da lista permanecem no `localStorage`.

## Testes

O projeto ainda não possui testes automatizados nem scripts de teste configurados no `package.json`.

A validação disponível atualmente é feita pelo ESLint e pelo processo de build do Vite.

## Aprendizados

- Gerenciamento de estado e efeitos com React.
- Organização da interface em componentes reutilizáveis.
- Criação de filtros e busca em tempo real.
- Uso de estado derivado para separar itens pendentes e concluídos.
- Persistência de dados com localStorage.
- Integração com o compartilhamento do WhatsApp por URL.
- Configuração de manifest e Service Worker para PWA.
- Construção de uma interface adaptada a telas menores.
- Estilização com Tailwind CSS.
- Deploy de uma aplicação Vite na Vercel.

## Próximos passos

- **Planejado:** implementar testes automatizados para os fluxos da lista.
- **Planejado:** melhorar a acessibilidade dos controles e mensagens da interface.
- **Planejado:** permitir edição do nome ou da categoria de um item existente.
- **Planejado:** permitir personalização da Lista Mestra e das categorias.
- **Planejado:** adicionar uma opção de exportação da lista em outros formatos.
- **Planejado:** melhorar o tratamento de dados inválidos armazenados no `localStorage`.
- **Planejado:** validar o comportamento offline e de instalação da PWA em diferentes navegadores e dispositivos.

## Autor

**Nome:** Tharcio Santos  
**GitHub:** [https://github.com/tharciosantos](https://github.com/tharciosantos)  
**LinkedIn:** [https://www.linkedin.com/in/tharcio-santos-dev/](https://www.linkedin.com/in/tharcio-santos-dev/)  
**Portfólio:** [https://tharcio-portfolio.vercel.app/](https://tharcio-portfolio.vercel.app/)
