import { ProductsTable } from './components/ProductsTable/ProductsTable.tsx';
import { ProductsFilter } from './components/ProductsFilter/ProductsFilter.tsx';
import { ProductFiltersProvider } from './context/ProductFiltersProvider';

function App() {
  return (
    <main className="dashboard">
      <ProductFiltersProvider>
        <ProductsFilter />
        <ProductsTable />
      </ProductFiltersProvider>
    </main>
  );
}

export default App;
