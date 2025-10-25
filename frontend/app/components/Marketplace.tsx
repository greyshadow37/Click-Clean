// components/Marketplace.tsx
import React, { useState, useMemo } from 'react';
import { appData, Product } from '../../lib/data';

// --- Local Types and State ---
type ProductCategory = 'all' | 'Composting' | 'Recycling' | 'Sustainable' | 'Voucher';

interface CartItem extends Product {
    quantity: number;
}

// --- Local Component Definitions ---
interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
    <div className="product-card">
        <div className="product-image">
            <i className="fas fa-box-open"></i>
        </div>
        <div className="product-info">
            <div>
                <h3 className="product-title">{product.name}</h3>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                    Category: {product.category}
                </p>
                <p className="product-price">₹{product.price}</p>
            </div>
            <div className="product-actions">
                <button 
                    className="btn btn--primary btn--small" 
                    onClick={() => onAddToCart(product)}
                >
                    <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    </div>
);


// --- Main Marketplace Component ---

const Marketplace: React.FC = () => {
    const [filter, setFilter] = useState<ProductCategory>('all');
    const [cart, setCart] = useState<CartItem[]>([]);

    const productCategories: ProductCategory[] = ['all', 'Composting', 'Recycling', 'Sustainable', 'Voucher'];

    // Filter products based on the selected category
    const filteredProducts = useMemo(() => {
        // FIX: Check if appData.marketplace is defined, otherwise default to an empty array.
        const products = appData.marketplace || []; 
        
        return products.filter(product => 
            filter === 'all' || product.category === filter
        );
    }, [filter]);

    // Calculate cart totals
    const { totalItems, totalPrice } = useMemo(() => {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        return { totalItems: count, totalPrice: total };
    }, [cart]);

    const handleAddToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            console.log("Cart is empty.");
            return;
        }
        // Simulate a checkout process
        console.log(`Checking out ${totalItems} items for a total of ₹${totalPrice}.`);
        setCart([]); // Clear cart after checkout
        // Replaced alert() with console.log for stability
        console.log('Thank you for your purchase! Your order is being processed.'); 
    };

    return (
        <div className="page page--active" id="marketplace">
            <div className="container">
                <h1 className="page-header">Rewards Marketplace</h1>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    {/* Products Column */}
                    <div style={{ flex: '2 1 65%' }}>
                        <section className="section">
                            <h2 className="section-title">Browse Products</h2>
                            
                            <div className="marketplace-filters">
                                {productCategories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`btn btn--secondary btn--small ${filter === cat ? 'filter-btn active' : ''}`}
                                        onClick={() => setFilter(cat)}
                                    >
                                        {cat === 'all' ? 'All' : cat}
                                    </button>
                                ))}
                            </div>

                            <div className="products-grid">
                                {filteredProducts.map(product => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onAddToCart={handleAddToCart} 
                                    />
                                ))}
                                {filteredProducts.length === 0 && <p>No products found in this category.</p>}
                            </div>
                        </section>
                    </div>

                    {/* Cart Summary Column */}
                    <div style={{ flex: '1 1 30%', minWidth: '250px' }}>
                        <div className="cart-summary">
                            <h3><i className="fas fa-shopping-cart"></i> Cart Summary</h3>
                            
                            <div className="cart-items">
                                {cart.length === 0 ? (
                                    <p style={{ color: 'var(--color-text-secondary)' }}>Your cart is empty.</p>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <span>{item.name} (x{item.quantity})</span>
                                            <span>₹{item.price * item.quantity}</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="cart-total">
                                <span>Total:</span>
                                <span>₹{totalPrice}</span>
                            </div>

                            <button 
                                className="btn btn--primary" 
                                style={{ width: '100%', marginTop: '20px' }}
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                            >
                                <i className="fas fa-cash-register"></i> Checkout ({totalItems} items)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
