import { useState, useMemo } from 'react';
import { products } from '../data/products';
import { CartProvider } from '../context/CartContext';
import { Navbar } from '../components/Navbar';
import { ProductGrid } from '../components/ProductGrid';
import { FilterPanel } from '../components/FilterPanel';
import { FilterState } from '../types';

function Home() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, Math.max(...products.map(p => p.price))],
    minRating: 0,
  });

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(product.category);
      const matchesPrice = product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.minRating;

      return matchesCategory && matchesPrice && matchesRating;
    });
  }, [filters]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                categories={categories}
                maxPrice={Math.max(...products.map(p => p.price))}
              />
            </div>
            <div className="md:col-span-3">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

export default Home;