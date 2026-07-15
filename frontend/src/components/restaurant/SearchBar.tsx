import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Button } from "../common/Button";

interface SearchBarProps {
  className?: string;
  variant?: "hero" | "compact";
  initialQuery?: string;
  initialLocation?: string;
}

export function SearchBar({ className, variant = "hero", initialQuery = "", initialLocation = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl shadow-secondary/10 sm:flex-row sm:items-center ${
        variant === "hero" ? "sm:p-3" : "sm:p-2"
      } ${className ?? ""}`}
    >
      <div className="flex flex-1 items-center gap-2.5 px-2">
        <FiSearch className="shrink-0 text-slate-400" size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants, cuisines..."
          className="w-full border-none bg-transparent py-2 text-sm text-secondary outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="hidden h-8 w-px bg-slate-200 sm:block" />
      <div className="flex flex-1 items-center gap-2.5 px-2">
        <FiMapPin className="shrink-0 text-slate-400" size={18} />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or neighborhood"
          className="w-full border-none bg-transparent py-2 text-sm text-secondary outline-none placeholder:text-slate-400"
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Search
      </Button>
    </form>
  );
}
