import './ProductCard.css';

export function ProductCard({ product }) {
	return (
		<a href={`/product/${product.id}`} class="product-card">
			<img
				src={product.imgUrl}
				alt={`${product.brand} ${product.model}`}
				class="product-card__img"
				loading="lazy"
			/>
			<div class="product-card__info">
				<span class="product-card__brand">{product.brand}</span>
				<span class="product-card__model">{product.model}</span>
				{product.price && (
					<span class="product-card__price">{product.price} €</span>
				)}
			</div>
		</a>
	);
}
