<script>
	import { T } from '@threlte/core';
	import { AdditiveBlending } from 'three';
	import vertexShader from '$lib/shaders/pointVertex.glsl?raw';
	import fragmentShader from '$lib/shaders/pointFragment.glsl?raw';

	let { lightColor } = $props();

	const numStars = 1000;
	const radius = 1000;

	const streakLength = 100;

    // Geometry setup

	const pointPositions = new Float32Array(numStars * 3);
	for (let i = 0; i < numStars; i++) {
		const theta = Math.random() * 2 * Math.PI;
		const phi = Math.acos(2 * Math.random() - 1);
		const r = radius + (Math.random() - 0.5) * 500;

		const x = r * Math.sin(phi) * Math.cos(theta);
		const y = r * Math.sin(phi) * Math.sin(theta);
		const z = r * Math.cos(phi);

		pointPositions.set([x, y, z], i * 3);
	}

    const linePositions = new Float32Array(numStars * 3 * 2);
    const t = new Float32Array(numStars * 2);

</script>

<!-- <T.Points>
	<T.BufferGeometry>
		<T.BufferAttribute
			args={[pointPositions, 3]}
			attach={({ parent, ref }) => {
				parent.setAttribute('position', ref);
			}}
		/>
	</T.BufferGeometry>

	<T.PointsMaterial size={4} sizeAttenuation={true} depthWrite={false} color={lightColor} />
</T.Points> -->


	<!-- <T.ShaderMaterial
		{vertexShader}
		{fragmentShader}
		uniforms={{ uColor: { value: lightColor }, uStreakLength: { value: streakLength } }}
		transparent
		vertexColors={false}
		lights={false}
		toneMapped={false}
		depthWrite={false}
		blending={AdditiveBlending}
	/> -->