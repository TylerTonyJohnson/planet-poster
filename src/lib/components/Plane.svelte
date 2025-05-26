<script>
	import { T } from '@threlte/core';

	let { collision = $bindable() } = $props();
</script>

<T.Mesh rotation.x={-Math.PI / 2} visible={true} onpointermove={(e) => (collision = e.point)}>
	<T.PlaneGeometry args={[2000, 2000]} />
	<T.MeshBasicMaterial color={'#cac4a2'} toneMapped={false} wireframe />
</T.Mesh>
