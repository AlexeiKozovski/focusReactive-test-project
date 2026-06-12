import { type FC } from 'react';
import { ProductCard } from '../ProductCard/ProductCard.tsx';
import { useProductFilters } from '../../hooks/useProductFilters';
import './ProductsTable.css';

export const ProductsTable: FC = () => {
  const { filteredProducts, debouncedSearchTerm } = useProductFilters();

  return (
    <section className="products-grid">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          searchTerm={debouncedSearchTerm}
        />
      ))}
    </section>
  );
};
