<script>
	import Scene from '$lib/Scene.svelte';
	import { Canvas } from '@threlte/core';

	let hasStarted = false;
</script>

<div class="frame" class:widen={hasStarted}>
	<div class="border" class:widen={hasStarted}>
		<div class="pane">
			<Canvas>
				<Scene />
			</Canvas>
		</div>
	</div>
</div>

<svelte:window
	onkeydown={(e) => {
		if (e.code === 'Space') {
			hasStarted = true;
		}
	}}
/>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(html) {
		background-color: #171714;
	}

	.frame {
		margin: auto;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 3rem;
		transition: padding 1s ease-in-out;
		background-color: #171714;
	}

	.frame.widen {
		padding: 1rem;
	}

	.pane {
		height: 100%;
		width: 100%;

		border-radius: 0.5rem;
		overflow: hidden;
		/* outline: solid 1rem #cac4a2; */
	}

	.border.widen {
		width: 100%;
	}

	.border {
		height: 100%;
		width: calc(62vh - 6rem);
		padding: 1rem;
		background-color: #cac4a2;
		transition: width 3s ease-in-out;
	}
</style>
