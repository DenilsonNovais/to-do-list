// (C) Este é o componente principal da página, que renderiza toda a interface do "Todo".
import React, { useMemo, useState } from 'react';
// (1) A execução começa aqui. O React renderiza o componente `Home`, que importa o hook `useTasks`.
import useTasks from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';

export default function Home() {
  // (2) O componente chama o hook `useTasks` para obter o estado das tarefas e as funções para manipulá-las.
  // Isso dispara a execução do código dentro de `useTasks.jsx`.
  const { tasks, loading, error, add, edit, remove } = useTasks();

  // Estados locais do componente `Home` para controlar os filtros da interface.
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  // (11) `useMemo` é usado para calcular a lista de tarefas filtradas de forma otimizada.
  // Este código só é re-executado se `tasks`, `filter` ou `query` mudarem.
  const filtered = useMemo(() => {
    let res = tasks || [];
    if (filter === 'todo') res = res.filter(t => !t.done);
    if (filter === 'done') res = res.filter(t => t.done);
    if (query.trim()) res = res.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
    return res;
  }, [tasks, filter, query]); // Array de dependências do `useMemo`.

  // Funções "handler" que conectam as ações do usuário (eventos nos componentes filhos) com as funções do hook `useTasks`.
  const handleAdd = async (payload) => { await add(payload); };
  const handleToggle = async (task) => { await edit(task.id, { done: !task.done }); };
  const handleDelete = async (id) => { await remove(id); };
  const handleEdit = async (task) => {
    // O `prompt` é uma forma simples de obter input do usuário, mas em apps reais, usaríamos um modal.
    const newTitle = prompt('Editar título', task.title);
    if (newTitle === null) return;
    const newDesc = prompt('Editar descrição', task.description || '');
    await edit(task.id, { title: newTitle, description: newDesc });
  };

  // (12) O JSX que define a estrutura da página é retornado para ser renderizado pelo React.
  // Na primeira renderização, `loading` será `true`, então "Carregando..." será exibido.
  // Após o `useEffect` em `useTasks` completar, o estado `tasks` é atualizado, e este componente é re-renderizado com a lista de tarefas.
  return (
    <div>
      <header>
        <h1>To-Do List</h1>
        <p>Organize suas tarefas de forma simples e eficiente</p>
      </header>
      <main className="container">
        <section>
          <h2>➕ Criar Nova Tarefa</h2>
          <TaskForm onSubmit={handleAdd} submitLabel="Adicionar" />
        </section>

        <section>
          <h2>🔍 Filtrar e Buscar</h2>
          <FilterBar filter={filter} setFilter={setFilter} query={query} setQuery={setQuery} />
        </section>

        <section>
          <h2>📋 Suas Tarefas</h2>
          {loading && <div className="loading">Carregando tarefas...</div>}
          {error && <div className="error">Erro: {error}</div>}
          <TaskList tasks={filtered} onToggleDone={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
        </section>
      </main>
    </div>
  );
}
