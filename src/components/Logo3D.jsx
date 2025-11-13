import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FadeIn } from './ScrollAnimations.jsx';

const MODEL_URL = '/Logo.glb';

// Configuración centralizada
const CONFIG = {
  camera: {
    fov: 60,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 0, z: 8 }
  },
  model: {
    scale: 5,
    position: { x: 0, y: 0, z: 0 },
    emissive: { color: 0x333333, intensity: 0.2 }
  },
  particles: {
    count: 100,
    radius: { min: 3, max: 5 },
    speed: 0.02,
    size: 0.05,
    opacity: 0.6
  },
  rings: {
    count: 3,
    radius: 3,
    thickness: 0.02,
    opacity: 0.3
  },
  lights: {
    ambient: { color: 0xffffff, intensity: 0.6 },
    directional: { color: 0xffffff, intensity: 0.8, position: [5, 5, 5] },
    point: { color: 0xffffff, intensity: 1, distance: 100, position: [0, 0, 5] }
  },
  animation: {
    floatSpeed: 0.5,
    floatAmplitude: 0.2,
    scrollMultiplier: { x: 2, y: 6 },
    smoothness: 0.01
  }
};

const Logo3D = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const logoGroupRef = useRef(null);
  const particlesRef = useRef(null);
  const scrollProgressRef = useRef(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationId;
    const rings = [];

    const { scene, camera, renderer } = initializeScene();
    const logoGroup = createLogoGroup(scene);

    loadModel(logoGroup);

    const particles = createParticles(scene);
    createRings(scene, rings);
    addLights(scene);

    const cleanupListeners = setupEventListeners(camera, renderer);

    animate();

    return () => {
      cleanupListeners();
      cancelAnimationFrame(animationId);
      cleanup(renderer, scene);
    };

    function initializeScene() {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        CONFIG.camera.near,
        CONFIG.camera.far
      );
      camera.position.set(CONFIG.camera.position.x, CONFIG.camera.position.y, CONFIG.camera.position.z);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      return { scene, camera, renderer };
    }

    function createLogoGroup(scene) {
      const group = new THREE.Group();
      group.position.set(CONFIG.model.position.x, CONFIG.model.position.y, CONFIG.model.position.z);
      logoGroupRef.current = group;
      scene.add(group);
      return group;
    }

    async function loadModel(logoGroup) {
      try {
        setIsLoading(true);
        
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const loader = new GLTFLoader();

        loader.load(
          MODEL_URL,
          (gltf) => {
            const model = gltf.scene;
            
            // Calcular escala automática
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = CONFIG.model.scale / maxDim;
            model.scale.multiplyScalar(scale);

            // Centrar en el espacio local del modelo
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            // Mejorar materiales
            model.traverse((child) => {
              if (child.isMesh && child.material) {
                child.material.emissive = new THREE.Color(CONFIG.model.emissive.color);
                child.material.emissiveIntensity = CONFIG.model.emissive.intensity;
              }
            });

            logoGroup.add(model);
            setIsLoading(false);
            setError(null);
          },
          (progress) => {
            if (progress.total) {
              const percent = Math.round((progress.loaded / progress.total) * 100);
              console.log(`Cargando: ${percent}%`);
            }
          },
          (err) => {
            console.error('Error loading model:', err);
            setError('Error al cargar el modelo 3D');
            setIsLoading(false);
          }
        );
      } catch (err) {
        console.error('Error:', err);
        setError('Error al inicializar el cargador 3D');
        setIsLoading(false);
      }
    }

    function createParticles(scene) {
      const { count, radius, speed, size, opacity } = CONFIG.particles;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = [];

      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 2;
        const r = radius.min + Math.random() * (radius.max - radius.min);
        
        positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
        positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = r * Math.cos(theta);
        
        velocities.push({
          x: (Math.random() - 0.5) * speed,
          y: (Math.random() - 0.5) * speed,
          z: (Math.random() - 0.5) * speed
        });
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      particlesRef.current = { mesh: particles, velocities };
      scene.add(particles);
      
      return particles;
    }

    function createRings(scene, rings) {
      const { count, radius, thickness, opacity } = CONFIG.rings;
      const geometry = new THREE.TorusGeometry(radius, thickness, 16, 100);

      for (let i = 0; i < count; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = (Math.PI / 4) * i;
        ring.rotation.y = (Math.PI / 4) * i;
        rings.push(ring);
        scene.add(ring);
      }
    }

    function addLights(scene) {
      const { ambient, directional, point } = CONFIG.lights;

      const ambientLight = new THREE.AmbientLight(ambient.color, ambient.intensity);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(directional.color, directional.intensity);
      dirLight.position.set(...directional.position);
      scene.add(dirLight);

      const pointLight = new THREE.PointLight(point.color, point.intensity, point.distance);
      pointLight.position.set(...point.position);
      scene.add(pointLight);
    }

    function setupEventListeners(camera, renderer) {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgressRef.current = Math.min(scrollTop / (docHeight || 1), 1);
      };

      const handleResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }

    function animate() {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      const progress = scrollProgressRef.current;

      // Animar logo
      if (logoGroupRef.current) {
        const targetRotationY = progress * Math.PI * CONFIG.animation.scrollMultiplier.y;
        const targetRotationX = progress * Math.PI * CONFIG.animation.scrollMultiplier.x;
        
        logoGroupRef.current.rotation.y += (targetRotationY - logoGroupRef.current.rotation.y) * CONFIG.animation.smoothness;
        logoGroupRef.current.rotation.x += (targetRotationX - logoGroupRef.current.rotation.x) * CONFIG.animation.smoothness;
        logoGroupRef.current.position.y = Math.sin(time * CONFIG.animation.floatSpeed) * CONFIG.animation.floatAmplitude;
      }

      // Animar anillos
      rings.forEach((ring, index) => {
        ring.rotation.x += 0.0025 * (index + 1);
        ring.rotation.y += 0.0025 * (index + 1);
      });

      // Animar partículas
      if (particlesRef.current?.mesh) {
        const positions = particlesRef.current.mesh.geometry.attributes.position.array;
        const velocities = particlesRef.current.velocities;
        const { radius } = CONFIG.particles;

        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;

          const distance = Math.sqrt(
            positions[i * 3] ** 2 +
            positions[i * 3 + 1] ** 2 +
            positions[i * 3 + 2] ** 2
          );

          if (distance > radius.max || distance < radius.min) {
            velocities[i].x *= -1;
            velocities[i].y *= -1;
            velocities[i].z *= -1;
          }
        }

        particlesRef.current.mesh.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.mesh.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    }

    function cleanup(renderer, scene) {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    }
  }, []);

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className="w-full h-[500px] md:h-[600px] lg:h-[700px]"
      />
    </div>
  );
};

const Logo3DLoader = () => {
    return (
  <div className="absolute top-56 right-0 w-full md:w-1/2 h-full md:h-1/2 flex justify-center md:justify-start items-center opacity-45 md:opacity-50 ">
    <div className="w-full max-w-xs md:max-w-screen-2xl scale-75 md:scale-100 lg:scale-125">
        <FadeIn delay={0.2} direction="left">
        <Logo3D />
        </FadeIn>
    </div>
    </div>
    );
};  

export default Logo3DLoader;