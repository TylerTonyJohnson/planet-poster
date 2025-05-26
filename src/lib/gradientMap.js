import { DataTexture, UnsignedByteType, NearestFilter, RedFormat, RGBFormat } from 'three';

// Define your light and dark RGB values
const steps = [
	0x33,
	0x33,
	0x2d, // dark: #33332D
	0xca,
	0xc4,
	0xa2 // light: #CAC4A2
];

const data = new Uint8Array(steps);

// Width = 2 colors, height = 1, RGB format
const gradientMap = new DataTexture(data, 2, 1, RGBFormat, UnsignedByteType);

gradientMap.minFilter = NearestFilter;
gradientMap.magFilter = NearestFilter;
gradientMap.generateMipmaps = false;
gradientMap.needsUpdate = true;

export default gradientMap;

// import * as THREE from 'three';

// const canvas = document.createElement('canvas');
// canvas.width = 1;
// canvas.height = 16; // You can adjust the height based on desired gradient steps
// const context = canvas.getContext('2d');

// const gradient = context.createLinearGradient(0, 0, 0, canvas.height);

// // Add your two color stops
// gradient.addColorStop(0, '#33332D'); // Dark color for shadows (bottom of the gradient)
// gradient.addColorStop(1, '#CAC4A2'); // Light color for highlights (top of the gradient)

// context.fillStyle = gradient;
// context.fillRect(0, 0, canvas.width, canvas.height);

// const gradientTexture = new THREE.CanvasTexture(canvas);

// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;

// export default gradientTexture;
