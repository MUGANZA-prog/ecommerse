import React from 'react';
import { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
  maxPrice: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  categories,
  maxPrice,
}) => {
  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handlePriceChange = (value: string, index: number) => {
    const newValue = Number(value);
    const newPriceRange: [number, number] = [...filters.priceRange] as [number, number];
    newPriceRange[index] = newValue;
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  const handleRatingChange = (value: string) => {
    onFilterChange({ ...filters, minRating: Number(value) });
  };

  const handleClearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, maxPrice],
      minRating: 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="rounded text-blue-600"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Min Price: ${filters.priceRange[0]}</label>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(e.target.value, 0)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Max Price: ${filters.priceRange[1]}</label>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e.target.value, 1)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Minimum Rating</h3>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={filters.minRating}
          onChange={(e) => handleRatingChange(e.target.value)}
          className="w-full"
        />
        <span className="block text-sm mt-1">{filters.minRating} stars</span>
      </div>

      <button
        onClick={handleClearFilters}
        className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
};