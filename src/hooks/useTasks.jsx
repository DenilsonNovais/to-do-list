// (B) Este arquivo define um "Custom Hook" do React para gerenciar o estado e as ações das tarefas.
import { useCallback, useEffect, useState } from 'react';
// (6) Importa as funções de manipulação de dados do nosso arquivo de API.
import * as api from '../api/tasks';

// (2) A execução da aplicação entra aqui quando o componente `Home` chama `useTasks()`.
export default function useTasks() {
  // (3) O hook inicializa seus três estados internos.
  // `tasks`: Armazena a lista de tarefas.
  const [tasks, setTasks] = useState([]);
  // `loading`: Indica se uma operação (carregar, adicionar, etc.) está em andamento.
  const [loading, setLoading] = useState(false);
  // `error`: Armazena mensagens de erro, caso ocorram.
  const [error, setError] = useState(null);

  // (5) Define a função `load` para carregar as tarefas.
  // `useCallback` é usado para memorizar a função, evitando recriações desnecessárias.
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // (7) Chama a função da API para buscar os dados.
      const data = await api.getTasks();
      // (9) Após receber os dados, atualiza o estado `tasks`. Isso causa uma nova renderização no componente `Home`.
      setTasks(data);
    } catch (err) {
      console.error('erro load tasks', err);
      setError(err?.message || 'Erro ao carregar tasks');
    } finally {
      // Garante que o loading seja desativado, mesmo se ocorrer um erro.
      setLoading(false);
    }
  }, []);

  // (4) O `useEffect` é executado após a primeira renderização do componente que usa o hook.
  // Como o array de dependências `[load]` não muda, ele roda apenas uma vez.
  useEffect(() => { load(); }, [load]);

  // Define a função `add` para criar uma nova tarefa.
  const add = useCallback(async (payload) => {
    setLoading(true);
    try {
      const t = await api.createTask(payload);
      // Atualiza o estado local adicionando a nova tarefa no início da lista, sem precisar recarregar tudo.
      setTasks(prev => [t, ...prev]);
      return t;
    } catch (err) {
      setError(err?.message);
      throw err;
    } finally { setLoading(false); }
  }, []); // A dependência vazia significa que a função `add` nunca será recriada.

  // Define a função `edit` para atualizar uma tarefa.
  const edit = useCallback(async (id, patch) => {
    setLoading(true);
    try {
      const t = await api.updateTask(id, patch);
      // Atualiza o estado local, substituindo a tarefa antiga pela nova.
      setTasks(prev => prev.map(p => p.id === id ? t : p));
      return t;
    } catch (err) {
      setError(err?.message);
      throw err;
    } finally { setLoading(false); }
  }, []); // A dependência vazia significa que a função `edit` nunca será recriada.

  // Define a função `remove` para deletar uma tarefa.
  const remove = useCallback(async (id) => {
    setLoading(true);
    try {
      await api.deleteTask(id);
      // Atualiza o estado local, filtrando e removendo a tarefa deletada.
      setTasks(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (err) {
      setError(err?.message);
      throw err;
    } finally { setLoading(false); }
  }, []); // A dependência vazia significa que a função `remove` nunca será recriada.

  // (10) O hook retorna o estado atual e as funções para que o componente `Home` possa usá-los.
  return { tasks, loading, error, load, add, edit, remove };
}
