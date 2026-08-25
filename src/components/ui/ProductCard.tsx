import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import type { Product } from '../../data/models';
import './components.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card-header">
        <div className="product-card-badges">
          {product.featured && (
            <span className="badge featured">
              <Star size={12} fill="currentColor" />
              Featured
            </span>
          )}
          {product.isNew && (
            <span className="badge new">
              <Sparkles size={12} />
              New
            </span>
          )}
          {product.status === 'Beta' && (
             <span className="badge warning">Beta</span>
          )}
        </div>
        <div className="product-brand">SNS SQUARE</div>
      </div>
      
      <div className="product-card-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.shortDescription}</p>
        
        <div className="product-tags">
          {product.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      
      <div className="product-card-footer">
        <div className="btn-explore">
          Explore Solution <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
