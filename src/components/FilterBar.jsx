import React from 'react';


export default function FilterBar({ filter, setFilter, query, setQuery }) {
    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label className="filter-label">Filtro:</label>
                <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
                    <option value="all">All</option>
                    <option value="todo">Todo</option>
                    <option value="done">Done</option>
                </select>
            </div>


            <div className="search-group">
                <input
                    placeholder="Buscar por título..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="search-input"
                />
            </div>
        </div>
    );
}