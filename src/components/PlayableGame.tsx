import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Sparkles, X, ChevronUp, Shield, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlayableGameProps {
  isOpenModal?: boolean;
  onClose?: () => void;
}

export const PlayableGame: React.FC<PlayableGameProps> = ({ isOpenModal, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('sania_cyber_dash_highscore') || '0', 10);
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [shieldActive, setShieldActive] = useState<boolean>(false);

  // Audio Context synthesizer for 8-bit arcade beeps
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = useCallback((frequency: number, type: OscillatorType, duration: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted or unsupported
    }
  }, [soundEnabled]);

  // Game Engine Variables in Refs to run smoothly at 60 FPS without React re-render lag
  const gameRef = useRef({
    player: {
      x: 70,
      y: 190,
      width: 28,
      height: 36,
      vy: 0,
      gravity: 0.72,
      jumpForce: -12.5,
      isGrounded: true,
      jumpsLeft: 2,
      trail: [] as { x: number; y: number; opacity: number }[],
    },
    obstacles: [] as { x: number; y: number; width: number; height: number; type: 'spike' | 'barrier' | 'drone' }[],
    collectibles: [] as { x: number; y: number; size: number; collected: boolean; type: 'coin' | 'shield' }[],
    particles: [] as { x: number; y: number; vx: number; vy: number; color: string; life: number; maxLife: number }[],
    groundY: 230,
    speed: 4.8,
    distance: 0,
    currentScore: 0,
    currentCoins: 0,
    shieldTime: 0,
    animationFrameId: 0,
    lastObstacleSpawn: 0,
    lastCoinSpawn: 0,
  });

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (gameState === 'playing' && g.player.jumpsLeft > 0) {
      g.player.vy = g.player.jumpForce;
      g.player.jumpsLeft -= 1;
      g.player.isGrounded = false;
      playTone(520, 'sine', 0.12);

      // Spawn jump particles
      for (let i = 0; i < 6; i++) {
        g.particles.push({
          x: g.player.x + g.player.width / 2,
          y: g.player.y + g.player.height,
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2,
          color: '#f59e0b',
          life: 0,
          maxLife: 20,
        });
      }
    } else if (gameState === 'idle' || gameState === 'gameover') {
      startGame();
    }
  }, [gameState, playTone]);

  const startGame = () => {
    const g = gameRef.current;
    g.player.y = 190;
    g.player.vy = 0;
    g.player.isGrounded = true;
    g.player.jumpsLeft = 2;
    g.player.trail = [];
    g.obstacles = [];
    g.collectibles = [];
    g.particles = [];
    g.speed = 4.8;
    g.distance = 0;
    g.currentScore = 0;
    g.currentCoins = 0;
    g.shieldTime = 0;
    g.lastObstacleSpawn = 0;
    g.lastCoinSpawn = 0;

    setScore(0);
    setCoins(0);
    setShieldActive(false);
    setGameState('playing');
    playTone(440, 'triangle', 0.2);
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Main Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      const g = gameRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // 1. Clear background
      ctx.fillStyle = '#0c0d15';
      ctx.fillRect(0, 0, width, height);

      // Grid background effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridOffset = (g.distance * 0.5) % 30;
      for (let x = -gridOffset; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Horizon Neon Strip
      ctx.fillStyle = 'rgba(245, 158, 11, 0.04)';
      ctx.fillRect(0, g.groundY - 80, width, 80);

      // Draw Floor line
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, g.groundY);
      ctx.lineTo(width, g.groundY);
      ctx.stroke();

      // Sub-floor glow
      ctx.fillStyle = '#141624';
      ctx.fillRect(0, g.groundY, width, height - g.groundY);

      // Floor decorative tick marks
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      const floorTicks = (g.distance * 2) % 24;
      for (let tx = -floorTicks; tx < width; tx += 24) {
        ctx.beginPath();
        ctx.moveTo(tx, g.groundY);
        ctx.lineTo(tx - 10, height);
        ctx.stroke();
      }

      if (gameState === 'playing') {
        // Physics update
        g.distance += 1;
        g.currentScore = Math.floor(g.distance / 4) + g.currentCoins * 50;
        setScore(g.currentScore);

        // Gradually speed up
        if (g.distance % 400 === 0 && g.speed < 9.5) {
          g.speed += 0.35;
        }

        // Shield countdown
        if (g.shieldTime > 0) {
          g.shieldTime -= 1;
          if (g.shieldTime === 0) setShieldActive(false);
        }

        // Player physics
        g.player.vy += g.player.gravity;
        g.player.y += g.player.vy;

        // Player ground collision
        if (g.player.y + g.player.height >= g.groundY) {
          g.player.y = g.groundY - g.player.height;
          g.player.vy = 0;
          g.player.isGrounded = true;
          g.player.jumpsLeft = 2;
        }

        // Player motion trail
        if (g.distance % 3 === 0) {
          g.player.trail.unshift({ x: g.player.x, y: g.player.y, opacity: 0.5 });
          if (g.player.trail.length > 5) g.player.trail.pop();
        }

        // Spawn obstacles
        if (g.distance - g.lastObstacleSpawn > Math.max(75, 130 - g.speed * 4)) {
          const typeRand = Math.random();
          let type: 'spike' | 'barrier' | 'drone' = 'spike';
          let obsW = 20;
          let obsH = 26;
          let obsY = g.groundY - obsH;

          if (typeRand > 0.65) {
            type = 'barrier';
            obsW = 26;
            obsH = 38;
            obsY = g.groundY - obsH;
          } else if (typeRand > 0.4) {
            type = 'drone';
            obsW = 22;
            obsH = 18;
            obsY = g.groundY - 55 - Math.random() * 20;
          }

          g.obstacles.push({ x: width + 20, y: obsY, width: obsW, height: obsH, type });
          g.lastObstacleSpawn = g.distance + Math.floor(Math.random() * 30);
        }

        // Spawn collectibles
        if (g.distance - g.lastCoinSpawn > 90) {
          const isShield = Math.random() < 0.15;
          g.collectibles.push({
            x: width + 20,
            y: g.groundY - 30 - Math.random() * 45,
            size: isShield ? 14 : 10,
            collected: false,
            type: isShield ? 'shield' : 'coin',
          });
          g.lastCoinSpawn = g.distance + Math.floor(Math.random() * 40);
        }

        // Move and filter obstacles
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i];
          obs.x -= g.speed;

          // Check collision with player
          const hit =
            g.player.x + 4 < obs.x + obs.width &&
            g.player.x + g.player.width - 4 > obs.x &&
            g.player.y + 4 < obs.y + obs.height &&
            g.player.y + g.player.height > obs.y;

          if (hit) {
            if (g.shieldTime > 0) {
              // Shield absorbed hit!
              g.shieldTime = 0;
              setShieldActive(false);
              g.obstacles.splice(i, 1);
              playTone(300, 'square', 0.2);

              // Explode obstacle
              for (let p = 0; p < 12; p++) {
                g.particles.push({
                  x: obs.x + obs.width / 2,
                  y: obs.y + obs.height / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  color: '#38bdf8',
                  life: 0,
                  maxLife: 25,
                });
              }
              continue;
            } else {
              // Game Over
              setGameState('gameover');
              playTone(180, 'sawtooth', 0.35);

              // Update High Score if beaten
              if (g.currentScore > highScore) {
                setHighScore(g.currentScore);
                localStorage.setItem('sania_cyber_dash_highscore', g.currentScore.toString());
                confetti({
                  particleCount: 80,
                  spread: 70,
                  origin: { y: 0.6 },
                });
              }
              break;
            }
          }

          if (obs.x + obs.width < -10) {
            g.obstacles.splice(i, 1);
          }
        }

        // Move and check collectibles
        for (let i = g.collectibles.length - 1; i >= 0; i--) {
          const item = g.collectibles[i];
          item.x -= g.speed;

          // Player pickup
          const dist = Math.hypot(
            g.player.x + g.player.width / 2 - item.x,
            g.player.y + g.player.height / 2 - item.y
          );

          if (dist < 26) {
            if (item.type === 'coin') {
              g.currentCoins += 1;
              setCoins(g.currentCoins);
              playTone(880, 'sine', 0.08);
            } else if (item.type === 'shield') {
              g.shieldTime = 300; // 5 seconds
              setShieldActive(true);
              playTone(680, 'triangle', 0.2);
            }

            // Sparkle particles
            for (let p = 0; p < 8; p++) {
              g.particles.push({
                x: item.x,
                y: item.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                color: item.type === 'shield' ? '#38bdf8' : '#fbbf24',
                life: 0,
                maxLife: 20,
              });
            }

            g.collectibles.splice(i, 1);
            continue;
          }

          if (item.x < -20) {
            g.collectibles.splice(i, 1);
          }
        }
      }

      // 2. Draw Obstacles
      g.obstacles.forEach((obs) => {
        if (obs.type === 'spike') {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.moveTo(obs.x, obs.y + obs.height);
          ctx.lineTo(obs.x + obs.width / 2, obs.y);
          ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
          ctx.closePath();
          ctx.fill();
        } else if (obs.type === 'barrier') {
          ctx.fillStyle = '#f97316';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#fdba74';
          ctx.fillRect(obs.x + 4, obs.y + 4, obs.width - 8, obs.height - 8);
        } else if (obs.type === 'drone') {
          ctx.fillStyle = '#ec4899';
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
          ctx.fill();
          // Drone eye
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Draw Collectibles
      g.collectibles.forEach((item) => {
        if (item.type === 'coin') {
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // 4. Draw Player Trail
      g.player.trail.forEach((t) => {
        ctx.fillStyle = `rgba(245, 158, 11, ${t.opacity * 0.3})`;
        ctx.fillRect(t.x, t.y, g.player.width, g.player.height);
        t.opacity -= 0.05;
      });

      // 5. Draw Player Avatar (Cyber Runner)
      const p = g.player;
      ctx.fillStyle = '#f59e0b';
      // Rounded runner body
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.width, p.height, 6);
      ctx.fill();

      // Cyber Visor
      ctx.fillStyle = '#0c0d15';
      ctx.fillRect(p.x + 12, p.y + 7, 14, 8);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(p.x + 15, p.y + 9, 10, 4);

      // Core light
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 6, p.y + 20, 6, 6);

      // Active Shield Aura
      if (g.shieldTime > 0) {
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 + Math.sin(Date.now() / 100) * 0.3})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.x + p.width / 2, p.y + p.height / 2, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 6. Update and Draw Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const pt = g.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life += 1;
        const alpha = 1 - pt.life / pt.maxLife;

        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillRect(pt.x, pt.y, 3, 3);
        ctx.globalAlpha = 1;

        if (pt.life >= pt.maxLife) {
          g.particles.splice(i, 1);
        }
      }

      // Next frame
      g.animationFrameId = requestAnimationFrame(render);
    };

    const g = gameRef.current;
    g.animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(g.animationFrameId);
    };
  }, [gameState, highScore, playTone]);

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-[#0d0f18] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0a0b12]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-display font-bold text-sm tracking-wide text-white uppercase">
            Cyber Dash · Real Web Arcade Engine
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">Built by Sania</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono-code">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* High Score */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>BEST: {highScore}</span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
              aria-label="Close Game"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#0c0d15] overflow-hidden select-none">
        <canvas
          ref={canvasRef}
          width={720}
          height={300}
          className="w-full h-full block cursor-pointer"
          onClick={jump}
        />

        {/* Live HUD In-Game */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none text-xs font-mono-code">
          <div className="flex items-center gap-3 bg-[#0a0b12]/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
            <span className="text-slate-400">SCORE:</span>
            <span className="font-bold text-white text-sm tabular-nums">{score}</span>
            <span className="text-amber-400 ml-2">ORBS: {coins}</span>
          </div>

          {shieldActive && (
            <div className="flex items-center gap-1.5 bg-sky-500/20 text-sky-300 px-3 py-1.5 rounded-lg border border-sky-500/30">
              <Shield className="w-3.5 h-3.5 animate-pulse" />
              <span>SHIELD ACTIVE</span>
            </div>
          )}
        </div>

        {/* Start Screen Overlay */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="space-y-1">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                CYBER DASH: NEON HORIZON
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                A real 60-FPS physics canvas runner engineered by Sania. Dodge barriers, jump twice, and collect energy orbs!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startGame}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Game</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-mono-code">
              Press <span className="text-white bg-white/10 px-1.5 py-0.5 rounded">SPACE</span>, <span className="text-white bg-white/10 px-1.5 py-0.5 rounded">UP ARROW</span> or <span className="text-white bg-white/10 px-1.5 py-0.5 rounded">TAP SCREEN</span> to Double Jump
            </div>
          </div>
        )}

        {/* Game Over Screen Overlay */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px] flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono-code uppercase text-red-400 tracking-wider">
                Run Concluded
              </span>
              <h3 className="font-display text-3xl font-extrabold text-white">
                FINAL SCORE: {score}
              </h3>
              {score >= highScore && score > 0 && (
                <p className="text-xs text-amber-400 font-medium flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>New Personal Record!</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startGame}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Touch / Quick Controller Bar for Mobile & Desktop */}
      <div className="px-5 py-3 bg-[#0a0b12] border-t border-white/10 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          <span className="hidden sm:inline">Engine: </span>
          <span className="text-slate-300 font-mono-code">HTML5 Canvas · Web Audio API · 60 FPS</span>
        </div>

        <button
          onClick={jump}
          className="px-5 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 active:scale-95 rounded transition-all flex items-center gap-1.5 cursor-pointer sm:hidden"
        >
          <ChevronUp className="w-4 h-4 text-amber-400" />
          <span>Tap to Jump</span>
        </button>
      </div>
    </div>
  );
};
