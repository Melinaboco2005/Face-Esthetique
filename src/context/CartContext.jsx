import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'salon_cart';
const CartContext = createContext(null);

export const formatCurrency = (amount) => {
  if (!amount) return 'Sur devis';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(amount);
};

// Une offre est valable jusqu'à la fin du jour indiqué (format 'AAAA-MM-JJ'). Pas de date = illimitée.
export const isExpired = (validUntil) =>
  !!validUntil && new Date(`${validUntil}T23:59:59`) < new Date();

// Au chargement, on retire du panier sauvegardé les offres déjà expirées.
const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return saved.filter((item) => !isExpired(item.validUntil));
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Stockage indisponible : on ignore.
    }
  }, [cart]);

  // Si la page reste ouverte, on retire aussi les offres qui expirent entre-temps.
  useEffect(() => {
    const id = setInterval(() => {
      setCart((prev) => {
        const next = prev.filter((item) => !isExpired(item.validUntil));
        return next.length === prev.length ? prev : next;
      });
    }, 60000);
    return () => clearInterval(id);
  }, []);

  const toggleItem = useCallback((item) => {
    setCart((prev) =>
      prev.some((i) => i.key === item.key) ? prev.filter((i) => i.key !== item.key) : [...prev, item]
    );
  }, []);

  const removeFromCart = useCallback((key) => setCart((prev) => prev.filter((i) => i.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo(
    () => ({
      cart,
      isCartOpen,
      openCart,
      closeCart,
      toggleItem,
      removeFromCart,
      clearCart,
      isInCart: (key) => cart.some((i) => i.key === key),
      countInCart: (serviceId) => cart.filter((i) => i.serviceId === serviceId).length,
      cartTotal: cart.reduce((sum, i) => sum + (i.price || 0), 0),
      hasQuoteOnlyItems: cart.some((i) => !i.price),
    }),
    [cart, isCartOpen, openCart, closeCart, toggleItem, removeFromCart, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé à l\'intérieur de <CartProvider>');
  return ctx;
}