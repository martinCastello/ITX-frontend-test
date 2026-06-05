import { render, screen } from '@testing-library/preact';
import { ProductCard } from './ProductCard';
import { describe, expect, it } from 'vitest';

const mockProduct = {
	id: 'abc123',
	brand: 'Acer',
	model: 'Liquid Z6',
	price: '120',
	imgUrl: 'https://example.com/img.jpg',
};

describe('ProductCard', () => {
	it('renders brand and model', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText('Acer')).toBeInTheDocument();
		expect(screen.getByText('Liquid Z6')).toBeInTheDocument();
	});

	it('renders price with euro sign', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText('120 €')).toBeInTheDocument();
	});

	it('hides price when empty string', () => {
		render(<ProductCard product={{ ...mockProduct, price: '' }} />);
		expect(screen.queryByText(/€/)).toBeNull();
	});

	it('links to product detail page', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByRole('link')).toHaveAttribute('href', '/product/abc123');
	});

	it('renders image with alt text', () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByAltText('Acer Liquid Z6')).toBeInTheDocument();
	});
});
