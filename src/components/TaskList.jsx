import React from 'react';
import TaskItem from './TaskItem';


export default function TaskList({ tasks, onToggleDone, onDelete, onEdit }) {
    if (!tasks.length) return <div>Nenhuma tarefa encontrada.</div>;


    return (
        <div className="task-list">
            {tasks.map(t => (
                <TaskItem key={t.id} task={t} onToggleDone={onToggleDone} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}