import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { categories, items } from './data/products';
import { ProductsTable } from './components/ProductsTable/ProductsTable.tsx';

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

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchInput, 300);

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }, []);

  const onCategoryChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(event.target.value);
    },
    []
  );

  const onMinPriceChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMinPriceInput(event.target.value);
    },
    []
  );

  const onMaxPriceChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMaxPriceInput(event.target.value);
    },
    []
  );

  const resetFilters = useCallback(() => {
    setSearchInput('');
    setSelectedCategory('All');
    setMinPriceInput('');
    setMaxPriceInput('');
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();
    const minPrice = minPriceInput === '' ? null : Number(minPriceInput);
    const maxPrice = maxPriceInput === '' ? null : Number(maxPriceInput);

    return items.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesMinPrice = minPrice === null || product.price >= minPrice;
      const matchesMaxPrice = maxPrice === null || product.price <= maxPrice;

      return (
        matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
      );
    });
  }, [debouncedSearchTerm, selectedCategory, minPriceInput, maxPriceInput]);

  return (
    <main className="dashboard">
      <section className="panel">
        <h1>Smart Search & Filter Dashboard</h1>
        <p className="subtitle">
          Real-time product search with debouncing, chained filters, and
          memoized results.
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
            <strong>{items.length}</strong> products
          </p>
          <button type="button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      </section>
      <ProductsTable
        filteredProducts={filteredProducts}
        searchInput={searchInput}
      ></ProductsTable>
    </main>
  );
}

export default App;
