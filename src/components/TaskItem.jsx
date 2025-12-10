import React from 'react';


export default function TaskItem({ task, onToggleDone, onDelete, onEdit }) {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                padding: 12,
                borderRadius: 8,
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                background: task.done ? '#f7fff7' : 'white'
            }}
        >
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggleDone(task)}
                aria-label={`marcar ${task.title}`}
            />


            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</div>
                {task.description && <div style={{ fontSize: 13, color: '#555' }}>{task.description}</div>}
                <div style={{ fontSize: 11, color: '#888', marginTop: 6 }}>{new Date(task.createdAt).toLocaleString()}</div>
            </div>


            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onEdit(task)} aria-label="editar">Editar</button>
                <button onClick={() => {
                    if (confirm('Remover tarefa?')) onDelete(task.id);
                }} aria-label="remover">Remover</button>
            </div>
        </div>
    );
}