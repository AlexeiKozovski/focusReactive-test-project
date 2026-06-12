import type { ReactNode } from 'react';
import {
  ProductFiltersContext,
  useProductFiltersState,
} from '../hooks/useProductFilters';

export function ProductFiltersProvider({ children }: { children: ReactNode }) {
  const value = useProductFiltersState();

  return (
    <ProductFiltersContext.Provider value={value}>
      {children}
    </ProductFiltersContext.Provider>
  );
}
