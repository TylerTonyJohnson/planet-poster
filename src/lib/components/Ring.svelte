<script>
	import { T, useTask } from '@threlte/core';
	import { MeshLineMaterial, MeshLineGeometry } from '@threlte/extras';
	import { EllipseCurve, Vector3 } from 'three';

	let { radius, color, type = 'solid', tilt = { x: 0, y: 0 }, thickness } = $props();

	function getPoints() {
		const curve = new EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
		const points = curve.getPoints(50).map((p) => new Vector3(p.x, 0, p.y));
		return points;
	}
</script>

<T.Mesh rotation={[tilt.x, 0, tilt.y]}>
	<MeshLineGeometry points={getPoints()} />
	{#if type === 'dashed'}
		<MeshLineMaterial {color} width={0.2} transparent dashArray={0.85 / radius} dashRatio={0.5} />
	{:else}
		<MeshLineMaterial {color} width={thickness} />
	{/if}
</T.Mesh>
