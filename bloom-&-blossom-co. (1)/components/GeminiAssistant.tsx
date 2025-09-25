
import React, { useState } from 'react';
import { getBouquetRecommendation } from '../services/geminiService';
import { AIRecommendation, Product } from '../types';
import { SparklesIcon, XIcon, ArrowRightIcon } from './Icons';

interface GeminiAssistantProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ products, onProductSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await getBouquetRecommendation(prompt);
      setRecommendation(result);
    } catch (err) {
      setError('Sorry, I encountered an error. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const recommendedProducts = recommendation?.suggestedProductIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined) ?? [];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center space-x-2"
      >
        <SparklesIcon className="w-6 h-6" />
        <span className="font-sans font-bold hidden md:block">AI Assistant</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-sans font-bold text-primary flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2" />
                Personalized Bouquet Assistant
              </h3>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                <XIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto">
              {!isLoading && !recommendation && (
                <div className="text-center">
                  <p className="text-gray-600">Tell me about the occasion and the person you're buying for, and I'll find the perfect flowers!</p>
                  <p className="text-sm text-gray-400 mt-2">e.g., "A cheerful bouquet for my friend's graduation" or "Something romantic for an anniversary"</p>
                </div>
              )}
              {isLoading && (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600">Finding the perfect flowers...</p>
                </div>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}
              {recommendation && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="text-2xl font-sans font-bold text-center text-gray-800">{recommendation.title}</h4>
                  <p className="text-gray-600">{recommendation.reasoning}</p>
                  <div className="space-y-3 pt-4">
                    {recommendedProducts.map(product => (
                      <div key={product.id} className="border rounded-lg p-3 flex items-center space-x-4">
                        <img src={product.imageUrl} alt={product.name} className="w-20 h-20 rounded-md object-cover" />
                        <div className="flex-grow">
                          <h5 className="font-sans font-bold">{product.name}</h5>
                          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => {
                            onProductSelect(product);
                            setIsOpen(false);
                          }}
                          className="bg-primary text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-accent transition-colors flex items-center"
                        >
                          View <ArrowRightIcon className="w-4 h-4 ml-1"/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t flex space-x-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the occasion..."
                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-accent focus:outline-none"
                disabled={isLoading}
              />
              <button type="submit" className="bg-primary text-white p-3 rounded-full hover:bg-accent transition-colors disabled:bg-gray-400" disabled={isLoading}>
                <ArrowRightIcon className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
