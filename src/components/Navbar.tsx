import React, { useState } from 'react';
import { ShoppingCart as CartIcon, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from './ShoppingCart';

export const Navbar: React.FC = () => {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">TechStore</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <CartIcon className="w-6 h-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setIsCartOpen(!isCartOpen);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 hover:bg-gray-100 rounded-md"
            >
              <CartIcon className="w-5 h-5 mr-2" />
              Cart ({state.itemCount})
            </button>
          </div>
        </div>
      )}

      {/* Cart sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex-1 py-6 overflow-y-auto px-4">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </h2>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="ml-3 h-7 flex items-center"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="mt-8">
                    <ShoppingCart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};