<<<<<<< HEAD
<!-- prettier-ignore -->
# 📝 To‑Do List — React + Vite

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)

Uma aplicação simples de lista de tarefas construída com React e Vite. O objetivo é servir como projeto de estudo, portfólio ou ponto de partida para apps maiores — com componentes reutilizáveis, hooks customizados e persistência via `localStorage`.

**Destaques:** criar, editar, buscar, filtrar e marcar tarefas como concluídas.

**Demo rápido**

- Rodando localmente: siga os passos em **Instalação**.
- Dados persistem no `localStorage` do navegador (sem backend obrigatório).

**Índice**

- [Funcionalidades](#funcionalidades)
- [Instalação e execução](#instalação-e-execução)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como usar](#como-usar)
- [Contribuição](#contribuição)
- [Contato / Autor](#contato--autor)

## Funcionalidades

- Criar novas tarefas com título
- Editar tarefas existentes
- Remover tarefas
- Marcar como concluída / desmarcar
- Filtrar por: All | Todo | Done
- Buscar tarefas por título
- Persistência dos dados com `localStorage`

## Instalação e execução

Pré-requisitos: Node.js 18+ e npm ou pnpm.

1. Instalar dependências:

```bash
npm install
```

2. Rodar em modo de desenvolvimento:

```bash
npm run dev
```

3. Build para produção e pré-visualização (opcional):

```bash
npm run build
npm run preview
```

## Estrutura do projeto (resumida)

```
├─ public/
├─ src/
│  ├─ api/tasks.js        # mock de API + persistência
│  ├─ components/         # UI: TaskList, TaskItem, TaskForm, FilterBar
│  ├─ hooks/useTasks.jsx  # lógica e state centralizado
│  └─ pages/Home.jsx
├─ index.html
├─ package.json
└─ vite.config.js
```

## Como usar

- Abra a aplicação no navegador (normalmente `http://localhost:5173`).
- Use o formulário para adicionar tarefas.
- Clique no título para editar (ou botão de editar, conforme UI).
- Use os filtros para visualizar tarefas pendentes, concluídas ou todas.

> Observação: se quiser resetar os dados, limpe o `localStorage` do domínio (Ferramentas de desenvolvedor → Application → Local Storage).

## Contribuição

Contribuições são bem-vindas — abra uma issue ou um pull request. Sugestões:

- Adicionar testes automatizados
- Integração com backend real (API)
- Melhorias de acessibilidade e UI

## Contato / Autor

Desenvolvido por Denilson Novais. Para sugestões ou dúvidas, abra uma issue neste repositório.

---

