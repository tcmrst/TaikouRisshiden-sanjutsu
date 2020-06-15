import App from './App.svelte';
import { calculate } from './calc';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;
