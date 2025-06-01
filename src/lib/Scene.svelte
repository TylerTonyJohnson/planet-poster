<script>
	import { T, useLoader, useTask, useThrelte } from '@threlte/core';
	import {
		interactivity,
		MeshLineMaterial,
		MeshLineGeometry,
		OrbitControls,
		Gizmo
	} from '@threlte/extras';
	import {
		Color,
		CanvasTexture,
		NearestFilter,
		TextureLoader,
		DirectionalLight,
		DataTexture,
		RGBAFormat,
		SRGBColorSpace,
		EllipseCurve,
		Vector3
	} from 'three';
	import Orbit from './components/Orbit.svelte';
	import Planet from './components/Planet.svelte';
	import Sun from './components/Sun.svelte';
	import Stars from './components/Stars.svelte';
	import Plane from './components/Plane.svelte';
	import Rocket from './components/Rocket.svelte';
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	let { isPlaying } = $props();

	const { pointer } = interactivity();

	const lightColor = new Color('#CAC4A2');
	const darkColor = new Color('#33342D');
	const orangeColor = new Color('#CA4C21');

	// Set background color
	const { scene, renderer } = useThrelte();
	scene.background = darkColor;

	let collision = $state(new Vector3(10, 0, 10));
	// $inspect("collision", collision);

	// --- DATA ---
	const planets = [
		{
			size: 20,
			orbit: {
				radius: 95,
				startAngle: Math.PI / 2 - 0.15,
				startDelay: 200,
				tilt: {
					x: 0.4,
					y: 0
				}
			},
			rings: false
		},
		{
			size: 13,
			orbit: {
				radius: 232,
				startAngle: Math.PI / 2 - 0.12,
				startDelay: 500,
				tilt: {
					x: 0.15,
					y: 0
				}
			},
			rings: { radius: 10, tilt: { x: -Math.PI / 8 + 0.075, y: -Math.PI / 8 - 0.05 }, thickness: 2 }
		},
		{
			size: 9.5,
			orbit: {
				radius: 270,
				startAngle: Math.PI / 2 + 0.1,
				startDelay: 100,
				tilt: {
					x: 0.1,
					y: 0
				}
			},
			rings: false
		},
		{
			size: 5,
			orbit: {
				radius: 360,
				startAngle: Math.PI / 2,
				startDelay: 400,
				tilt: {
					x: 0,
					y: 0
				}
			},
			rings: false
		},
		{
			size: 4.5,
			orbit: {
				radius: 385,
				startAngle: Math.PI / 2 - 0.055,
				startDelay: 300,
				tilt: {
					x: -0.02,
					y: 0
				}
			},
			rings: false
		},
		{
			size: 2,
			orbit: {
				radius: 443,
				startAngle: Math.PI / 2 + 0.012,
				startDelay: 700,
				tilt: {
					x: -0.1,
					y: 0
				}
			},
			rings: false
		},
		{
			size: 0.6,
			orbit: {
				radius: 477,
				startAngle: Math.PI / 2 - 0.0043,
				startDelay: 600,
				tilt: {
					x: -0.149,
					y: 0
				}
			},
			rings: false
		}
	];

	// Create 2 tone gradient map for toon shader
	const gradientMap = new DataTexture(
		new Uint8Array([0, 0, 0, 255, 255, 255, 255, 255]),
		2,
		1,
		RGBAFormat
	);
	gradientMap.colorSpace = SRGBColorSpace;
	gradientMap.needsUpdate = true;
	gradientMap.minFilter = NearestFilter;
	gradientMap.magFilter = NearestFilter;
	gradientMap.generateMipmaps = false;

	const cameraStartPosition = [0, 80, planets[3].orbit.radius + 120];
	const cameraStartTarget = [0, 0, planets[3].orbit.radius];
	const cameraEndPosition = [0, 600, 550];
	const cameraEndTarget = [0, 0, 0];

	const cameraPosition = new Tween(cameraStartPosition, {
		duration: 3000,
		easing: cubicInOut,
		delay: 1000
	});
	const cameraTarget = new Tween(cameraStartTarget, {
		duration: 3000,
		easing: cubicInOut,
		delay: 1000
	});

	const fadeValue = new Tween(0, {
		duration: 1000,
		easing: cubicInOut
	});

	// let isPlaying = $state(false);
	let camera = $state();

	$effect(() => {
		if (isPlaying) {
			fadeValue.set(1);
			cameraPosition.set(cameraEndPosition);
			cameraTarget.set(cameraEndTarget);
		} else {
			fadeValue.set(0);
		}
	});

	$effect(() => {
		camera.lookAt(...cameraTarget.current);
	});
</script>

<!-- onPointerMove((e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
}); -->

<!-- <svelte:window
	onkeydown={(e) => {
		if (e.code === 'Space') {
			isPlaying = true;
		}
	}}
/> -->

<!-- CAMERA -->
<T.PerspectiveCamera
	position={cameraPosition.current}
	makeDefault
	oncreate={(ref) => {
		camera = ref;
		ref.lookAt(...cameraTarget.current);
	}}
	fov={50}
>
	<!-- <OrbitControls
		oncreate={(ref) => {
			ref.target.set(...cameraTarget.current);
		}}
	>
		<Gizmo />
	</OrbitControls>> -->
</T.PerspectiveCamera>

<!-- <T.PointLight position={[0, 10, -10]} intensity={1000} color={lightColor} /> -->
<!-- <T.AmbientLight intensity={1} color="white" /> -->
<!-- <T.DirectionalLight position={[0, 5, -5]} intensity={1} color={lightColor} />
<T.DirectionalLight position={[0, -5, 5]} intensity={3} color={darkColor} /> -->

<Plane bind:collision visible={false} />

<!-- SUN -->
<Sun {lightColor} {darkColor} {isPlaying} />

<!-- ORBITS -->

{#each planets as planet}
	<!-- <Orbit radius={planet.orbit} color={lightColor} type={'dashed'} {isPlaying} /> -->
	<Planet {planet} {lightColor} {darkColor} {gradientMap} {isPlaying} rampValue={fadeValue} />
{/each}

<!-- STARS -->
<Stars {lightColor} {isPlaying} {camera} />

<!-- ROCKET -->
<Rocket target={collision} color={orangeColor} {isPlaying} {lightColor} />
