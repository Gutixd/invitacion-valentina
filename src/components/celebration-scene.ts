import * as THREE from "three";

/** Decorative, viewport-sized scene. Imported only when motion is enabled. */
export function createCelebrationScene(host: HTMLDivElement): () => void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
  } catch {
    host.dataset.renderer = "unavailable";
    return () => { delete host.dataset.renderer; };
  }

  const mobile = window.matchMedia("(max-width: 600px)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.4 : 1.7));
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  host.dataset.renderer = "webgl";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  camera.position.z = 12;
  const ornaments = new THREE.Group();
  scene.add(ornaments);
  scene.add(new THREE.AmbientLight(0xffe9e9, 2.6));
  const light = new THREE.DirectionalLight(0xfff4e4, 3.2);
  light.position.set(-3, 5, 7);
  scene.add(light);

  const heart = new THREE.Shape();
  heart.moveTo(0, -0.6);
  heart.bezierCurveTo(-0.3, -0.3, -0.75, 0, -0.65, 0.45);
  heart.bezierCurveTo(-0.6, 0.8, -0.15, 0.9, 0, 0.5);
  heart.bezierCurveTo(0.15, 0.9, 0.6, 0.8, 0.65, 0.45);
  heart.bezierCurveTo(0.75, 0, 0.3, -0.3, 0, -0.6);
  const heartGeometry = new THREE.ExtrudeGeometry(heart, { depth: 0.13, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.055, bevelThickness: 0.055, curveSegments: 12 });
  heartGeometry.center();
  const pearlGeometry = new THREE.SphereGeometry(0.09, 12, 8);
  const roseMaterial = new THREE.MeshStandardMaterial({ color: 0xeab1c4, metalness: 0.45, roughness: 0.32, transparent: true, opacity: 0.7, depthWrite: false });
  const paleMaterial = new THREE.MeshStandardMaterial({ color: 0xffdce2, metalness: 0.32, roughness: 0.4, transparent: true, opacity: 0.65, depthWrite: false });
  const pearlMaterial = new THREE.MeshStandardMaterial({ color: 0xfff0dd, metalness: 0.2, roughness: 0.24, transparent: true, opacity: 0.6, depthWrite: false });

  let seed = 2210;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const count = mobile ? 13 : 23;
  const objects: { mesh: THREE.Mesh; side: number; lane: number; startY: number; z: number; speed: number; phase: number }[] = [];
  for (let i = 0; i < count; i++) {
    const isHeart = i % 3 === 0;
    const mesh = new THREE.Mesh(isHeart ? heartGeometry : pearlGeometry, isHeart ? (i % 2 ? roseMaterial : paleMaterial) : pearlMaterial);
    if (isHeart) mesh.scale.setScalar(0.12 + random() * 0.09);
    const object = { mesh, side: i % 2 ? 1 : -1, lane: random(), startY: random() * 2 - 1, z: -0.7 - random() * 2, speed: 0.1 + random() * 0.14, phase: random() * Math.PI * 2 };
    objects.push(object);
    ornaments.add(mesh);
  }

  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = textureCanvas.height = 64;
  const textureContext = textureCanvas.getContext("2d")!;
  const glow = textureContext.createRadialGradient(32, 32, 0, 32, 32, 31);
  glow.addColorStop(0, "rgba(255,253,241,1)");
  glow.addColorStop(0.14, "rgba(255,245,220,.7)");
  glow.addColorStop(1, "rgba(255,244,220,0)");
  textureContext.fillStyle = glow;
  textureContext.fillRect(0, 0, 64, 64);
  textureContext.fillStyle = "rgba(255,253,246,.9)";
  textureContext.beginPath();
  textureContext.moveTo(32, 9); textureContext.lineTo(35, 28); textureContext.lineTo(53, 32); textureContext.lineTo(35, 35);
  textureContext.lineTo(32, 55); textureContext.lineTo(29, 35); textureContext.lineTo(11, 32); textureContext.lineTo(29, 28);
  textureContext.closePath(); textureContext.fill();
  const texture = new THREE.CanvasTexture(textureCanvas);
  const sparkleCount = mobile ? 36 : 68;
  const positions = new Float32Array(sparkleCount * 3);
  const sparkles = Array.from({ length: sparkleCount }, (_, i) => ({ side: i % 2 ? 1 : -1, lane: random(), startY: random() * 2 - 1, phase: random() * Math.PI * 2, speed: 0.12 + random() * 0.15 }));
  const sparkleGeometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.BufferAttribute(positions, 3);
  positionAttribute.setUsage(THREE.DynamicDrawUsage);
  sparkleGeometry.setAttribute("position", positionAttribute);
  const sparkleMaterial = new THREE.PointsMaterial({ color: 0xfff7eb, map: texture, size: mobile ? 0.19 : 0.15, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending });
  const sparklePoints = new THREE.Points(sparkleGeometry, sparkleMaterial);
  sparklePoints.frustumCulled = false;
  scene.add(sparklePoints);

  let width = 1;
  let height = 1;
  let worldHeight = 1;
  let pixelToWorld = 1;
  let edge = 1;
  let frameId = 0;
  let elapsed = 0;
  let lastFrame = 0;
  let disposed = false;
  let scrollProgress = 0;
  let pointerX = 0;
  let pointerY = 0;
  const frameInterval = 1000 / (mobile ? 30 : 45);

  const resize = () => {
    width = host.clientWidth;
    height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    pixelToWorld = worldHeight / height;
    const invitationWidth = document.querySelector(".invitation")?.getBoundingClientRect().width || Math.min(width, 440);
    edge = invitationWidth / 2;
  };
  const onScroll = () => { scrollProgress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    pointerX = (event.clientX / width - 0.5) * 0.22;
    pointerY = (event.clientY / height - 0.5) * 0.12;
  };
  const wrap = (value: number) => ((value % (worldHeight + 2)) + worldHeight + 2) % (worldHeight + 2) - worldHeight / 2 - 1;
  const frame = (time: number) => {
    if (disposed || document.hidden) return;
    frameId = requestAnimationFrame(frame);
    const delta = time - lastFrame;
    if (delta < frameInterval) return;
    if (lastFrame) elapsed += Math.min(delta, 80) / 1000;
    lastFrame = time;
    ornaments.position.x += (pointerX - ornaments.position.x) * 0.045;
    ornaments.position.y += (-pointerY - ornaments.position.y) * 0.045;
    objects.forEach(({ mesh, side, lane, startY, speed, phase, z }) => {
      // Float through the margins, leaving the central text unobstructed.
      const edgePixels = width <= 600 ? width / 2 - 8 - lane * 24 : edge + 15 + lane * Math.min(140, (width - edge * 2) / 3);
      mesh.position.set(side * edgePixels * pixelToWorld + Math.sin(elapsed * 0.45 + phase) * 0.06, wrap(startY * worldHeight / 2 + elapsed * speed + scrollProgress * 0.35), z);
      mesh.rotation.set(Math.sin(elapsed * 0.45 + phase) * 0.3, elapsed * 0.22 + phase, Math.sin(elapsed * 0.35 + phase) * 0.3);
    });
    sparkles.forEach(({ side, lane, startY, speed, phase }, i) => {
      const edgePixels = width <= 600 ? width / 2 - 6 - lane * 30 : edge - 6 + lane * Math.min(190, (width - edge * 2) / 2.5);
      positions[i * 3] = side * edgePixels * pixelToWorld + Math.sin(elapsed * 0.36 + phase) * 0.08;
      positions[i * 3 + 1] = wrap(startY * worldHeight / 2 + elapsed * speed);
      positions[i * 3 + 2] = -0.3;
    });
    positionAttribute.needsUpdate = true;
    sparkleMaterial.opacity = 0.6 + Math.sin(elapsed * 0.9) * 0.14;
    renderer.render(scene, camera);
  };
  const onVisibility = () => {
    cancelAnimationFrame(frameId);
    lastFrame = 0;
    if (!document.hidden && !disposed) frameId = requestAnimationFrame(frame);
  };
  const onContextLost = (event: Event) => { event.preventDefault(); cancelAnimationFrame(frameId); host.dataset.renderer = "unavailable"; };
  const onContextRestored = () => { host.dataset.renderer = "webgl"; onVisibility(); };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);
  resize(); onScroll(); onVisibility();

  return () => {
    disposed = true;
    cancelAnimationFrame(frameId);
    observer.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVisibility);
    renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
    renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
    heartGeometry.dispose(); pearlGeometry.dispose(); sparkleGeometry.dispose();
    roseMaterial.dispose(); paleMaterial.dispose(); pearlMaterial.dispose(); sparkleMaterial.dispose(); texture.dispose();
    scene.clear();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    delete host.dataset.renderer;
  };
}
