import  { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { products } from './data/products';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { FilterState } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
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
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(product.category);
      const matchesPrice = product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];
      const matchesRating = product.rating >= filters.minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [filters, searchTerm]);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <Routes>
            <Route path="/" element={
              <Home
                filters={filters}
                onFilterChange={setFilters}
                categories={categories}
                maxPrice={Math.max(...products.map(p => p.price))}
                filteredProducts={filteredProducts}
              />
            } />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;