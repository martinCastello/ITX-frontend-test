import { render, screen, waitFor, fireEvent } from '@testing-library/preact';
import { Home } from './index';

const mockProducts = [
	{ id: '1', brand: 'Acer', model: 'Liquid Z6', price: '120', imgUrl: 'img1.jpg' },
	{ id: '2', brand: 'Samsung', model: 'Galaxy S21', price: '800', imgUrl: 'img2.jpg' },
];

describe('Home (PLP)', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn(() =>
			Promise.resolve({ ok: true, json: () => Promise.resolve(mockProducts) })
		));
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('shows loading state initially', () => {
		render(<Home />);
		expect(screen.getByText(/cargando/i)).toBeInTheDocument();
	});

	it('renders products after fetch', async () => {
		render(<Home />);
		await waitFor(() => {
			expect(screen.getByText('Acer')).toBeInTheDocument();
			expect(screen.getByText('Samsung')).toBeInTheDocument();
		});
	});

	it('renders search input on the right', async () => {
		render(<Home />);
		await waitFor(() => screen.getByText('Acer'));
		expect(screen.getByRole('searchbox')).toBeInTheDocument();
	});

	it('filters products by brand', async () => {
		render(<Home />);
		await waitFor(() => screen.getByText('Acer'));
		fireEvent.input(screen.getByRole('searchbox'), { target: { value: 'samsung' } });
		expect(screen.queryByText('Acer')).toBeNull();
		expect(screen.getByText('Samsung')).toBeInTheDocument();
	});

	it('filters products by model', async () => {
		render(<Home />);
		await waitFor(() => screen.getByText('Acer'));
		fireEvent.input(screen.getByRole('searchbox'), { target: { value: 'liquid' } });
		expect(screen.getByText('Acer')).toBeInTheDocument();
		expect(screen.queryByText('Samsung')).toBeNull();
	});

	it('shows empty state when no results match', async () => {
		render(<Home />);
		await waitFor(() => screen.getByText('Acer'));
		fireEvent.input(screen.getByRole('searchbox'), { target: { value: 'nokia' } });
		expect(screen.getByText(/no se encontraron/i)).toBeInTheDocument();
	});

	it('shows error when fetch fails', async () => {
		vi.stubGlobal('fetch', vi.fn(() =>
			Promise.resolve({ ok: false })
		));
		render(<Home />);
		await waitFor(() => {
			expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
		});
	});
});
