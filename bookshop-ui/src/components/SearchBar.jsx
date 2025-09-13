import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full max-w-2xl">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-r-lg flex items-center"
            >
                <FaSearch />
            </button>
        </form>
    );
}