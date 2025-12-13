import React from 'react';


export default function TaskItem({ task, onToggleDone, onDelete, onEdit }) {
    return (
        <div className={`task-item ${task.done ? 'task-done' : ''}`}>
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggleDone(task)}
                aria-label={`marcar ${task.title}`}
                className="task-checkbox"
            />


            <div className="task-content">
                <div className="task-title">{task.title}</div>
                {task.description && <div className="task-description">{task.description}</div>}
                <div className="task-date">{new Date(task.createdAt).toLocaleString()}</div>
            </div>


            <div className="task-actions">
                <button onClick={() => onEdit(task)} aria-label="editar" className="btn-edit">Editar</button>
                <button onClick={() => {
                    if (confirm('Remover tarefa?')) onDelete(task.id);
                }} aria-label="remover" className="btn-delete">Remover</button>
            </div>
        </div>
    );
}