import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import './i18n/index.js';
import { CartProvider } from './context/CartContext.jsx';
import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { ProductDetail } from './pages/ProductDetail/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';

export function App() {
	return (
		<CartProvider>
			<LocationProvider>
				<Header />
				<main>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/product/:id" component={ProductDetail} />
						<Route default component={NotFound} />
					</Router>
				</main>
			</LocationProvider>
		</CartProvider>
	);
}

render(<App />, document.getElementById('app'));
