<script>
	import { T, useTask } from '@threlte/core';
	import { MeshLineMaterial, MeshLineGeometry, useTexture } from '@threlte/extras';
	import { Spring } from 'svelte/motion';
	import { CatmullRomCurve3, Vector3, Matrix4 } from 'three';

	import fragmentShader from '$lib/shaders/fragment.glsl?raw';
	import vertexShader from '$lib/shaders/vertex.glsl?raw';

	let { target = { x: 10, y: 0, z: 10 }, color, isPlaying, lightColor } = $props();
	// $inspect(target, 'target');

	const minDistance = 10;

	const startPoints = [
		new Vector3(-31.783404910173463, 0, 385.8339372739138),
		new Vector3(4.390763781813425, 0, 397.75114173592635),
		new Vector3(-9.639008941453133, 0, 416.080222949946),
		new Vector3(40, 0, 407.4775432496613)
	];
	const position = new Spring(startPoints.at(-1).toArray(), {
		stiffness: 0.005,
		damping: 0.1
	});

	let currentRotation = $state(0);

	$effect(() => {
		if (!isPlaying) {
			position.set(position.current, { stiffness: 0, damping: 1 });
			return;
		}
		position.set(target.toArray(), { stiffness: 0.005, damping: 0.1 });
	});

	const startPath = new CatmullRomCurve3(startPoints)
		.getPoints(100)
		.map((p) => new Vector3(p.x, 0, p.z));

	const trail = $state(startPath);
	const maxTrailPoints = 100;

	const texture = useTexture('/images/Jet.jpg');

	useTask(() => {
		// console.log(position)
		if (!isPlaying) return;

		// Calculate rotation to face target
		const direction = new Vector3(...target).sub(new Vector3(...position.current)).normalize();

		const yaw = Math.atan2(direction.x, direction.z);
		currentRotation = yaw;

		// Calculate trail
		const distanceTraveled = new Vector3(position.current).distanceTo(trail[trail.length - 1]);
		if (distanceTraveled < minDistance) return;

		trail.push(new Vector3(...position.current));

		if (trail.length > maxTrailPoints) {
			trail.shift();
		}
	});

	const shear = new Matrix4().set(
		1,
		0,
		0,
		0,
		0.4,
		1,
		0,
		0, // skew X as Y increases
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	);
</script>

<T.Group position={[...position.current]} rotation.y={currentRotation}>
	<T.Mesh position={[0, 0, 13]} rotation={[Math.PI / 2, 0, 0]}>
		<T.ConeGeometry args={[1, 4, 32]} />
		<T.MeshBasicMaterial {color} toneMapped={false} />
	</T.Mesh>
	<T.Mesh position={[0, 0, 8]} rotation={[Math.PI / 2, 0, 0]}>
		<T.CylinderGeometry args={[1, 2, 6, 32]} />
		<T.MeshBasicMaterial {color} toneMapped={false} />
	</T.Mesh>
	<T.Mesh position={[0, 0, 3]} rotation={[Math.PI / 2, 0, 0]}>
		<T.CylinderGeometry args={[2, 2, 4, 32]} />
		<T.MeshBasicMaterial {color} toneMapped={false} />
	</T.Mesh>
	<T.Mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
		<T.CylinderGeometry args={[2, 1.5, 2, 32]} />
		<T.MeshBasicMaterial {color} toneMapped={false} />
	</T.Mesh>

	<!-- Fins -->

	<T.Group rotation.x={Math.PI / 2} rotation.y={0.2}>
		{#each [0, 90, 180, 270] as angle}
			<T.Group rotation={[0, (angle * Math.PI) / 180, 0]}>
				<T.Mesh position={[0, 0, 2]} rotation.x={-0.3}>
					<T.BoxGeometry args={[0.1, 4, 2]} oncreate={(ref) => ref.applyMatrix4(shear)} />
					<T.MeshBasicMaterial {color} toneMapped={false} />
				</T.Mesh>
			</T.Group>
		{/each}
	</T.Group>

	<!-- <T.Mesh>
		<T.SphereGeometry args={[.2, 32, 32]} />
		<T.ShaderMaterial
			{fragmentShader}
			{vertexShader}
			uniforms={{
				lightColor: { value: lightColor.clone().convertLinearToSRGB() },
				darkColor: { value: color.clone().convertLinearToSRGB() }
			}}
			toneMapped={false}
		/>
	</T.Mesh> -->
</T.Group>

{#if trail.length > 1}
	<T.Mesh>
		<MeshLineGeometry points={trail} />
		{#await texture then alphaMap}
			<MeshLineMaterial {color} width={3} transparent {alphaMap} />
		{/await}
	</T.Mesh>
{/if}
