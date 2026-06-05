import { getCached, setCached } from './cache';

const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export async function fetchProducts() {
	const cached = getCached('products');
	if (cached) return cached;

	const res = await fetch(`${BASE_URL}/product`);
	if (!res.ok) throw new Error('Failed to fetch products');
	const data = await res.json();
	setCached('products', data);
	return data;
}

export async function fetchProduct(id) {
	const key = `product_${id}`;
	const cached = getCached(key);
	if (cached) return cached;

	const res = await fetch(`${BASE_URL}/product/${id}`);
	if (!res.ok) throw new Error('Failed to fetch product');
	const data = await res.json();
	setCached(key, data);
	return data;
}

export async function addToCart(id, colorCode, storageCode) {
	const res = await fetch(`${BASE_URL}/cart`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id, colorCode, storageCode }),
	});
	if (!res.ok) throw new Error('Failed to add to cart');
	return res.json();
}
