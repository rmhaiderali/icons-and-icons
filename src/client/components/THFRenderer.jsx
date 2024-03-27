import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, MathUtils } from "three";

const Image = ({ imageUrl }) => {
  let showComponent = true;
  const timeout = setTimeout(() => (showComponent = false), 3500);
  useEffect(() => () => clearTimeout(timeout), []);

  const mesh = useRef({ current: { rotation: { z: 0 } } });
  const material = useRef({ current: { opacity: 1 } });

  const { viewport } = useThree();
  const delay = useRef(Math.random() * 2);
  const position = useRef([
    (Math.random() - 0.5) * (viewport.width - 1),
    viewport.height / 2 + 0.5,
    0,
  ]);

  const moveX = MathUtils.randFloat(-0.7, 0.7);
  const moveY = MathUtils.randFloat(0.05, 0.08);
  const rotateZ = Math.random() * 0.18 * MathUtils.randInt(-1, 1);
  const scale = MathUtils.randFloat(0.6, 0.9);

  useFrame((state, delta) => {
    if (delay.current > 0) {
      delay.current -= delta;
    } else {
      mesh.current.position.y -= moveY;
      if (rotateZ) mesh.current.rotation.z += rotateZ * delta;
      if (moveX) mesh.current.position.x += moveX * delta;
      if (mesh.current.opacity !== 0)
        if (!showComponent) material.current.opacity -= 0.02;
    }
  });

  const texture = new TextureLoader().load(imageUrl);

  return (
    <mesh position={position.current} ref={mesh} scale={[scale, scale, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent ref={material} opacity={1} />
    </mesh>
  );
};

export default function ({ imageUrl }) {
  const timestamp = Date.now().toString();
  const instances = [];

  if (imageUrl)
    for (let i = 0; i < 40; i++)
      instances.push(<Image key={timestamp + i} imageUrl={imageUrl} />);

  return (
    <Canvas
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        position: "fixed",
        pointerEvents: "none",
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {instances}
    </Canvas>
  );
}
