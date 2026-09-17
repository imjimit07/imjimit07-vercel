'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface GridCell {
  x: number;
  y: number;
  intensity: number;
  lastUpdate: number;
}

interface InteractiveGridBackgroundProps {
  cellSize?: number;
  glowDuration?: number;
  maxIntensity?: number;
  trailLength?: number;
  idleAnimationInterval?: number;
  fadeOverlay?: boolean;
  className?: string;
}

export default function InteractiveGridBackground({
  cellSize = 50,
  glowDuration = 1000,
  maxIntensity = 1,
  trailLength = 5,
  idleAnimationInterval = 150,
  fadeOverlay = true,
  className = '',
}: InteractiveGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Map<string, GridCell>>(new Map<string, GridCell>());
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const lastMouseMoveRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | undefined>(undefined);
  const idleAnimationRef = useRef<number | undefined>(undefined);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for theme to be resolved
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || theme || 'light' : 'light';

  // Theme-based colors
  const getColors = useCallback(() => {
    const isDark = currentTheme === 'dark';
    return {
      background: isDark ? '#000000' : '#ffffff',
      grid: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      glowColor: isDark ? '0, 200, 255' : '0, 150, 255', // RGB values for interpolation
    };
  }, [currentTheme]);

  // Get cell key
  const getCellKey = (x: number, y: number): string => `${x},${y}`;

  // Activate a cell with glow
  const activateCell = useCallback(
    (gridX: number, gridY: number, intensity: number = maxIntensity) => {
      const key = getCellKey(gridX, gridY);
      cellsRef.current.set(key, {
        x: gridX,
        y: gridY,
        intensity,
        lastUpdate: Date.now(),
      });
    },
    [maxIntensity],
  );

  // Create trail effect from mouse movement
  const createTrail = useCallback(
    (mouseX: number, mouseY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;

      const gridX = Math.floor(x / cellSize);
      const gridY = Math.floor(y / cellSize);

      // Activate cells in a trail pattern
      for (let dx = -trailLength; dx <= trailLength; dx++) {
        for (let dy = -trailLength; dy <= trailLength; dy++) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= trailLength) {
            const intensity = maxIntensity * (1 - distance / trailLength);
            activateCell(gridX + dx, gridY + dy, intensity);
          }
        }
      }
    },
    [cellSize, trailLength, maxIntensity, activateCell],
  );

  // Idle animation: randomly activate cells
  const triggerIdleAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cols = Math.ceil(canvas.width / cellSize);
    const rows = Math.ceil(canvas.height / cellSize);

    // Randomly activate a few cells
    const numCells = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numCells; i++) {
      const gridX = Math.floor(Math.random() * cols);
      const gridY = Math.floor(Math.random() * rows);
      const intensity = Math.random() * 0.3 + 0.2; // Lower intensity for idle
      activateCell(gridX, gridY, intensity);
    }
  }, [cellSize, activateCell]);

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      lastMouseMoveRef.current = Date.now();
      createTrail(e.clientX, e.clientY);
    },
    [createTrail],
  );

  // Drawing function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = getColors();
    const now = Date.now();
    const isIdle = now - lastMouseMoveRef.current > 2000;

    // Clear canvas
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw glowing cells
    const cellsToRemove: string[] = [];
    cellsRef.current.forEach((cell, key) => {
      const age = now - cell.lastUpdate;
      const progress = age / glowDuration;

      if (progress >= 1) {
        cellsToRemove.push(key);
        return;
      }

      // Fade out intensity
      const currentIntensity = cell.intensity * (1 - progress);
      const alpha = currentIntensity;

      // Draw glow
      const x = cell.x * cellSize;
      const y = cell.y * cellSize;

      // Create gradient for glow effect
      const gradient = ctx.createRadialGradient(
        x + cellSize / 2,
        y + cellSize / 2,
        0,
        x + cellSize / 2,
        y + cellSize / 2,
        cellSize,
      );

      gradient.addColorStop(0, `rgba(${colors.glowColor}, ${alpha * 0.8})`);
      gradient.addColorStop(0.5, `rgba(${colors.glowColor}, ${alpha * 0.4})`);
      gradient.addColorStop(1, `rgba(${colors.glowColor}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, cellSize, cellSize);

      // Draw bright cell border
      ctx.strokeStyle = `rgba(${colors.glowColor}, ${alpha})`;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, cellSize, cellSize);
    });

    // Remove expired cells
    cellsToRemove.forEach(key => cellsRef.current.delete(key));

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(draw);
  }, [cellSize, glowDuration, getColors]);

  // Setup canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    // Start drawing loop
    animationFrameRef.current = requestAnimationFrame(draw);

    // Start idle animation
    idleAnimationRef.current = window.setInterval(() => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMouseMoveRef.current;
      if (timeSinceLastMove > 2000) {
        triggerIdleAnimation();
      }
    }, idleAnimationInterval);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (idleAnimationRef.current) {
        clearInterval(idleAnimationRef.current);
      }
    };
  }, [handleMouseMove, draw, triggerIdleAnimation, idleAnimationInterval]);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <canvas
        ref={canvasRef}
        className='h-full w-full'
        style={{ display: 'block' }}
      />
      {fadeOverlay && (
        <>
          {/* Top fade */}
          <div
            className='pointer-events-none fixed inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent dark:from-black'
            style={{ zIndex: 1 }}
          />
          {/* Bottom fade */}
          <div
            className='pointer-events-none fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-black'
            style={{ zIndex: 1 }}
          />
        </>
      )}
    </div>
  );
}
