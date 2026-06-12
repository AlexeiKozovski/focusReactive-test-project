import { type FC, useEffect, useState } from 'react';
import { type Product } from '../../data/products.ts';
import { ProductCard } from '../ProductCard/ProductCard.tsx';
import './ProductsTable.css';

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

type ProductsTableProps = {
  filteredProducts: Product[];
  searchInput: string;
};

export const ProductsTable: FC<ProductsTableProps> = ({
  filteredProducts,
  searchInput,
}) => {
  const debouncedSearchTerm = useDebouncedValue(searchInput, 300);

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
