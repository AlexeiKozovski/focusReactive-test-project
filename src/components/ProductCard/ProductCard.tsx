import { memo } from 'react';
import type { Product } from '../../data/products.ts';
import { highlightText } from '../../helpers/highlightText.tsx';
import './ProductCard.css';

type ProductCardProps = {
  product: Product;
  searchTerm: string;
};

export const ProductCard = memo(function ProductCard({
  product,
  searchTerm,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <header className="product-header">
        <h3>{highlightText(product.name, searchTerm)}</h3>
        <span
          className={product.inStock ? 'stock in-stock' : 'stock out-of-stock'}
        >
          {product.inStock ? 'In stock' : 'Out of stock'}
        </span>
      </header>

      <p className="category">{product.category}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <div className="tags">
        {product.tags.map((tag) => (
          <span key={tag} className="tag">
            {highlightText(tag, searchTerm)}
          </span>
        ))}
      </div>
    </article>
  );
});
