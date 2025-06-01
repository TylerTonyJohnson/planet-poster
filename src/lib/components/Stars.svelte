<script>
	import { T } from '@threlte/core';
	import { InstancedMesh, Instance } from '@threlte/extras';
	import { DoubleSide } from 'three';
	import { Tween } from 'svelte/motion';
	import { cubicIn, cubicInOut } from 'svelte/easing';

	let { lightColor, isPlaying, camera } = $props();

	const STREAK_COUNT = 1000; // e.g. 1 degree spacing
	const MIN_RADIUS = 100;
	const MAX_RADIUS = MIN_RADIUS + 600;
	const STREAK_LENGTH = 60;
	const MAX_STREAK_THICKNESS = 4;
	const MIN_STREAK_THICKNESS = 0.5;

	const offset = new Tween(200, {
		duration: 2000,
		easing: cubicInOut,
		delay: 0
	});

	const starOpacity = new Tween(1, {
		duration: 3000,
		easing: cubicInOut,
		delay: 0
	});

	let streaks = [];

	for (let i = 0; i < STREAK_COUNT; i++) {
		const angle = (i / STREAK_COUNT) * Math.PI * 2; // / 4 + (3 * Math.PI) / 8; // 45 degrees offset

		const distance = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
		// Calculate direction based on angle

		const dirX = Math.cos(angle);
		const dirZ = Math.sin(angle);

		const x = Math.cos(angle) * distance;
		const z = Math.sin(angle) * distance;

		const thickness =
			Math.random() * (MAX_STREAK_THICKNESS - MIN_STREAK_THICKNESS) + MIN_STREAK_THICKNESS;

		streaks.push({
			position: [x, 0, z],
			rotation: [-Math.PI / 2, 0, -angle],
			thickness: thickness
		});
	}

	$effect(() => {
		if (isPlaying) {
			console.log('setting');
			offset.set(0);
			starOpacity.set(0.25);
		}
	});
</script>

<InstancedMesh
	limit={STREAK_COUNT}
	range={STREAK_COUNT}
	position={[0, offset.current, -offset.current]}
	rotation={[1, 0, 0]}
	renderOrder={-1}
>
	<T.PlaneGeometry args={[STREAK_LENGTH, 0.1]} />
	<T.MeshBasicMaterial color={lightColor} depthWrite={false} toneMapped={false} />

	{#each streaks as { position, rotation, thickness }}
		<Instance {position} {rotation} scale={[1, thickness * starOpacity.current, 1]} />
	{/each}
</InstancedMesh>
