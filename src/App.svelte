
<script>
	import { calculate } from './calc';
	export let result = '';
	let operators = "";

	function handleOperatorChanged(event) {
		try {
			var { value } = event.target;
			var operators = value.slice(0, -1);
			var solution = Number(value.slice(-1));
			result = calculate(operators, solution) || "答えが存在しません";
		} catch (e) {
			console.error(e);
		}
	}
</script>

<main>
	<h1>太閤立志伝V 算術ツール</h1>
	<p>太閤立志伝Vの算術ミニゲームを自動で計算します<br />□ ＋ □ ÷ □ × □ = 8なら、+/*8と入力します<br /><a href="https://github.com/tcmrst/TaikouRisshiden-sanjutsu">ソースコードはこちら</a></p>

	<input value={operators} on:input={handleOperatorChanged} placeholder="+/*8" />
	<p class="result">{result}</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1, .result {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
