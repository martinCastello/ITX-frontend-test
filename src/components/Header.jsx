import { useLocation } from 'preact-iso';
import { useTranslation } from '../i18n/useTranslation';
import { useCart } from '../context/CartContext';
import './Header.css';

function Breadcrumbs({ url }) {
	const { t } = useTranslation();

	if (url === '/') {
		return (
			<nav class="breadcrumbs" aria-label="breadcrumb">
				<span>{t('header.breadcrumb.home')}</span>
			</nav>
		);
	}

	return (
		<nav class="breadcrumbs" aria-label="breadcrumb">
			<a href="/">{t('header.breadcrumb.home')}</a>
			<span class="breadcrumbs__separator">/</span>
			<span>{t('header.breadcrumb.product')}</span>
		</nav>
	);
}

export function Header() {
	const { t, i18n } = useTranslation();
	const { url } = useLocation();
	const { count } = useCart();

	const toggleLang = () => {
		i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
	};

	return (
		<header class="header">
			<a href="/" class="header__logo">
				{t('header.logo')}
			</a>
			<Breadcrumbs url={url} />
			<div class="header__actions">
				<button class="header__lang" onClick={toggleLang}>
					{i18n.language === 'es' ? 'EN' : 'ES'}
				</button>
				<div class="header__cart" aria-label={t('header.cart.ariaLabel', { count })}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="9" cy="21" r="1" />
						<circle cx="20" cy="21" r="1" />
						<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
					</svg>
					{count > 0 && <span class="header__cart-count">{count}</span>}
				</div>
			</div>
		</header>
	);
}
