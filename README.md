# Task Manager

## Visão Geral

O **Task Manager** é uma aplicação web moderna para gerenciamento de tarefas, projetos e workspaces colaborativos, construída com tecnologias de ponta tanto no frontend quanto no backend. A aplicação permite a organização eficiente de tarefas entre membros de diferentes workspaces, proporcionando integração perfeita entre equipes e maior produtividade.

### Funcionalidades Principais:

* Gerenciamento de Workspaces e Projetos.
* Criação, edição e exclusão de Tarefas.
* Integração com Google OAuth2 para autenticação.
* Colaboração em tempo real entre membros de um workspace.
* Interface moderna e responsiva com Next.js, Tailwind CSS e ShadCN UI.

---

## Estrutura do Projeto

```
Task-Manager/
├── client/                # Frontend (Next.js, TypeScript, TailwindCSS)
│   ├── public/
│   ├── src/
│   └── package.json
│
└── server/                # Backend (Node.js, Express, MongoDB, TypeScript)
    ├── application/
    ├── domain/
    ├── infrastructure/
    ├── interfaces/
    ├── shared/
    └── package.json
```

---

## Tecnologias Utilizadas

### Frontend:

* **Next.js** — Server-side rendering e geração estática de páginas.
* **TypeScript** — Tipagem estática para maior segurança.
* **Tailwind CSS** — Estilização rápida e responsiva.
* **ShadCN UI** — Biblioteca de componentes acessíveis e customizáveis.
* **React Query** — Gerenciamento de estado assíncrono (requisições e cache).
* **Axios** — Cliente HTTP para integração com APIs.
* **Zod** — Validação de schemas no frontend.

### Backend:

* **Node.js** com **Express** — Construção da API REST.
* **MongoDB** com **Mongoose** — Banco de dados NoSQL para persistência.
* **TypeScript** — Segurança e robustez na tipagem.
* **Passport.js** — Autenticação via Google OAuth2.
* **Jest** — Testes unitários e de integração.
* **Clean Architecture** — Organização em camadas para maior desacoplamento.
* **DDD (Domain-Driven Design)** — Definição clara de entidades e regras de negócio.

---

## Instalação e Execução

### Pré-requisitos

* Node.js (v16+)
* MongoDB
* Bun ou npm

### Passos para iniciar o projeto:

1️⃣ Clone o repositório:

```bash
git clone <URL do repositório>
cd Task-Manager
```

2️⃣ Instale as dependências do frontend e backend:

```bash
cd client && bun install
cd ../server && bun install
```

3️⃣ Configure as variáveis de ambiente:

* Crie um arquivo `.env` em `/server` com as seguintes variáveis:

  * `MONGO_URI`: URL do banco de dados MongoDB
  * `GOOGLE_CLIENT_ID`: ID do Google OAuth2
  * `GOOGLE_CLIENT_SECRET`: Secret do Google OAuth2

4️⃣ Execute ambos os servidores:

```bash
cd client && bun dev
cd ../server && bun dev
```

A aplicação estará acessível em: [http://localhost:3000](http://localhost:3000)

---

## Documentação da API

A documentação completa dos endpoints da API pode ser encontrada em `/server/docs` após iniciar o backend.

---

## Testes

Para rodar os testes do backend:

```bash
cd server
bun test
```

---

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

## Licença

MIT License.

---

## Autor

Desenvolvido por **Brenno** — Feito com ☕ e 💜.
