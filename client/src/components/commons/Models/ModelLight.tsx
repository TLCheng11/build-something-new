function ModelLight() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[1000, 1000, 500]}
        intensity={1}
        // castShadow
        // shadow-mapSize-height={512}
        // shadow-mapSize-width={512}
      />
      <spotLight position={[0, 1000, 0]} intensity={0.5} />
    </>
  );
}

export default ModelLight;
