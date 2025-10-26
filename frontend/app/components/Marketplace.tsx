"use client";

// components/Marketplace.tsx
import React, { useState, useMemo } from 'react';
import { appData, Reward } from '../../lib/data';

// --- Local Types and State ---
type RewardCategory = 'all' | 'Recognition' | 'Achievement' | 'Service' | 'Social' | 'Utility';

interface CartItem extends Reward {
    quantity: number;
}

// --- Local Component Definitions ---
interface RewardCardProps {
    reward: Reward;
    onAddToCart: (reward: Reward) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onAddToCart }) => (
    <div className="product-card">
        <div className="product-image">
            <i className="fas fa-award"></i>
        </div>
        <div className="product-info">
            <div>
                <h3 className="product-title">{reward.name}</h3>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                    Category: {reward.category}
                </p>
                <p className="product-price">{reward.points} points</p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                    {reward.description}
                </p>
            </div>
            <div className="product-actions">
                <button 
                    className="btn btn--primary btn--small" 
                    onClick={() => onAddToCart(reward)}
                >
                    <i className="fas fa-cart-plus"></i> Redeem
                </button>
            </div>
        </div>
    </div>
);


// --- Main Marketplace Component ---

const Marketplace: React.FC = () => {
    const [filter, setFilter] = useState<RewardCategory>('all');
    const [cart, setCart] = useState<CartItem[]>([]);

    const rewardCategories: RewardCategory[] = ['all', 'Recognition', 'Achievement', 'Service', 'Social', 'Utility'];

    // Filter rewards based on the selected category
    const filteredRewards = useMemo(() => {
        // FIX: Check if appData.rewards is defined, otherwise default to an empty array.
        const rewards = appData.rewards || []; 
        
        return rewards.filter(reward => 
            filter === 'all' || reward.category === filter
        );
    }, [filter]);

    // Calculate cart totals
    const { totalItems, totalPoints } = useMemo(() => {
        const total = cart.reduce((sum, item) => sum + (item.points * item.quantity), 0);
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        return { totalItems: count, totalPoints: total };
    }, [cart]);

    const handleAddToCart = (reward: Reward) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === reward.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === reward.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...reward, quantity: 1 }];
            }
        });
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            console.log("Cart is empty.");
            return;
        }
        // Simulate a checkout process
        console.log(`Checking out ${totalItems} items for a total of ${totalPoints} points.`);
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
                                {rewardCategories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`btn btn--secondary btn--small ${filter === cat ? 'active' : ''}`}
                                        onClick={() => setFilter(cat)}
                                    >
                                        {cat === 'all' ? 'All Rewards' : cat}
                                    </button>
                                ))}
                            </div>

                            <div className="product-grid">
                                {filteredRewards.map(reward => (
                                    <RewardCard
                                        key={reward.id}
                                        reward={reward}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                                {filteredRewards.length === 0 && <p>No rewards found in this category.</p>}
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
                                            <span>{item.points * item.quantity} points</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="cart-total">
                                <span>Total:</span>
                                <span>{totalPoints} points</span>
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
