import { getCached, setCached } from './cache';

describe('cache', () => {
	beforeEach(() => localStorage.clear());

	it('returns null when key not found', () => {
		expect(getCached('missing')).toBeNull();
	});

	it('returns cached data within TTL', () => {
		setCached('key', { foo: 'bar' });
		expect(getCached('key')).toEqual({ foo: 'bar' });
	});

	it('returns null and removes entry when expired', () => {
		setCached('key', { foo: 'bar' });
		const raw = JSON.parse(localStorage.getItem('key'));
		localStorage.setItem('key', JSON.stringify({ ...raw, expiresAt: Date.now() - 1 }));
		expect(getCached('key')).toBeNull();
		expect(localStorage.getItem('key')).toBeNull();
	});

	it('overwrites existing cache entry', () => {
		setCached('key', { v: 1 });
		setCached('key', { v: 2 });
		expect(getCached('key')).toEqual({ v: 2 });
	});
});
