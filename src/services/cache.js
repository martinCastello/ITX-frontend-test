const TTL_MS = 60 * 60 * 1000; // 1 hora

export function getCached(key) {
	const raw = localStorage.getItem(key);
	if (!raw) return null;
	const { data, expiresAt } = JSON.parse(raw);
	if (Date.now() > expiresAt) {
		localStorage.removeItem(key);
		return null;
	}
	return data;
}

export function setCached(key, data) {
	localStorage.setItem(key, JSON.stringify({
		data,
		expiresAt: Date.now() + TTL_MS,
	}));
}
