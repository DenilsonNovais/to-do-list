// (A) Este arquivo define a interface para interagir com os dados das tarefas.
// Ele abstrai a lógica de armazenamento (neste caso, o localStorage do navegador).

// Chave usada para armazenar e recuperar as tarefas no localStorage.
const STORAGE_KEY = 'react_todo_tasks_v1';

// Função para ler as tarefas do localStorage.
function readStorage() {
    // Pega o valor bruto (string) do localStorage.
    const raw = localStorage.getItem(STORAGE_KEY);
    // Se não houver nada, retorna um array vazio.
    if (!raw) return [];
    try {
        // Tenta converter a string JSON para um array de objetos.
        return JSON.parse(raw);
    }
    catch {
        // Se a conversão falhar (dados corrompidos), retorna um array vazio.
        return [];
    }
}

// Função para escrever o array de tarefas no localStorage.
function writeStorage(tasks) {
    // Converte o array de tarefas para uma string JSON e a armazena.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Função para gerar um ID único para cada nova tarefa.
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// (8) Função utilitária que simula a latência de uma chamada de rede.
// Isso ajuda a testar os estados de "loading" na interface.
function delay(ms = 200) {
    return new Promise (resolve => setTimeout(resolve, ms));
}

// (7) Função exportada para obter todas as tarefas. É chamada pelo hook `useTasks`.
export async function getTasks() {
    await delay();
    return readStorage();
}

// Função exportada para criar uma nova tarefa.
export async function createTask({title, description}) {
    await delay();
    const tasks = readStorage();
    // Cria o objeto da nova tarefa com um ID, os dados recebidos e valores padrão.
    const newTask = {
        id: generateId(),
        title,
        description: description || '',
        done: false,
        createdAt: new Date().toISOString(),        
    };
    // Adiciona a nova tarefa no início do array.
    tasks.unshift(newTask);
    // Salva o array atualizado no localStorage.
    writeStorage(tasks);
    return newTask;
}

// Função exportada para atualizar uma tarefa existente.
export async function updateTask(id, patch) {
    await delay();
    const tasks = readStorage();
    // Encontra o índice da tarefa a ser atualizada.
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) {throw new Error('task not found');}
    // Atualiza o objeto da tarefa com os novos dados (`patch`).
    tasks[idx] = {...tasks[idx], ...patch};
    // Salva o array atualizado.
    writeStorage(tasks);
    return tasks[idx];
}

// Função exportada para deletar uma tarefa.
export async function deleteTask(id) {
    await delay();
    let tasks = readStorage();
    // Filtra o array, removendo a tarefa com o ID correspondente.
    tasks = tasks.filter(t => t.id !== id);
    writeStorage(tasks);
    return true
}