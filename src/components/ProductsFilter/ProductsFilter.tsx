import type { FC } from 'react';
import { categories } from '../../data/products.ts';
import { useProductFilters } from '../../hooks/useProductFilters';
import './ProductsFilter.css';

export const ProductsFilter: FC = () => {
  const {
    searchInput,
    selectedCategory,
    minPriceInput,
    maxPriceInput,
    onSearchChange,
    onCategoryChange,
    onMinPriceChange,
    onMaxPriceChange,
    resetFilters,
    filteredProducts,
    totalCount,
  } = useProductFilters();

  return (
    <section className="panel">
      <h1>Smart Search & Filter Dashboard</h1>
      <p className="subtitle">
        Real-time product search with debouncing, chained filters, and memoized
        results.
      </p>

      <div className="controls">
        <label className="control">
          Search
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={searchInput}
            onChange={onSearchChange}
          />
        </label>

        <label className="control">
          Category
          <select value={selectedCategory} onChange={onCategoryChange}>
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="control">
          Min price
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            value={minPriceInput}
            onChange={onMinPriceChange}
          />
        </label>

        <label className="control">
          Max price
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="1000"
            value={maxPriceInput}
            onChange={onMaxPriceChange}
          />
        </label>
      </div>

      <div className="summary">
        <p>
          Showing <strong>{filteredProducts.length}</strong> of{' '}
          <strong>{totalCount}</strong> products
        </p>
        <button type="button" onClick={resetFilters}>
          Reset filters
        </button>
      </div>
    </section>
  );
};
