<script>
	import { T } from '@threlte/core';

	let { lightColor, darkColor, size } = $props();

	const radius = 30;
</script>

<T.Mesh>
	<T.SphereGeometry args={[size * radius, 32, 32]} />
	<T.MeshBasicMaterial color={lightColor} toneMapped={false} />
</T.Mesh>

<T.AmbientLight intensity={3} color={'white'} />

<!-- <T.PointLight intensity={5000} color={'white'} /> -->
