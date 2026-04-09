'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ---------- GLSL ----------

const vertexShader = /* glsl */ `
// 3D Perlin noise (source: glsl-noise/classic/3d)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform vec2 uMouse;        // current mouse position (-1..1)
uniform vec2 uTrail;        // trailing mouse position (lags behind)
uniform float uMouseRadius;  // influence radius for current mouse
uniform float uScroll;       // page scroll offset in world units

varying vec3 vPos;

void main() {
  float t = uTime * uSpeed;

  // Offset position by scroll so pattern drifts with page
  vec3 scrolledPos = position + vec3(0.0, 0.0, uScroll);

  // Base wave distortion (matches ShaderGradient waterPlane)
  float distortion = 0.75 * cnoise(0.43 * scrolledPos * uNoiseDensity + t);

  // Boat wake effect: current mouse + trailing wake behind it
  vec2 mouseWorld = uMouse * 7.0;
  vec2 trailWorld = uTrail * 7.0;

  // Current mouse: small sharp ripple
  float distMouse = length(position.xy - mouseWorld);
  float ripple = smoothstep(uMouseRadius, 0.0, distMouse);
  float rippleNoise = 0.3 * cnoise(position * 3.0 + t * 3.0);
  distortion += ripple * rippleNoise * 0.35;

  // Wake trail: softer, wider, fading behind mouse
  float distTrail = length(position.xy - trailWorld);
  float wake = smoothstep(2.0, 0.0, distTrail) * 0.2;
  distortion += wake * cnoise(position * 2.5 + t * 1.5);

  vec3 pos = position + normal * distortion * uNoiseStrength;
  vPos = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec3 vPos;

void main() {
  // Gradient: color1 -> color2 on X axis, blend with color3 on Z axis
  // Matches ShaderGradient: mix(mix(c1, c2, smoothstep(-3,3,x)), c3, z)
  vec3 gradient = mix(
    mix(uColor1, uColor2, smoothstep(-3.0, 3.0, vPos.x)),
    uColor3,
    smoothstep(-1.0, 1.0, vPos.z)
  );

  gl_FragColor = vec4(gradient, 1.0);
}
`;

// ---------- WaterPlane mesh ----------

interface WaterPlaneProps {
  color1: string;
  color2: string;
  color3: string;
  mouseRef: React.RefObject<{ x: number; y: number } | null>;
}

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

function WaterPlane({ color1, color2, color3, mouseRef }: WaterPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 0.08 },
      uNoiseDensity: { value: 2.0 },
      uNoiseStrength: { value: 3.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTrail: { value: new THREE.Vector2(0, 0) },
      uMouseRadius: { value: 1.2 },
      uScroll: { value: 0 },
      uColor1: { value: hexToVec3(color1) },
      uColor2: { value: hexToVec3(color2) },
      uColor3: { value: hexToVec3(color3) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Scroll offset from page
  const scrollRef = useRef(0);
  useEffect(() => {
    const handler = (e: Event) => {
      scrollRef.current = (e as CustomEvent).detail as number;
    };
    window.addEventListener('shader-scroll', handler);
    return () => window.removeEventListener('shader-scroll', handler);
  }, []);

  // Smooth mouse lerp target + slow trail
  const smoothMouse = useRef(new THREE.Vector2(0, 0));
  const smoothTrail = useRef(new THREE.Vector2(0, 0));
  const smoothScroll = useRef(0);

  useFrame((state, delta) => {
    // Move mesh physically through camera view based on scroll
    // Factor: 0.0015 units per pixel — matches content scroll speed visually
    const scrollTarget = scrollRef.current * 0.0015;
    smoothScroll.current += (scrollTarget - smoothScroll.current) * Math.min(1, delta * 20);
    if (meshRef.current) {
      meshRef.current.position.z = -smoothScroll.current;
    }
    // uScroll not used in shader currently

    uniforms.uTime.value = state.clock.elapsedTime;

    // Update colors (in case theme changed)
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    const c3 = new THREE.Color(color3);
    uniforms.uColor1.value.set(c1.r, c1.g, c1.b);
    uniforms.uColor2.value.set(c2.r, c2.g, c2.b);
    uniforms.uColor3.value.set(c3.r, c3.g, c3.b);

    // Smooth mouse interpolation
    if (mouseRef.current) {
      // Convert pixel coords to NDC (-1..1)
      const nx = (mouseRef.current.x / size.width) * 2 - 1;
      const ny = -((mouseRef.current.y / size.height) * 2 - 1);
      smoothMouse.current.lerp(new THREE.Vector2(nx, ny), 1 - Math.pow(0.05, delta));
    }
    uniforms.uMouse.value.copy(smoothMouse.current);

    // Trail: very slow lerp creates a lagging wake behind the mouse
    smoothTrail.current.lerp(smoothMouse.current, 1 - Math.pow(0.3, delta));
    uniforms.uTrail.value.copy(smoothTrail.current);
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 60, 160, 300]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------- Exported component ----------

interface WaterShaderProps {
  color1: string;
  color2: string;
  color3: string;
}

export default function WaterShader({ color1, color2, color3 }: WaterShaderProps) {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Captura mouse no document (container tem pointerEvents:none)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', handler, { passive: true });
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas
        dpr={[0.5, 0.75]}
        camera={{ position: [0, 1.8, 0], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ width: '100%', height: '100%' }}
      >
        <WaterPlane
          color1={color1}
          color2={color2}
          color3={color3}
          mouseRef={mouseRef}
        />
      </Canvas>
    </div>
  );
}
