import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { domains, products } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';
import FilterBar from '../components/ui/FilterBar';
import './pages.css';

const FILTERS = ['All', 'Featured', 'New', 'Active', 'Beta'];

export default function DomainCatalogPage() {
  const { domainId } = useParams<{ domainId: string }>();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const domain = domains.find(d => d.id === domainId);

  if (!domain) {
    return <Navigate to="/" replace />;
  }

  // Get products for this domain
  const domainProducts = products.filter(p => p.domainId === domain.id);

  // Filter and search logic
  const filteredProducts = domainProducts.filter(product => {
    // 1. Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    // 2. Category filter
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return product.featured;
    if (activeFilter === 'New') return product.isNew;
    if (activeFilter === 'Active') return product.status === 'Active';
    if (activeFilter === 'Beta') return product.status === 'Beta';
    
    return true;
  });

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1 className="catalog-title">{domain.name} Solutions</h1>
        <p className="catalog-desc">{domain.description}</p>
      </div>

      <div className="catalog-controls">
        <div className="catalog-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder={`Search ${domain.name} solutions...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="catalog-filters-wrapper">
          <SlidersHorizontal size={18} className="text-muted" />
          <FilterBar 
            filters={FILTERS} 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>
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
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <button className="btn-secondary" onClick={() => {setSearchQuery(''); setActiveFilter('All');}}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
