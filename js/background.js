const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const htmlEl = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmall = window.matchMedia('(max-width: 700px)').matches;

function loadThree() {
    return new Promise((resolve, reject) => {
        if (window.THREE) return resolve(window.THREE);
        const s = document.createElement('script');
        s.src = THREE_URL;
        s.async = true;
        s.onload = () => (window.THREE ? resolve(window.THREE) : reject(new Error('THREE missing')));
        s.onerror = () => reject(new Error('THREE failed to load'));
        document.head.appendChild(s);
    });
}

function init(THREE) {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(canvas, document.body.firstChild);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isSmall, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const count = isSmall ? 900 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 150;
        positions[i + 1] = (Math.random() - 0.5) * 150;
        positions[i + 2] = (Math.random() - 0.5) * 100;
        c.setHSL(Math.random() > 0.5 ? 0.52 : 0.95, 1.0, 0.6);
        colors[i] = c.r; colors[i + 1] = c.g; colors[i + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.35, vertexColors: true, transparent: true, opacity: 0.6 }));
    scene.add(points);

    const node = new THREE.Mesh(
        new THREE.IcosahedronGeometry(8, 1),
        new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.15 })
    );
    scene.add(node);

    const clock = new THREE.Clock();
    let raf = 0;

    const isLight = () => htmlEl.classList.contains('light-theme');
    const shouldRun = () => !document.hidden && !isLight() && !reduceMotion;

    function draw() {
        const t = clock.getElapsedTime();
        points.rotation.y = t * 0.03;
        points.rotation.x = t * 0.01;
        node.rotation.x = t * 0.1;
        node.rotation.y = t * 0.15;
        renderer.render(scene, camera);
    }
    function loop() { raf = requestAnimationFrame(loop); draw(); }
    function start() { if (!raf && shouldRun()) { clock.start(); loop(); } }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    function sync() {
        canvas.classList.toggle('bg-off', isLight());
        if (shouldRun()) start(); else stop();
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        if (!raf) draw();
    });
    document.addEventListener('visibilitychange', sync);
    new MutationObserver(sync).observe(htmlEl, { attributes: true, attributeFilter: ['class'] });

    draw();
    canvas.classList.add('ready');
    sync();
}

function boot() {
    loadThree().then(init).catch(() => {  });
}
if ('requestIdleCallback' in window) requestIdleCallback(boot, { timeout: 2500 });
else window.addEventListener('load', () => setTimeout(boot, 300));
