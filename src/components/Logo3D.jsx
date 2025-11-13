import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Logo3DSVG = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const logoGroupRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create logo group
    const logoGroup = new THREE.Group();
    logoGroupRef.current = logoGroup;
    scene.add(logoGroup);

    // Create stylized "A" shape for AMBAR
    const createAShape = () => {
      const shape = new THREE.Shape();
      
      // Create letter "A" outline
      shape.moveTo(-1, -2);
      shape.lineTo(0, 2);
      shape.lineTo(1, -2);
      shape.lineTo(0.6, -2);
      shape.lineTo(0, 0.5);
      shape.lineTo(-0.6, -2);
      shape.closePath();
      
      // Add cross bar
      const hole = new THREE.Path();
      hole.moveTo(-0.4, -0.5);
      hole.lineTo(-0.2, 0);
      hole.lineTo(0.2, 0);
      hole.lineTo(0.4, -0.5);
      hole.closePath();
      shape.holes.push(hole);
      
      return shape;
    };

    // Create extruded geometry
    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 3
    };

    const aShape = createAShape();
    const geometry = new THREE.ExtrudeGeometry(aShape, extrudeSettings);
    geometry.center();

    // Create material with glow effect
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x666666,
      specular: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.95
    });

    const logoMesh = new THREE.Mesh(geometry, material);
    logoGroup.add(logoMesh);

    // Add wireframe overlay
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.5
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    logoMesh.add(wireframe);

    // Create particle system around logo
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      
      particlePositions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.cos(theta);
      
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = { mesh: particles, velocities: particleVelocities };
    logoGroup.add(particles);

    // Create rings around logo
    const ringGeometry = new THREE.TorusGeometry(3, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3
    });

    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial.clone());
      ring.rotation.x = (Math.PI / 4) * i;
      ring.rotation.y = (Math.PI / 4) * i;
      logoGroup.add(ring);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Handle scroll
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = Math.min(scrollTop / (docHeight || 1), 1);
    };

    window.addEventListener('scroll', handleScroll);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate logo based on scroll with smooth easing
      const targetRotationY = scrollProgressRef.current * Math.PI * 6;
      const targetRotationX = scrollProgressRef.current * Math.PI * 2;
      
      logoGroup.rotation.y += (targetRotationY - logoGroup.rotation.y) * 0.05;
      logoGroup.rotation.x += (targetRotationX - logoGroup.rotation.x) * 0.05;

      // Subtle floating animation
      logoGroup.position.y = Math.sin(time * 0.5) * 0.2;

      // Animate logo mesh
      logoMesh.rotation.z = Math.sin(time * 0.3) * 0.1;

      // Animate rings
      logoGroup.children.forEach((child, index) => {
        if (child.geometry && child.geometry.type === 'TorusGeometry') {
          child.rotation.x += 0.01 * (index + 1);
          child.rotation.y += 0.01 * (index + 1);
        }
      });

      // Animate particles
      if (particlesRef.current.mesh) {
        const positions = particlesRef.current.mesh.geometry.attributes.position.array;
        const velocities = particlesRef.current.velocities;

        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3] += velocities[i].x;
          positions[i * 3 + 1] += velocities[i].y;
          positions[i * 3 + 2] += velocities[i].z;

          // Boundary check
          const distance = Math.sqrt(
            positions[i * 3] ** 2 +
            positions[i * 3 + 1] ** 2 +
            positions[i * 3 + 2] ** 2
          );

          if (distance > 5 || distance < 2) {
            velocities[i].x *= -1;
            velocities[i].y *= -1;
            velocities[i].z *= -1;
          }
        }

        particlesRef.current.mesh.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.mesh.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
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

export default Logo3DSVG;