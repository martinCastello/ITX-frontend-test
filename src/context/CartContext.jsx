import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

const CartContext = createContext(null);

export function CartProvider({ children, initialCount = 0 }) {
	const [count, setCount] = useState(() => {
		const stored = sessionStorage.getItem('cartCount');
		return stored !== null ? parseInt(stored, 10) : initialCount;
	});

	const updateCount = (newCount) => {
		sessionStorage.setItem('cartCount', String(newCount));
		setCount(newCount);
	};

	return (
		<CartContext.Provider value={{ count, updateCount }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	return useContext(CartContext);
}
