import { useState, useEffect } from 'preact/hooks';
import { useTranslation } from '../../i18n/useTranslation';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../services/api';
import './style.css';

export function Home() {
	const { t } = useTranslation();
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

	if (loading) return <p class="plp__status">{t('plp.loading')}</p>;
	if (error) return <p class="plp__status plp__status--error">{t('plp.error')}</p>;

	return (
		<div class="plp">
			<div class="plp__toolbar">
				<h1 class="plp__title">{t('plp.title')}</h1>
				<input
					class="plp__search"
					type="search"
					placeholder={t('plp.search')}
					value={search}
					onInput={e => setSearch(e.target.value)}
					aria-label={t('plp.search')}
				/>
			</div>
			<div class="plp__grid">
				{filtered.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{filtered.length === 0 && (
				<p class="plp__status">{t('plp.empty')}</p>
			)}
		</div>
	);
}
