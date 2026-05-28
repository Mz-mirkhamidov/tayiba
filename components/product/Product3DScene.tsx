"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF, Center, RoundedBox, PresentationControls, AdaptiveDpr } from "@react-three/drei";

export function Product3DScene({ modelUrl, autoRotateSpeed = 0.6 }: { modelUrl?: string; autoRotateSpeed?: number }) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [3.2, 1.6, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <AdaptiveDpr pixelated={false} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={0.7} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 2, -3]} intensity={0.25} />
      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <PresentationControls global rotation={[0, 0, 0]} polar={[-Math.PI / 6, Math.PI / 3]}
          azimuth={[-Math.PI / 2, Math.PI / 2]} config={{ mass: 1.1, tension: 140, friction: 22 }}
          snap={{ mass: 1, tension: 200, friction: 28 }}>
          {modelUrl ? <GLTFModel url={modelUrl} /> : <PlaceholderModel />}
        </PresentationControls>
        <ContactShadows position={[0, -1.05, 0]} opacity={0.32} scale={8} blur={2.4} far={3} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom minDistance={3} maxDistance={8}
        minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 1.7}
        autoRotate={autoRotateSpeed > 0} autoRotateSpeed={autoRotateSpeed} enableDamping dampingFactor={0.08} />
    </Canvas>
  );
}

function GLTFModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <Center top><primitive object={scene} dispose={null} /></Center>;
}

function PlaceholderModel() {
  return (
    <group>
      <Center top>
        <RoundedBox args={[1.6, 1.05, 1.6]} radius={0.06} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial color="#F6F3EC" roughness={0.55} metalness={0.04} clearcoat={0.15} clearcoatRoughness={0.6} sheen={0.4} sheenColor="#E9D285" sheenRoughness={0.7} />
        </RoundedBox>
      </Center>
      <Center top>
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[1.62, 0.12, 0.18]} />
          <meshStandardMaterial color="#C99E1F" roughness={0.3} metalness={0.7} />
        </mesh>
      </Center>
    </group>
  );
}
