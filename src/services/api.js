const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export async function fetchProducts() {
	const res = await fetch(`${BASE_URL}/product`);
	if (!res.ok) throw new Error('Failed to fetch products');
	return res.json();
}

export async function fetchProduct(id) {
	const res = await fetch(`${BASE_URL}/product/${id}`);
	if (!res.ok) throw new Error('Failed to fetch product');
	return res.json();
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
