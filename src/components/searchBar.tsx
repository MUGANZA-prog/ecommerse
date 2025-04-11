"use client"

import type React from "react"
import { useId, useState, useEffect, useCallback } from "react"
import { ArrowRightIcon, SearchIcon, ShoppingCartIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { products } from "@/data/products"



export default function Search() {
  const id = useId()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isSearched, setIsSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Debounced search function
  const performSearch = useCallback(
    (query: string) => {
      setIsSearching(true)

      if (query.trim() === "") {
        setFilteredProducts(products)
      } else {
        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
        )
        setFilteredProducts(filtered)
      }

      setIsSearched(true)
      setIsSearching(false)
    },
    [setFilteredProducts, setIsSearched],
  )

  // Debounce search as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        performSearch(searchQuery)
      }
    }, 300) // 300ms debounce delay

    return () => clearTimeout(timer)
  }, [searchQuery, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // If search is cleared, reset to show all products
    if (value === "") {
      setFilteredProducts(products)
      setIsSearched(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <Input
          id={id}
          className="peer ps-9 pe-9"
          placeholder="Search products, categories, or descriptions..."
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </form>

      {(isSearched || isSearching) && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            {isSearching
              ? "Searching..."
              : filteredProducts.length === 0
                ? "No products found"
                : `Found ${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"}`}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <a href={`/products/${product.id}`} className="block">
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <img
                      src={product.image || "https://placehold.co/200x200"}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-base mb-1 line-clamp-1">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                      <span className="text-xs px-2 py-1 bg-muted rounded-full">{product.category}</span>
                    </div>
                  </div>
                </a>
                <div className="p-4 pt-0">
                  <Button size="sm" className="w-full" variant="outline">
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && !isSearching && (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground">No products match your search criteria.</p>
              <p className="mt-2">Try using different keywords or browse our categories.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
