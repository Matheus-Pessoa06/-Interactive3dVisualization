import React, { useState, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber'; // useLoader vem do @react-three/fiber
import { OrbitControls, Stage } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import style from './style.module.css';

function App() {
  const [modelUrl, setModelUrl] = useState(null);
  
  const meshRef = useRef();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file); 
    setModelUrl(url);
  };

  function UploadedModel({ modelUrl }) {
    const obj = useLoader(OBJLoader, modelUrl); 
    return <primitive ref={meshRef} object={obj} scale={0.5} />;
  }
  
  function handleClick() {
    if (meshRef.current) {
      meshRef.current.traverse((child) => {
        if (child.isMesh && child.material && child.material.color) {
          child.material.color.set(Math.random() * 0xffffff);
        }
      });
    }
  }

  return (
    <div style={{ height: '100vh' }}>

      <h1>Visualizador de Modelos 3d</h1>

      <input
        type="file"
        accept=".obj"
        onChange={handleFileUpload}
        style={{ position: 'absolute', zIndex: 1 }}
        className='FileInput'
      />

      <Canvas onClick={handleClick} className={style.Box}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <OrbitControls />
        <Stage>
          {modelUrl && <UploadedModel modelUrl={modelUrl} />}
        </Stage>
      </Canvas>
    </div>
  );
}

export default App;
