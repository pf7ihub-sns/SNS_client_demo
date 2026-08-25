import './components.css';

interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      {filters.map(filter => (
        <button
          key={filter}
          className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
