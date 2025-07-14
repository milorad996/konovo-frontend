import { useState } from "react";
import './../css/filterBar.css';

function FilterBar({ categories, onFilter }) {
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ category, search });
    };

    return (
        <form onSubmit={handleSubmit} className="filter-bar">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Sve kategorije</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Pretraga po nazivu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">Filtriraj</button>
        </form>
    );
}

export default FilterBar;
