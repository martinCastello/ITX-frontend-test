import { render, screen } from '@testing-library/preact';
import { LocationProvider } from 'preact-iso';
import { CartProvider } from '../context/CartContext';
import { Header } from './Header';

function renderWithLocation(ui, { path = '/', cartCount = 0 } = {}) {
	window.history.pushState({}, '', path);
	return render(
		<CartProvider initialCount={cartCount}>
			<LocationProvider>{ui}</LocationProvider>
		</CartProvider>
	);
}

describe('Header', () => {
	it('renders the app logo linking to home', () => {
		renderWithLocation(<Header />);
		const logo = screen.getByText('Mobile Shop');
		expect(logo).toBeInTheDocument();
		expect(logo.getAttribute('href')).toBe('/');
	});

	it('shows cart count badge when count > 0', () => {
		renderWithLocation(<Header />, { cartCount: 3 });
		expect(screen.getByText('3')).toBeInTheDocument();
	});

	it('hides cart badge when count is 0', () => {
		renderWithLocation(<Header />);
		expect(screen.queryByText('0')).toBeNull();
	});

	it('shows only Home in breadcrumbs on root path', () => {
		renderWithLocation(<Header />, { path: '/' });
		const breadcrumb = screen.getByLabelText('breadcrumb');
		expect(breadcrumb).toHaveTextContent('Home');
		expect(breadcrumb.querySelector('a')).toBeNull();
	});

	it('shows Home link and Product in breadcrumbs on product page', () => {
		renderWithLocation(<Header />, { path: '/product/123' });
		const breadcrumb = screen.getByLabelText('breadcrumb');
		expect(breadcrumb.querySelector('a')).toHaveAttribute('href', '/');
		expect(breadcrumb).toHaveTextContent('Product');
	});
});
