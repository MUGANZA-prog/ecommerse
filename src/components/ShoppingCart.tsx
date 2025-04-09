import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ShoppingCart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: newQuantity },
      });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        {state.items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center space-x-4 py-4 border-b last:border-b-0"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium">{item.product.name}</h4>
              <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  handleQuantityChange(item.product.id, item.quantity - 1)
                }
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(item.product.id, item.quantity + 1)
                }
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() =>
                  dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })
                }
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total ({state.itemCount} items):</span>
          <span>${state.total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};