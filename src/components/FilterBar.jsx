import React from 'react';


export default function FilterBar({ filter, setFilter, query, setQuery }) {
    return (
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
            <div>
                <label style={{ marginRight: 8 }}>Filtro:</label>
                <select value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="todo">Todo</option>
                    <option value="done">Done</option>
                </select>
            </div>


            <div style={{ flex: 1 }}>
                <input
                    placeholder="Buscar por título..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{ width: '100%', padding: '6px 8px' }}
                />
            </div>
        </div>
    );
}