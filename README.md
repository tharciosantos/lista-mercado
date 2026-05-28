# Lista de Mercado — PWA

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5C2D91?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**[Acessar demo online](https://lista-mercado-sage.vercel.app/)**

> Aplicativo de lista de compras com foco em UX mobile-first, categorização automática por corredor e suporte offline via PWA.

---

## Visão Geral

<div align="center">
  <img src="public/screenshot.PNG" alt="Visão geral da aplicação" width="100%">
</div>

---

## Sobre o Projeto

O **Lista de Mercado** nasceu da necessidade prática de tornar a ida ao supermercado mais eficiente. Em vez do modelo tradicional de anotação manual, o app oferece uma **Lista Mestra com mais de 90 itens essenciais**, já organizados por categoria (corredor), com suporte a offline via PWA.

O fluxo foi desenhado de forma invertida em relação ao padrão: o usuário carrega a lista completa e **remove apenas o que não precisa**, reduzindo o esforço de entrada de dados no dia a dia.

---

## Funcionalidades

- **Busca e adição de itens** — busca em tempo real com adição direta pelo campo de pesquisa
- **Lista Mestra** — mais de 90 itens predefinidos, prontos para uso
- **Categorização automática** — itens organizados por seção: Hortifruti, Açougue, Mercearia, Frios, Padaria, Higiene, Limpeza e Bebidas
- **Controle de quantidade** — incremento e decremento por item
- **Abas de status** — visualização separada entre itens pendentes e itens já no carrinho
- **Compartilhamento via WhatsApp** — exporta a lista pendente via deep link com mensagem formatada
- **PWA instalável** — funciona offline e pode ser instalado em Android e iOS
- **Persistência local** — dados salvos no `localStorage` do dispositivo

---

## Stack

| Tecnologia | Papel |
|---|---|
| React 19 | Biblioteca de UI e gerenciamento de estado |
| Vite | Bundler e servidor de desenvolvimento |
| Tailwind CSS | Estilização utilitária |
| Lucide React | Ícones |
| vite-plugin-pwa | Geração do Service Worker e manifest |

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx      # Abas de navegação e ações globais
│   ├── Controls.jsx    # Filtro por categoria, campo de busca e adição
│   └── ItemRow.jsx     # Linha de item com controles de quantidade e status
├── App.jsx             # Estado global, lógica de negócio e composição do layout
└── main.jsx            # Ponto de entrada da aplicação
```

---

## Como Rodar Localmente

```bash
git clone https://github.com/tharciosantos/lista-mercado.git
cd lista-mercado
npm install
npm run dev
```

O app estará disponível em `http://localhost:5173`.

---

## Decisões Técnicas

- **`h-[100dvh]`** — garante que o layout ocupe apenas a área visível real em mobile, evitando o overflow causado pela barra de endereço do navegador.
- **Fluxo de remoção (não adição)** — a UX foi invertida propositalmente: o padrão de uso real começa pela Lista Mestra e o usuário filtra o que não precisa, reduzindo atrito.
- **Estado derivado** — as listas de pendentes, carrinho e itens visíveis são calculadas a partir de um único array de estado, sem duplicidade de dados.

---

## Autor

Desenvolvido por **Tharcio Augusto Santos**

- [LinkedIn](https://www.linkedin.com/in/tharcio-santos-dev/)
- [Portfólio](https://tharcio-portfolio.vercel.app/)
