"use client";

import {useRef, useMemo} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;
const DISK_INNER_RADIUS = 0.8;
const DISK_OUTER_RADIUS = 4.0;

function DiskParticles() {
  const meshRef = useRef<THREE.Points>(null);

  const {positions, colors, sizes} = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute particles in a disk shape with more density near center
      const t = Math.random();
      const r =
        DISK_INNER_RADIUS +
        (DISK_OUTER_RADIUS - DISK_INNER_RADIUS) * Math.pow(t, 0.6);
      const theta = Math.random() * Math.PI * 2;

      // Vertical spread decreases toward center (thin disk)
      const verticalSpread = 0.08 * r;
      const y = (Math.random() - 0.5) * verticalSpread;

      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      // Color: warm inner disk (deep orange) → cool outer disk (deep blue)
      const normalizedR = (r - DISK_INNER_RADIUS) / (DISK_OUTER_RADIUS - DISK_INNER_RADIUS);
      const warmColor = new THREE.Color(0.85, 0.45, 0.12);  // deep orange
      const coolColor = new THREE.Color(0.15, 0.40, 0.80);  // deep blue
      const midColor = new THREE.Color(0.55, 0.30, 0.60);   // deep purple
      let particleColor: THREE.Color;
      if (normalizedR < 0.5) {
        particleColor = warmColor.clone().lerp(midColor, normalizedR * 2);
      } else {
        particleColor = midColor.clone().lerp(coolColor, (normalizedR - 0.5) * 2);
      }

      // Add slight random variation
      particleColor.r += (Math.random() - 0.5) * 0.1;
      particleColor.g += (Math.random() - 0.5) * 0.08;
      particleColor.b += (Math.random() - 0.5) * 0.1;

      col[i * 3] = particleColor.r;
      col[i * 3 + 1] = particleColor.g;
      col[i * 3 + 2] = particleColor.b;

      // Smaller particles near outer edge
      siz[i] = (1.2 - normalizedR * 0.8) * (0.5 + Math.random() * 0.5);
    }

    return {positions: pos, colors: col, sizes: siz};
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = array[i * 3];
      const z = array[i * 3 + 2];
      const r = Math.sqrt(x * x + z * z);

      // Keplerian-like rotation: inner particles orbit faster
      const angularSpeed = 0.15 / Math.pow(Math.max(r, 0.5), 1.5);
      const angle = angularSpeed * delta;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      array[i * 3] = x * cos - z * sin;
      array[i * 3 + 2] = x * sin + z * cos;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.90}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CentralStar() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({clock}) => {
    if (!meshRef.current) return;
    const scale = 1 + Math.sin(clock.elapsedTime * 1.5) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshBasicMaterial color="#f5c860" transparent opacity={0.95} />
    </mesh>
  );
}

function StarGlow() {
  return (
    <mesh>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshBasicMaterial color="#e8a830" transparent opacity={0.18} />
    </mesh>
  );
}

export function ProtoplanetaryDisk() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{position: [0, 3.5, 5], fov: 45}}
        dpr={[1, 1.5]}
        gl={{antialias: true, alpha: true}}
        style={{background: "transparent"}}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 2, 0]} intensity={1.5} color="#ffe0a0" />
        <group rotation={[-0.3, 0, 0.1]}>
          <CentralStar />
          <StarGlow />
          <DiskParticles />
        </group>
      </Canvas>
    </div>
  );
}
