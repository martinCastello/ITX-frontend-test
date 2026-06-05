import { useState, useEffect } from 'preact/hooks';
import { fetchProduct, addToCart } from '../../services/api';
import { useCart } from '../../context/CartContext';
import './style.css';

export function ProductDetail({ id }) {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [selectedStorage, setSelectedStorage] = useState(null);
	const [adding, setAdding] = useState(false);
	const { count, updateCount } = useCart();

	useEffect(() => {
		fetchProduct(id)
			.then(data => {
				setProduct(data);
				setSelectedColor(data.options?.colors?.[0]?.code ?? null);
				setSelectedStorage(data.options?.storages?.[0]?.code ?? null);
			})
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, [id]);

	const handleAddToCart = async () => {
		setAdding(true);
		try {
			const result = await addToCart(id, selectedColor, selectedStorage);
			updateCount(count + result.count);
		} finally {
			setAdding(false);
		}
	};

	if (loading) return <p class="pdp__status">Cargando producto...</p>;
	if (error) return <p class="pdp__status pdp__status--error">{error}</p>;

	const { brand, model, price, imgUrl, os, cpu, ram, battery, options } = product;

	return (
		<div class="pdp">
			<div class="pdp__image-col">
				<img src={imgUrl} alt={`${brand} ${model}`} class="pdp__image" />
			</div>

			<div class="pdp__details-col">
				<a href="/" class="pdp__back">← Volver al listado</a>

				<h1 class="pdp__title">{brand} {model}</h1>
				{price && <p class="pdp__price">{price} €</p>}

				<div class="pdp__specs">
					{os && <div class="pdp__spec"><span>Sistema operativo</span><span>{os}</span></div>}
					{cpu && <div class="pdp__spec"><span>Procesador</span><span>{cpu}</span></div>}
					{ram && <div class="pdp__spec"><span>RAM</span><span>{ram}</span></div>}
					{battery && <div class="pdp__spec"><span>Batería</span><span>{battery}</span></div>}
				</div>

				<div class="pdp__actions">
					{options?.storages?.length > 0 && (
						<div class="pdp__selector">
							<p class="pdp__selector-label">Almacenamiento</p>
							<div class="pdp__selector-options">
								{options.storages.map(s => (
									<button
										key={s.code}
										class={`pdp__option${selectedStorage === s.code ? ' pdp__option--selected' : ''}`}
										onClick={() => setSelectedStorage(s.code)}
									>
										{s.name}
									</button>
								))}
							</div>
						</div>
					)}

					{options?.colors?.length > 0 && (
						<div class="pdp__selector">
							<p class="pdp__selector-label">Color</p>
							<div class="pdp__selector-options">
								{options.colors.map(c => (
									<button
										key={c.code}
										class={`pdp__option${selectedColor === c.code ? ' pdp__option--selected' : ''}`}
										onClick={() => setSelectedColor(c.code)}
									>
										{c.name}
									</button>
								))}
							</div>
						</div>
					)}

					<button
						class="pdp__add-btn"
						onClick={handleAddToCart}
						disabled={adding}
					>
						{adding ? 'Añadiendo...' : 'Añadir'}
					</button>
				</div>
			</div>
		</div>
	);
}
