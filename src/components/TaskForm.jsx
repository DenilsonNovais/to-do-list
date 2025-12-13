import React, { useState } from 'react';


// Form simples para criar ou editar tarefa.
export default function TaskForm({ initial = { title: '', description: '' }, onSubmit, submitLabel = 'Salvar' }) {
    const [title, setTitle] = useState(initial.title);
    const [description, setDescription] = useState(initial.description);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!title.trim()) return setError('Título é obrigatório');
        setSubmitting(true);
        try {
            await onSubmit({ title: title.trim(), description: description.trim() });
            setTitle('');
            setDescription('');
        } catch (err) {
            setError(err.message || 'Erro ao salvar');
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="task-form" aria-label="form-tarefa">
            <div className="form-row">
                <input
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    aria-label="Título"
                    className="form-input"
                />
                <button type="submit" disabled={submitting} className="btn-submit">{submitting ? '...' : submitLabel}</button>
            </div>
            <div className="form-row">
                <textarea
                    placeholder="Descrição (opcional)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={2}
                    className="form-textarea"
                />
            </div>
            {error && <div role="alert" className="form-error">{error}</div>}
        </form>
    );
}