import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Search, X } from "lucide-react";

const API_KEY = import.meta.env.VITE_REACT_MOVIE_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_MOVIE_API_URL;

const SearchBar = ({ onSearch, loading, setMovies }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (searched) return;
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&s=${debouncedQuery}&type=movie&page=1`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setSuggestions(data.Search.map((m) => m.Title));
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, searched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
      setSearched(true);
    }
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    setSuggestions([]);
    setSearched(true);
    onSearch(title);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setSearched(false);
    if (setMovies) setMovies([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 relative">
        <Input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearched(false);
          }}
          className="flex-1 pr-10"
          disabled={loading}
          autoComplete="off"
        />

        {query && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {suggestions.length > 0 && !searched && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((title, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(title)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
