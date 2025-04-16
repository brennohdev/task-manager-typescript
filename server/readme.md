# 🧠 Task Manager Backend

Este repositório contém toda a implementação do backend da aplicação **Task Manager**, desenvolvida com a stack **Node.js + Express + MongoDB + TypeScript** e arquitetada utilizando os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**.

O foco principal desta aplicação é possibilitar a colaboração em times para gerenciamento de tarefas, projetos e workspaces, sem hierarquias de permissões (roles), com exceção para regras de criação e exclusão.

---

## 🚧 Tecnologias e Ferramentas

- **Node.js** com **Express**
- **MongoDB** com Mongoose
- **TypeScript**
- **Zod** para validação de esquemas
- **Passport.js** com autenticação via Google OAuth2
- **Jest** para testes
- **Clean Architecture** (camadas: `domain`, `application`, `infrastructure`, `interfaces`)
- **DDD**: Entidades ricas, repositórios e use cases isolados

---

## 🧱 Estrutura de Pastas

```
server/
├── application/
│   └── use-cases/
├── domain/
│   └── entities/
├── infrastructure/
│   └── database/
│       ├── models/
│       └── repositories/
├── interfaces/
│   └── http/
│       ├── controllers/
│       └── routes/
├── shared/
│   └── utils/
└── index.ts
```

---

## 👤 Autenticação

- **Google OAuth2**: login e criação de conta via conta Google.
- **Processo**:
  - Ao autenticar-se, é criado um `User`, um `Account` e um `Workspace` inicial.
  - Repositórios isolados cuidam da persistência.
  - Transações do Mongoose garantem atomicidade.

---

## 🧩 Principais Entidades de Negócio

### User
- Representa o usuário autenticado.
- Pode estar em múltiplos workspaces.

### Account
- Vincula o provedor de login (Google).

### Workspace
- Espaço colaborativo criado por um usuário.
- Apenas o `createdBy` pode deletá-lo.
- Contém `Projects` e `Members`.

### Member
- Usuário participante de um workspace.
- Sem roles ou hierarquias.

### Project
- Criado dentro de um workspace.
- Tem nome, emoji, descrição.
- Apenas o criador pode deletar.

### Task
- Vinculada a um projeto e a um workspace.
- Campos: `title`, `description`, `dueDate`, `assignedTo`, `priority`, `status`.
- Apenas o criador pode deletar.

---

## ⚙️ Funcionalidades Implementadas

### Auth
- Google login
- Criação automática de conta e workspace
- Sessão com cookie

### Workspace
- Criar workspace
- Buscar workspaces do usuário
- Atualizar dados
- Deletar (apenas criador)

### Project
- Criar projeto
- Listar projetos por workspace
- Atualizar
- Deletar (apenas criador)

### Member
- Listar membros de workspace
- Entrar via código de convite

### Task
- Criar tarefa (valida membro e projeto)
- Buscar tarefa por ID
- Atualizar (apenas membro do workspace)
- Deletar (apenas criador)

---

## 🧠 Regras de Negócio Importantes

- Apenas membros de um workspace têm acesso aos dados dele.
- Apenas o criador pode deletar workspaces, projetos ou tarefas.
- Tarefas são vinculadas a projetos e validadas quanto à existência.
- Toda operação sensível (create/update/delete) é feita com verificação de permissão.

---

## 🧪 Testes
- Testes com `mongodb-memory-server`
- Mock dos repositórios nos useCases

---

## 📌 Considerações Finais

Este backend foi construído com foco em clareza arquitetural, regras de negócio bem definidas e separação de responsabilidades. O sistema foi pensado para equipes horizontais, sem papel de admin, com segurança garantida por meio das validações e estruturas de permissão implícitas via `createdBy` e `membership`.

A Clean Architecture permitiu criar um código desacoplado, testável e fácil de escalar.

---

Feito com muito café e muito amor por **Brenno**. ☕💜

