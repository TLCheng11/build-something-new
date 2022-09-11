function ModelLight() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[200, 200, 100]}
        intensity={2}
        // castShadow
        // shadow-mapSize-height={512}
        // shadow-mapSize-width={512}
      />
      <spotLight position={[0, 1000, 0]} intensity={0.5} />
    </>
  );
}

export default ModelLight;
