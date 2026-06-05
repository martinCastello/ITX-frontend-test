const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export async function fetchProducts() {
	const res = await fetch(`${BASE_URL}/product`);
	if (!res.ok) throw new Error('Failed to fetch products');
	return res.json();
}
