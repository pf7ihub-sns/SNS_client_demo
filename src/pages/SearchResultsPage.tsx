import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products, domains } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';
import './pages.css';

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Update local state if URL changes (e.g. searching from top nav again)
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Handle local search bar submit to update URL
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const currentQuery = searchParams.get('q') || '';

  // Filter products based on URL query (Domain only)
  const filteredProducts = products.filter(product => {
    if (!currentQuery) return true; // Show all if no query
    
    const query = currentQuery.toLowerCase();
    const domain = domains.find(d => d.id === product.domainId);
    
    if (!domain) return false;
    return domain.name.toLowerCase().includes(query);
  });

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1 className="catalog-title">Search Results</h1>
        <p className="catalog-desc">
          {currentQuery ? `Showing results for "${currentQuery}"` : 'Enter a search term to find solutions'}
        </p>
      </div>

      <div className="catalog-controls">
        <form className="catalog-search" onSubmit={handleSearch} style={{ width: '100%', maxWidth: '600px' }}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by Solution Domain (e.g., Compliance, Retail)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%' }}
          />
        </form>
      </div>

      <div className="catalog-results">
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No solutions found</h3>
            <p>We couldn't find any products matching "{currentQuery}". Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
