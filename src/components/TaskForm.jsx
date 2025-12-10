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
        <form onSubmit={handleSubmit} style={{ marginBottom: 12 }} aria-label="form-tarefa">
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    aria-label="Título"
                    style={{ flex: 1, padding: '8px 10px' }}
                />
                <button type="submit" disabled={submitting} style={{ padding: '8px 12px' }}>{submitting ? '...' : submitLabel}</button>
            </div>
            <div style={{ marginTop: 8 }}>
                <textarea
                    placeholder="Descrição (opcional)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={2}
                    style={{ width: '100%', padding: '8px 10px' }}
                />
            </div>
            {error && <div role="alert" style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
        </form>
    );
}