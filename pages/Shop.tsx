import React from 'react';
import { PRODUCTS } from '../constants';
import { ShoppingBag } from 'lucide-react';

const Shop: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-extrabold text-slate-900 uppercase">Club Shop</h1>
            <div className="relative">
                <ShoppingBag className="text-slate-900" />
                <span className="absolute -top-2 -right-2 bg-quins-magenta text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
                <div key={product.id} className="group">
                    <div className="relative overflow-hidden bg-gray-100 rounded-lg mb-4 aspect-square">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                            <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">{product.name}</h3>
                        <div className="text-quins-blue font-bold">KES {product.price.toLocaleString()}</div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;