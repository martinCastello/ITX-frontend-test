import { render, screen } from '@testing-library/preact';
import { LocationProvider } from 'preact-iso';
import { CartProvider } from '../context/CartContext';
import { Header } from './Header';

function renderHeader({ cartCount = 0, path = '/' } = {}) {
	window.history.pushState({}, '', path);
	return render(
		<CartProvider initialCount={cartCount}>
			<LocationProvider><Header /></LocationProvider>
		</CartProvider>
	);
}

describe('Header', () => {
	it('renders the app logo linking to home', () => {
		renderHeader();
		const logo = screen.getByText('Tienda Móvil');
		expect(logo).toBeInTheDocument();
		expect(logo.getAttribute('href')).toBe('/');
	});

	it('shows cart count badge when count > 0', () => {
		renderHeader({ cartCount: 3 });
		expect(screen.getByText('3')).toBeInTheDocument();
	});

	it('hides cart badge when count is 0', () => {
		renderHeader();
		expect(screen.queryByText('0')).toBeNull();
	});

	it('renders language toggle button', () => {
		renderHeader();
		expect(screen.getByText('EN')).toBeInTheDocument();
	});

	it('hides breadcrumbs on home page', () => {
		renderHeader({ path: '/' });
		expect(screen.queryByLabelText('breadcrumb')).toBeNull();
	});

	it('shows breadcrumbs on product page', () => {
		renderHeader({ path: '/product/123' });
		expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
	});
});
