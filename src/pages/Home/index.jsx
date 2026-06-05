import { useState, useEffect } from 'preact/hooks';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../services/api';
import './style.css';

export function Home() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchProducts()
			.then(setProducts)
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	const filtered = products.filter(p => {
		const q = search.toLowerCase();
		return p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q);
	});

	if (loading) return <p class="plp__status">Cargando productos...</p>;
	if (error) return <p class="plp__status plp__status--error">{error}</p>;

	return (
		<div class="plp">
			<div class="plp__toolbar">
				<h1 class="plp__title">Productos</h1>
				<input
					class="plp__search"
					type="search"
					placeholder="Buscar por marca o modelo..."
					value={search}
					onInput={e => setSearch(e.target.value)}
					aria-label="Buscar productos"
				/>
			</div>
			<div class="plp__grid">
				{filtered.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{filtered.length === 0 && (
				<p class="plp__status">No se encontraron productos.</p>
			)}
		</div>
	);
}
