import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react';
import { items } from '../data/products';
import type { Product } from '../data/products';

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

export type ProductFiltersContextValue = {
  searchInput: string;
  debouncedSearchTerm: string;
  selectedCategory: string;
  minPriceInput: string;
  maxPriceInput: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onMinPriceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetFilters: () => void;
  filteredProducts: Product[];
  totalCount: number;
};

export const ProductFiltersContext =
  createContext<ProductFiltersContextValue | null>(null);

export function useProductFiltersState(): ProductFiltersContextValue {
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

  return {
    searchInput,
    debouncedSearchTerm,
    selectedCategory,
    minPriceInput,
    maxPriceInput,
    onSearchChange,
    onCategoryChange,
    onMinPriceChange,
    onMaxPriceChange,
    resetFilters,
    filteredProducts,
    totalCount: items.length,
  };
}

export function useProductFilters() {
  const context = useContext(ProductFiltersContext);

  if (!context) {
    throw new Error(
      'useProductFilters must be used within ProductFiltersProvider'
    );
  }

  return context;
}
