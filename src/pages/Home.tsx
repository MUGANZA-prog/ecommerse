import React from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { FilterPanel } from '../components/FilterPanel';
import { FilterState } from '../types';

interface HomeProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  maxPrice: number;
  filteredProducts: any[];
}

export const Home: React.FC<HomeProps> = ({
  filters,
  onFilterChange,
  categories,
  maxPrice,
  filteredProducts,
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={onFilterChange}
            categories={categories}
            maxPrice={maxPrice}
          />
        </div>
        <div className="md:col-span-3">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </main>
  );
};