import { useState, useEffect } from 'preact/hooks';
import i18n from './index.js';

export function useTranslation() {
	const [, setLang] = useState(i18n.language);

	useEffect(() => {
		const handler = (lng) => setLang(lng);
		i18n.on('languageChanged', handler);
		return () => i18n.off('languageChanged', handler);
	}, []);

	return {
		t: (key, opts) => i18n.t(key, opts),
		i18n,
	};
}
