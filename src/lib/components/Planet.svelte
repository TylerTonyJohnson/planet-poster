<script>
	import { T, useTask } from '@threlte/core';
	import { UniformsLib } from 'three';

	import fragmentShader from '$lib/shaders/fragment.glsl?raw';
	import vertexShader from '$lib/shaders/vertex.glsl?raw';
	import Orbit from './Orbit.svelte';
	import Ring from './Ring.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let { planet, lightColor, darkColor, gradientMap, isPlaying } = $props();

	const maxSpeed = (planet.size / planet.orbit.radius) * 5;

	const currentSpeed = new Tween(0, {
		duration: 1000,
		easing: cubicOut,
		delay: planet.orbit.startDelay + 3000 || 0
	});

	let currentAngle = $state(planet.orbit.startAngle);

	const orbitFade = new Tween(0, {
		duration: 1000,
		easing: cubicOut,
		delay: 4000
	});

	const orbitFlatten = new Tween(1, {
		duration: 1000,
		easing: cubicOut,
		delay: 2000
	});

	$effect((offset) => {
		if (isPlaying) {
			orbitFade.set(1);
			orbitFlatten.set(0);
			currentSpeed.set(maxSpeed);
		}
	});

	useTask((delta) => {
		if (!isPlaying) return;
		currentAngle += delta * currentSpeed.current;
	});
</script>

<!-- Planet and Orbit -->
<T.Group
	position={[0, 0, 0]}
	rotation={[
		planet.orbit.tilt.x * orbitFlatten.current,
		0,
		planet.orbit.tilt.y * orbitFlatten.current
	]}
>
	<!-- Orbit Line -->
	<Orbit
		radius={planet.orbit.radius}
		color={lightColor}
		type={'dashed'}
		thickness={planet.size * 0.01 + 0.1}
		opacity={orbitFade.current}
	/>

	<!-- Planet -->
	<T.Group
		position={[
			planet.orbit.radius * Math.cos(currentAngle),
			0,
			planet.orbit.radius * Math.sin(currentAngle)
		]}
	>
		<T.Mesh>
			<T.SphereGeometry args={[planet.size, 32, 32]} />
			<!-- <T.MeshToonMaterial color={darkColor} {gradientMap} /> -->
			<T.ShaderMaterial
				{fragmentShader}
				{vertexShader}
				uniforms={{
					lightColor: { value: lightColor.clone().convertLinearToSRGB() },
					darkColor: { value: darkColor.clone().convertLinearToSRGB() }
				}}
				toneMapped={false}
			/>
		</T.Mesh>
		{#if planet.rings}
			<Ring
				radius={planet.size + planet.rings.radius}
				color={lightColor}
				tilt={planet.rings.tilt || { x: 0, y: 0 }}
				thickness={planet.rings.thickness || 0.1}
			/>
		{/if}
	</T.Group>
</T.Group>
