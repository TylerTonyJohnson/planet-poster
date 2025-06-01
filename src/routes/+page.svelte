<script>
	import Scene from '$lib/Scene.svelte';
	import { Canvas } from '@threlte/core';
	import { Code, Play } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	let showOverlay = $state(false);

	$effect(() => {
		const timeout = setTimeout(() => {
			showOverlay = true;
		}, 3000);

		return () => clearTimeout(timeout);
	});

	let isPlaying = $state(false);
</script>

<div class="frame" class:widen={isPlaying}>
	<div class="border" class:widen={isPlaying}>
		<div class="pane">
			<Canvas>
				<Scene {isPlaying} />
			</Canvas>
			{#if showOverlay}
				<div class="overlay" in:fade={{ duration: 500 }}>
					{#if !isPlaying}
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button class="play" onclick={() => (isPlaying = true)} transition:fade>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="3rem"
								height="3rem"
								viewBox="0 0 24 24"
								fill="#CA4C21"
								class="lucide lucide-play-icon lucide-play"
								><polygon points="6 3 20 12 6 21 6 3" /></svg
							>
						</button>
						<h3 class="prompt">Press Play</h3>
					{/if}
					<div class="contribution">
						<p>
							Inspired by the beautiful art of <a
								href="https://www.reddit.com/user/igo_rs/"
								target="_blank"
								rel="noopener noreferrer">u/igo_rs</a
							>. Check out their work on Reddit.
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<a
		href="https://github.com/your-repo"
		target="_blank"
		rel="noopener noreferrer"
		class="code-button"
		class:widen={isPlaying}
	>
		<Code />
	</a>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(html) {
		background-color: #171714;
		font-family: 'Orbitron', sans-serif;
	}

	.frame {
		margin: auto;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 3rem;
		transition: padding 3s ease-in-out;
		background-color: #171714;
	}

	.frame.widen {
		padding: 1rem;
	}

	.pane {
		position: relative;
		height: 100%;
		width: 100%;

		border-radius: 0.5rem;
		overflow: hidden;
		/* outline: solid 1rem #cac4a2; */
	}

	.overlay {
		width: 100%;
		height: 100%;
	}

	.play {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 5.35rem;
		aspect-ratio: 1;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		z-index: 10;
		/* border: solid white 1px; */
		background-color: transparent;
		display: grid;
		place-content: center;
		place-items: center;

		transform-origin: 0 0;
	}
	.play:hover {
		background-color: #cac4a2;
	}

	.prompt {
		position: absolute;
		top: calc(50% + 3rem);
		left: 50%;
		transform: translate(-50%, 0%);
		color: #ca4c21;
		font-size: 1.5rem;
		text-align: center;
		font-weight: bold;
		animation: fadeLoop 2s infinite ease-in-out;
	}

	svg {
		animation: fadeLoop 2s infinite ease-in-out;
	}

	.border.widen {
		width: 100%;
	}

	.border {
		height: 100%;
		max-height: 100vh;
		max-width: 100vw;
		width: calc(62vh - 6rem);
		padding: 1rem;
		background-color: #cac4a2;
		transition: width 3s ease-in-out;
	}

	.code-button {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background-color: #33342d;
		border: none;
		cursor: pointer;
		color: #cac4a2;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
		transition:
			background-color 0.2s ease-out,
			color 0.2s ease-out,
			bottom 0.2s ease-out,
			right 0.2s ease-out;
		outline: 2px solid #cac4a2;
	}

	.code-button.widen {
		bottom: 3rem;
		right: 3rem;
	}

	.code-button:hover {
		background-color: #cac4a2;
		color: #33342d;
	}

	.contribution {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		color: #cac4a2;
		font-size: 1.25rem;
		/* opacity: 0.85; */
		text-align: center;
		width: 90%;
		line-height: 1.5;
		background-color: #33342d;
		padding: 0.5rem;
		/* border: solid white 1px; */
	}

	.contribution a {
		color: #ca4c21;
		text-decoration: none;
		border-bottom: 1px dotted #ca4c21;
		transition: opacity 0.2s ease;
		font-size: inherit;
		font-weight: bold;
		background-color: #33342d;
		border: solid 2px #ca4c21;
		padding: 0.15rem 0.5rem;
		border-radius: 0.5rem;
	}

	.contribution a:hover {
		background-color: #cac4a2;
	}

	@keyframes fadeLoop {
		0% {
			opacity: 0.25;
			/* scale: 1; */
		}
		50% {
			opacity: 1;
			/* scale: 1.05; */
		}
		100% {
			opacity: 0.25;
			/* scale: 1; */
		}
	}
</style>
