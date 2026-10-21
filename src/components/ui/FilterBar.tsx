import './components.css';

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="toolbar" aria-label="Solution filters">
      {filters.map(filter => (
        <button
          key={filter}
          type="button"
          className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
          aria-pressed={activeFilter === filter}
          aria-label={`Filter by ${filter}`}
          title={`Show ${filter} solutions`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
