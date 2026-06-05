import { render, screen, waitFor, fireEvent } from '@testing-library/preact';
import { CartProvider } from '../../context/CartContext';
import { ProductDetail } from './index';

const mockProduct = {
	id: 'abc123',
	brand: 'Acer',
	model: 'Liquid Z6',
	price: '120',
	imgUrl: 'https://example.com/img.jpg',
	os: 'Android 6.0',
	cpu: 'Quad-core 1.3 GHz',
	ram: '2 GB RAM',
	battery: 'Li-Ion 3000 mAh',
	options: {
		colors: [
			{ code: 1000, name: 'Black' },
			{ code: 1001, name: 'White' },
		],
		storages: [
			{ code: 2000, name: '16 GB' },
			{ code: 2001, name: '32 GB' },
		],
	},
};

function renderPDP(id = 'abc123') {
	return render(
		<CartProvider>
			<ProductDetail id={id} />
		</CartProvider>
	);
}

describe('ProductDetail', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn(() =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(mockProduct) })
		));
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		localStorage.clear();
	});

	it('shows loading state initially', () => {
		renderPDP();
		expect(screen.getByText(/cargando/i)).toBeInTheDocument();
	});

	it('renders brand and model after fetch', async () => {
		renderPDP();
		await waitFor(() => {
			expect(screen.getByText('Acer Liquid Z6')).toBeInTheDocument();
		});
	});

	it('renders price', async () => {
		renderPDP();
		await waitFor(() => {
			expect(screen.getByText('120 €')).toBeInTheDocument();
		});
	});

	it('renders back link to product list', async () => {
		renderPDP();
		await waitFor(() => screen.getByText(/volver/i));
		expect(screen.getByText(/volver/i).closest('a')).toHaveAttribute('href', '/');
	});

	it('renders color selector with all options', async () => {
		renderPDP();
		await waitFor(() => screen.getByText('Black'));
		expect(screen.getByText('Black')).toBeInTheDocument();
		expect(screen.getByText('White')).toBeInTheDocument();
	});

	it('renders storage selector with all options', async () => {
		renderPDP();
		await waitFor(() => screen.getByText('16 GB'));
		expect(screen.getByText('16 GB')).toBeInTheDocument();
		expect(screen.getByText('32 GB')).toBeInTheDocument();
	});

	it('pre-selects first color and storage by default', async () => {
		renderPDP();
		await waitFor(() => screen.getByText('Black'));
		expect(screen.getByText('Black').className).toContain('selected');
		expect(screen.getByText('16 GB').className).toContain('selected');
	});

	it('changes selected option on click', async () => {
		renderPDP();
		await waitFor(() => screen.getByText('White'));
		fireEvent.click(screen.getByText('White'));
		expect(screen.getByText('White').className).toContain('selected');
		expect(screen.getByText('Black').className).not.toContain('selected');
	});

	it('calls addToCart and updates cart count on add', async () => {
		vi.stubGlobal('fetch', vi.fn()
			.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockProduct) })
			.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ count: 1 }) })
		);
		renderPDP();
		await waitFor(() => screen.getByText(/añadir/i));
		fireEvent.click(screen.getByText(/añadir/i));
		await waitFor(() => {
			expect(fetch).toHaveBeenCalledTimes(2);
		});
	});

	it('shows error when fetch fails', async () => {
		vi.stubGlobal('fetch', vi.fn(() =>
			Promise.resolve({ ok: false })
		));
		renderPDP();
		await waitFor(() => {
			expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
		});
	});
});
