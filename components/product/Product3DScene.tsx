"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Center,
  RoundedBox,
  PresentationControls,
  AdaptiveDpr,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

interface Product3DSceneProps {
  modelUrl?: string;
  autoRotateSpeed?: number;
  /** Tanlangan rang hex kodi — PlaceholderModel'ni real-time bo'yaydi */
  selectedColorHex?: string;
}

/**
 * Product3DScene — Etap 4: Dynamic color switching
 *
 * selectedColorHex o'zgarganda:
 *   - GLB model bor → shart yo'q (mato rangi model ichida)
 *   - Placeholder bor → `PlaceholderModel` shu rangga smooth o'tadi
 *     (THREE.Color lerp bilan) — hech qachon birdan sakramaydi
 */
export function Product3DScene({
  modelUrl,
  autoRotateSpeed = 0.6,
  selectedColorHex = "#F6F3EC",
}: Product3DSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.2, 1.6, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.25} />

      <Suspense fallback={null}>
        <Environment preset="apartment" />

        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 3]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
          config={{ mass: 1.1, tension: 140, friction: 22 }}
          snap={{ mass: 1, tension: 200, friction: 28 }}
        >
          {modelUrl ? (
            <GLTFModel url={modelUrl} />
          ) : (
            <PlaceholderModel colorHex={selectedColorHex} />
          )}
        </PresentationControls>

        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.32}
          scale={8}
          blur={2.4}
          far={3}
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate={autoRotateSpeed > 0}
        autoRotateSpeed={autoRotateSpeed}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}

/** GLB model loader — useGLTF cache'i tufayli qayta mount cheap. */
function GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <Center top><primitive object={scene} dispose={null} /></Center>;
}

/**
 * PlaceholderModel — Etap 4 yangilik: rang smooth lerp bilan o'zgaradi.
 *
 * `useFrame` ichida har kadrda maqsad rangga 5% qadam qo'yiladi.
 * Bu luxury feel beradi — hech qachon birdan sakramaydi.
 */
function PlaceholderModel({ colorHex }: { colorHex: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const targetColor = useRef(new THREE.Color(colorHex));
  const currentColor = useRef(new THREE.Color(colorHex));

  // targetColor'ni prop o'zgarganda yangilaymiz
  targetColor.current.set(colorHex);

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    // Luxury slow lerp — 3% qadam/kadr ≈ ~30 kadrda to'liq o'tish (0.5s @ 60fps)
    currentColor.current.lerp(targetColor.current, 0.03);
    mat.color.copy(currentColor.current);

    // Rang yorug'ligiga qarab sheenColor ham sozlanadi
    const luminance = currentColor.current.r * 0.299
      + currentColor.current.g * 0.587
      + currentColor.current.b * 0.114;
    // Yorug' ranglar uchun oltin sheen, to'q ranglar uchun atirgul
    const sheenTarget = luminance > 0.5
      ? new THREE.Color("#E9D285")
      : new THREE.Color("#C99E1F");
    (mat.sheenColor as THREE.Color).lerp(sheenTarget, 0.03);
  });

  return (
    <group>
      {/* Asosiy quti — rang lerp */}
      <Center top>
        <RoundedBox
          ref={meshRef}
          args={[1.6, 1.05, 1.6]}
          radius={0.06}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            color={colorHex}
            roughness={0.5}
            metalness={0.05}
            clearcoat={0.2}
            clearcoatRoughness={0.5}
            sheen={0.45}
            sheenColor="#E9D285"
            sheenRoughness={0.65}
          />
        </RoundedBox>
      </Center>

      {/* Tilla kamar — doim tilla rangda qoladi, rang hiylasi emas u */}
      <Center top>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[1.62, 0.12, 0.18]} />
          <meshStandardMaterial color="#C99E1F" roughness={0.3} metalness={0.7} />
        </mesh>
      </Center>
    </group>
  );
}
