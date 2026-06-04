import { useLocation } from 'preact-iso';
import './Header.css';

function Breadcrumbs({ url }) {
	if (url === '/') {
		return (
			<nav class="breadcrumbs" aria-label="breadcrumb">
				<span>Home</span>
			</nav>
		);
	}

	return (
		<nav class="breadcrumbs" aria-label="breadcrumb">
			<a href="/">Home</a>
			<span class="breadcrumbs__separator">/</span>
			<span>Product</span>
		</nav>
	);
}

export function Header({ cartCount = 0 }) {
	const { url } = useLocation();

	return (
		<header class="header">
			<a href="/" class="header__logo">
				Mobile Shop
			</a>
			<Breadcrumbs url={url} />
			<div class="header__cart" aria-label={`Cart: ${cartCount} items`}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="9" cy="21" r="1" />
					<circle cx="20" cy="21" r="1" />
					<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
				</svg>
				{cartCount > 0 && <span class="header__cart-count">{cartCount}</span>}
			</div>
		</header>
	);
}
