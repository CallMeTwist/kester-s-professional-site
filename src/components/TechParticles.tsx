import { useEffect, useRef } from "react";
import * as THREE from "three";

export const TechParticles = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Hex-grid dot cloud ──────────────────────────────────────────────────
    const COUNT = 900;
    const geo   = new THREE.BufferGeometry();
    const pos   = new Float32Array(COUNT * 3);
    const col   = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const row = Math.floor(i / 30), colIdx = i % 30;
      pos[i * 3]     = (colIdx - 15) * 0.7 + (row % 2 === 0 ? 0 : 0.35);
      pos[i * 3 + 1] = (row - 15) * 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      // amber → steel gradient by depth
      const t = (pos[i * 3 + 2] + 2) / 4;
      col[i * 3]     = t * 0.878 + (1 - t) * 0.29;
      col[i * 3 + 1] = t * 0.482 + (1 - t) * 0.498;
      col[i * 3 + 2] = t * 0.165 + (1 - t) * 0.647;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(col, 3));
    const ptMat  = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.55, sizeAttenuation: true });
    const points = new THREE.Points(geo, ptMat);
    scene.add(points);

    // ── Thin amber connection lines ─────────────────────────────────────────
    const lp: number[] = [];
    for (let i = 0; i < COUNT - 1; i += 6) {
      const dx = pos[(i + 6) * 3]     - pos[i * 3];
      const dy = pos[(i + 6) * 3 + 1] - pos[i * 3 + 1];
      if (Math.sqrt(dx * dx + dy * dy) < 1.5) {
        lp.push(pos[i*3], pos[i*3+1], pos[i*3+2], pos[(i+6)*3], pos[(i+6)*3+1], pos[(i+6)*3+2]);
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lp), 3));
    scene.add(new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0xe07b2a, transparent: true, opacity: 0.07 })
    ));

    // ── NDT scan-line sweep ─────────────────────────────────────────────────
    const scanMat  = new THREE.MeshBasicMaterial({ color: 0xe07b2a, transparent: true, opacity: 0.25, side: THREE.DoubleSide });
    const scanLine = new THREE.Mesh(new THREE.PlaneGeometry(24, 0.016), scanMat);
    scene.add(scanLine);

    // ── Mouse parallax ──────────────────────────────────────────────────────
    let mX = 0, mY = 0;
    const onMouse = (e: MouseEvent) => {
      mX = e.clientX / window.innerWidth  - 0.5;
      mY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Render loop ─────────────────────────────────────────────────────────
    let frame: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      points.rotation.z = t * 0.008 + mX * 0.06;
      points.rotation.x = mY * 0.04;

      scanLine.position.y = Math.sin(t * 0.4) * 7;
      scanMat.opacity = 0.12 + Math.abs(Math.sin(t * 0.4)) * 0.18;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
};

export default TechParticles;
