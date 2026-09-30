"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Dégradé liquide cuivre : bruit fractal déformé, attiré par la souris.
const fragment = /* glsl */ `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uIntensity;

vec3 night = vec3(0.102, 0.180, 0.271);
vec3 deep = vec3(0.051, 0.106, 0.165);
vec3 copper = vec3(0.784, 0.475, 0.255);
vec3 copperLight = vec3(0.878, 0.565, 0.333);

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);

  float t = uTime * 0.045;
  float d = distance(p, m);
  float pull = smoothstep(0.65, 0.0, d);

  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 3.1));
  vec2 r = vec2(fbm(p * 2.0 + 2.2 * q + vec2(1.7, 9.2) + t * 1.3), fbm(p * 2.0 + 2.2 * q + vec2(8.3, 2.8) - t));
  r += (m - p) * pull * 0.55;
  float f = fbm(p * 1.8 + 2.4 * r);

  float band = smoothstep(0.42, 0.95, f + pull * 0.25);
  vec3 col = mix(deep, night, smoothstep(0.1, 0.7, uv.y + q.x * 0.3));
  col = mix(col, copper * 0.9, band * 0.75 * uIntensity);
  col = mix(col, copperLight, pow(band, 3.0) * 0.55 * uIntensity);
  col += copperLight * pull * 0.08 * uIntensity;

  // Vignette : garde le texte lisible
  float vig = smoothstep(1.25, 0.25, distance(uv, vec2(0.62, 0.55)));
  col = mix(deep, col, 0.35 + 0.65 * vig);
  gl_FragColor = vec4(col, 1.0);
}
`;

/** Fond WebGL du hero : dégradé liquide cuivre qui réagit à la souris. */
export default function HeroGL() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ dpr: small ? 0.75 : Math.min(window.devicePixelRatio, 1.25), alpha: false, antialias: false, depth: false });
    } catch {
      return; // WebGL indisponible : le dégradé CSS reste visible
    }
    const gl = renderer.gl;
    // Rendu logiciel (pas de carte graphique) : on garde le dégradé CSS, bien plus léger
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const gpu = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    if (/swiftshader|llvmpipe|software/i.test(gpu)) {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return;
    }
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    gl.canvas.setAttribute("aria-hidden", "true");
    el.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 12 },
        uRes: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0.7, 0.55) },
        uIntensity: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height);
      program.uniforms.uRes.value.set(width, height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const target = new Vec2(0.7, 0.55);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    let raf = 0;
    let last = performance.now();
    const start = last;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const u = program.uniforms;
      u.uTime.value += dt;
      // Sur mobile, le « pointeur » dérive doucement tout seul
      if (small) target.set(0.5 + Math.sin(now * 0.0003) * 0.3, 0.55 + Math.cos(now * 0.00023) * 0.2);
      u.uMouse.value.lerp(target, 0.045);
      u.uIntensity.value = Math.min(1, (now - start) / 1600);
      renderer.render({ scene: mesh });
    };

    if (reduce) {
      program.uniforms.uIntensity.value = 1;
      renderer.render({ scene: mesh });
    } else {
      raf = requestAnimationFrame(loop);
    }
    el.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, []);

  return <div ref={host} className="absolute inset-0 opacity-0 transition-opacity duration-[1600ms] data-[ready=true]:opacity-100" />;
}
