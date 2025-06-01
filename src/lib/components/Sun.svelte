<script>
	import { T } from '@threlte/core';
	import { Spring, Tween } from 'svelte/motion';

	let { lightColor, darkColor, isPlaying } = $props();

	const radius = 30;

	const size = new Spring(0, {
		stiffness: 0.01,
		damping: 0.05
	});

	$effect(() => {
		if (isPlaying) {
			setTimeout(() => {
				size.set(1);
			}, 1000);
		}
	});
</script>

<T.Mesh>
	<T.SphereGeometry args={[size.current * radius, 32, 32]} />
	<T.MeshBasicMaterial color={lightColor} toneMapped={false} />
</T.Mesh>

<T.AmbientLight intensity={3} color={'white'} />
