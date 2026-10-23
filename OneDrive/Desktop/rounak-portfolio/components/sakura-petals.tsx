"use client";

import { useEffect, useRef } from "react";

type Petal = { x: number; y: number; size: number; speed: number; sway: number; phase: number; spin: number };

/**
 * Sakura petals drifting down over the whole page (a fixed canvas that ignores clicks).
 * Scrolling adds a gust of wind: the faster you scroll, the more the petals blow sideways.
 * Visitors who prefer reduced motion get no falling petals.
 */
export function SakuraPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let petals: Petal[] = [];
    let frame = 0;
    let wind = 0;
    let lastScroll = window.scrollY;
    const readColor = () => getComputedStyle(document.documentElement).getPropertyValue("--sakura").trim();
    let color = readColor();

    const newPetal = (anywhere: boolean): Petal => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -20,
      size: 5 + Math.random() * 6,
      speed: 0.4 + Math.random() * 0.8,
      sway: 0.6 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      spin: Math.random() * Math.PI,
    });

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(34, (width * height) / 40000));
      petals = Array.from({ length: count }, () => newPetal(true));
    }

    function drawPetal(p: Petal, t: number) {
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.spin + t * 0.0006);
      // Squash horizontally over time so the petal looks like it's tumbling in 3D
      ctx!.scale(Math.cos(t * 0.002 + p.phase), 1);
      ctx!.beginPath();
      ctx!.moveTo(0, -p.size);
      ctx!.bezierCurveTo(p.size, -p.size * 0.6, p.size * 0.7, p.size * 0.8, 0, p.size);
      ctx!.bezierCurveTo(-p.size * 0.7, p.size * 0.8, -p.size, -p.size * 0.6, 0, -p.size);
      ctx!.fill();
      ctx!.restore();
    }

    function tick(t: number) {
      // Wind from scroll speed, easing back to calm
      const scrolled = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      wind = wind * 0.92 + scrolled * 0.04;

      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = color;
      ctx!.globalAlpha = 0.75;
      for (const p of petals) {
        p.y += p.speed;
        p.x += Math.sin(t * 0.001 + p.phase) * p.sway * 0.5 + wind;
        if (p.y > height + 20 || p.x < -40 || p.x > width + 40) Object.assign(p, newPetal(false));
        drawPetal(p, t);
      }
      frame = requestAnimationFrame(tick);
    }

    resize();
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    const themeWatcher = new MutationObserver(() => (color = readColor()));
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      themeWatcher.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-30 h-full w-full" />
  );
}
