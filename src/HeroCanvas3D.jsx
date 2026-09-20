import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas3D({ reducedMotion = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return undefined;

    let scene, camera, renderer, coreMesh, innerCore, wireRing, nodeGroup;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isVisible = true;
    let rafId = null;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.z = 7.5;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0x06b6d4, 3.5, 25);
      pointLight1.position.set(4, 5, 4);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0x3b82f6, 3.5, 25);
      pointLight2.position.set(-4, -4, 3);
      scene.add(pointLight2);

      // Central Polyhedron: Outer Wireframe Dodecahedron
      const outerGeo = new THREE.IcosahedronGeometry(2.15, 1);
      const outerMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
        roughness: 0.2
      });
      coreMesh = new THREE.Mesh(outerGeo, outerMat);
      scene.add(coreMesh);

      // Inner Glowing Core
      const innerGeo = new THREE.OctahedronGeometry(1.25, 2);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x0369a1,
        emissiveIntensity: 0.85,
        metalness: 0.8,
        roughness: 0.3
      });
      innerCore = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerCore);

      // Orbiting Ring
      const ringGeo = new THREE.TorusGeometry(3.1, 0.022, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.4 });
      wireRing = new THREE.Mesh(ringGeo, ringMat);
      wireRing.rotation.x = Math.PI / 3;
      scene.add(wireRing);

      // Orbiting Tech Nodes
      nodeGroup = new THREE.Group();
      const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const nodeColors = [0x38bdf8, 0x34d399, 0xa78bfa, 0xf472b6, 0xfbbf24];

      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const nodeMat = new THREE.MeshStandardMaterial({
          color: nodeColors[i % nodeColors.length],
          emissive: nodeColors[i % nodeColors.length],
          emissiveIntensity: 0.7
        });
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(Math.cos(angle) * 3.1, Math.sin(angle) * 3.1 * 0.5, (Math.sin(angle) * 3.1) * 0.8);
        nodeGroup.add(node);
      }
      scene.add(nodeGroup);

      // Mouse tracking
      const handlePointer = (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = x * 1.6;
        targetRotationX = y * 1.4;
      };

      window.addEventListener("pointermove", handlePointer, { passive: true });

      // Resize handler
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      // Visibility optimization - pause when off screen
      const obs = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      });
      obs.observe(container);

      // Animation Loop
      let clock = new THREE.Clock();
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        if (!isVisible) return;

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Idle floating rotation + spring pointer lerp
        coreMesh.rotation.y += (targetRotationY - coreMesh.rotation.y) * 0.05 + delta * 0.3;
        coreMesh.rotation.x += (targetRotationX - coreMesh.rotation.x) * 0.05 + delta * 0.15;

        innerCore.rotation.y -= delta * 0.45;
        innerCore.rotation.z += delta * 0.25;

        wireRing.rotation.z += delta * 0.2;
        nodeGroup.rotation.y += delta * 0.35;
        nodeGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener("pointermove", handlePointer);
        window.removeEventListener("resize", handleResize);
        obs.disconnect();

        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch {
      return undefined;
    }
  }, [reducedMotion]);

  return (
    <div className="hero-canvas-wrapper" aria-label="3D Interactive Digital Developer Core">
      <div className="hero-canvas-halo" />
      <div className="three-canvas-container" ref={containerRef} />
      <span className="hero-orbit-tag orbit-tag-1">React / Next.js</span>
      <span className="hero-orbit-tag orbit-tag-2">Node / Express</span>
      <span className="hero-orbit-tag orbit-tag-3">SQL / DBMS</span>
      <span className="hero-orbit-tag orbit-tag-4">.NET / C#</span>
    </div>
  );
}
