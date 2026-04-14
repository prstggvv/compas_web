import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import cls from './Hero.module.css';
import { classNames } from '../../../../../shared/lib/classNames/classNames';
import { MOTION_EASE } from '../../../../../shared/lib/motion';

interface IHeroProps {
  className?: string;
  onOpenContactPopup?: () => void;
}

type Tint = 'white' | 'red' | 'blue';

interface Lane {
  rx: number;
  ry: number;
  opacity: number;
  lineWidth: number;
  dashed: boolean;
  tint: Tint;
}

interface StarParticle {
  x: number;
  y: number;
  speed: number;
  radius: number;
  opacity: number;
  depth: number;
  twinkle: number;
  tint: Tint;
}

interface DustParticle {
  lane: number;
  angle: number;
  speed: number;
  radialOffset: number;
  opacity: number;
  size: number;
  depth: number;
  twinkle: number;
  tint: Tint;
}

interface TrafficParticle {
  lane: number;
  angle: number;
  speed: number;
  size: number;
  glow: number;
  tint: Tint;
  pulse: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  active: boolean;
}

interface HeroScene {
  lanes: Lane[];
  stars: StarParticle[];
  dust: DustParticle[];
  traffic: TrafficParticle[];
  shootingStars: ShootingStar[];
  mouseX: number;
  mouseY: number;
  scrollY: number;
  width: number;
  height: number;
  compact: boolean;
  hovered: boolean;
  raf: number;
  lastTime: number;
}

const STAR_LAYERS = [28, 40, 54] as const;
const MOBILE_STAR_LAYERS = [14, 22, 30] as const;
const DUST_COUNT = 320;
const MOBILE_DUST_COUNT = 170;
const TRAFFIC_COUNT = 18;
const MOBILE_TRAFFIC_COUNT = 10;
const ROUTE_CYCLE = 16000;
const ROUTE_LANE_RATIO = 0.36;
const ROUTE_EDGE_OFFSET = 0.055;
const ROUTE_EDGE_OFFSET_MOBILE = 0.07;
const ROUTE_ARC_SPAN = Math.PI * 1.25;
const ROUTE_ARC_START = -Math.PI * 0.55;
const ROUTE_CHEVRON_COUNT = 5;
const ROUTE_CHEVRON_COUNT_MOBILE = 3;
const ROUTE_SIGNAL_COUNT = 4;
const ROUTE_SIGNAL_COUNT_MOBILE = 2;

const ArrowRightIcon = () => (
  <svg
    className={classNames(cls.btnPrimaryIcon, {}, [])}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    fill="currentColor"
    aria-hidden
  >
    <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
  </svg>
);

const getColor = (tint: Tint, alpha: number) => {
  if (tint === 'red') {
    return `rgba(255, 45, 45, ${alpha})`;
  }

  if (tint === 'blue') {
    return `rgba(138, 180, 255, ${alpha})`;
  }

  return `rgba(255, 255, 255, ${alpha})`;
};

const getSolidColor = (tint: Tint) => {
  if (tint === 'red') {
    return '#ff2d2d';
  }

  if (tint === 'blue') {
    return 'rgba(180, 214, 255, 0.95)';
  }

  return 'rgba(255, 255, 255, 0.92)';
};

const pickTint = (redChance = 0.06, blueChance = 0.16): Tint => {
  const roll = Math.random();

  if (roll < redChance) {
    return 'red';
  }

  if (roll < blueChance) {
    return 'blue';
  }

  return 'white';
};

const createLanes = (width: number, height: number, compact: boolean): Lane[] => {
  const count = compact ? 8 : 11;
  const minDim = Math.min(width, height);

  return Array.from({ length: count }, (_, index) => {
    const rx = minDim * (0.04 + index * 0.052);
    const ry = rx * (0.16 + index * 0.008);

    return {
      rx,
      ry,
      opacity: 0.045 + (1 - index / count) * 0.05,
      lineWidth: index === 0 ? 0.85 : 1,
      dashed: index > 0 && index % 2 === 1,
      tint: index === 1 ? 'red' : index === 4 ? 'blue' : 'white',
    };
  });
};

const createStars = (width: number, height: number, compact: boolean): StarParticle[] => {
  const layers = compact ? MOBILE_STAR_LAYERS : STAR_LAYERS;
  const stars: StarParticle[] = [];

  layers.forEach((count, layerIndex) => {
    for (let i = 0; i < count; i += 1) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.01 + layerIndex * 0.014 + Math.random() * 0.018,
        radius: 0.4 + layerIndex * 0.38 + Math.random() * 0.9,
        opacity: 0.16 + Math.random() * 0.45,
        depth: 0.25 + layerIndex * 0.32,
        twinkle: Math.random() * Math.PI * 2,
        tint: pickTint(0.03, 0.14),
      });
    }
  });

  return stars;
};

const createDust = (laneCount: number, compact: boolean): DustParticle[] => {
  const count = compact ? MOBILE_DUST_COUNT : DUST_COUNT;

  return Array.from({ length: count }, () => ({
    lane: Math.floor(Math.random() * laneCount),
    angle: Math.random() * Math.PI * 2,
    speed: 0.00006 + Math.random() * 0.00012,
    radialOffset: (Math.random() - 0.5) * 0.18,
    opacity: 0.18 + Math.random() * 0.42,
    size: 0.6 + Math.random() * 1.4,
    depth: 0.6 + Math.random() * 0.7,
    twinkle: Math.random() * Math.PI * 2,
    tint: pickTint(0.04, 0.12),
  }));
};

const createTraffic = (laneCount: number, compact: boolean): TrafficParticle[] => {
  const count = compact ? MOBILE_TRAFFIC_COUNT : TRAFFIC_COUNT;

  return Array.from({ length: count }, () => ({
    lane: Math.floor(Math.random() * laneCount),
    angle: Math.random() * Math.PI * 2,
    speed: 0.00022 + Math.random() * 0.00034,
    size: 1.1 + Math.random() * 1.1,
    glow: 8 + Math.random() * 12,
    tint: pickTint(0.14, 0.34),
    pulse: Math.random() * Math.PI * 2,
  }));
};

const createShootingStars = (width: number, height: number, compact: boolean): ShootingStar[] => {
  const total = compact ? 1 : 2;

  return Array.from({ length: total }, () => ({
    x: Math.random() * width,
    y: -height * 0.2,
    vx: 0,
    vy: 0,
    life: 0,
    maxLife: 0,
    active: false,
  }));
};

const activateShootingStar = (star: ShootingStar, width: number, height: number) => {
  star.x = Math.random() * width * 0.82;
  star.y = Math.random() * height * 0.32;
  star.vx = 12 + Math.random() * 8;
  star.vy = 6 + Math.random() * 4;
  star.maxLife = 28 + Math.random() * 16;
  star.life = star.maxLife;
  star.active = true;
};

const getLanePoint = (
  lane: Lane,
  angle: number,
  radialOffset: number,
  width: number,
  height: number,
  zoom: number,
) => {
  const centerX = width * 0.69;
  const centerY = height * 0.47;
  const rx = lane.rx * (1 + radialOffset) * zoom;
  const ry = lane.ry * (1 + radialOffset * 0.35) * zoom;

  return {
    x: centerX + Math.cos(angle) * rx,
    y: centerY + Math.sin(angle) * ry,
  };
};

const getLaneTangentAngle = (
  lane: Lane,
  angle: number,
  radialOffset: number,
  zoom: number,
) => {
  const rx = lane.rx * (1 + radialOffset) * zoom;
  const ry = lane.ry * (1 + radialOffset * 0.35) * zoom;
  const dx = -Math.sin(angle) * rx;
  const dy = Math.cos(angle) * ry;

  return Math.atan2(dy, dx);
};

export const Hero = ({ className, onOpenContactPopup }: IHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<HeroScene | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (sceneRef.current?.raf) {
      cancelAnimationFrame(sceneRef.current.raf);
    }

    const width = rect.width;
    const height = rect.height;
    const compact = width <= 768;
    const lanes = createLanes(width, height, compact);

    sceneRef.current = {
      lanes,
      stars: createStars(width, height, compact),
      dust: createDust(lanes.length, compact),
      traffic: createTraffic(lanes.length, compact),
      shootingStars: createShootingStars(width, height, compact),
      mouseX: width * 0.5,
      mouseY: height * 0.5,
      scrollY: window.scrollY,
      width,
      height,
      compact,
      hovered: false,
      raf: 0,
      lastTime: 0,
    };

    const drawCore = (parallaxX: number, parallaxY: number, hovered: boolean) => {
      if (!sceneRef.current) {
        return;
      }

      const { width: sceneWidth, height: sceneHeight } = sceneRef.current;
      const centerX = sceneWidth * 0.69 + parallaxX * 0.35;
      const centerY = sceneHeight * 0.47 + parallaxY * 0.2;

      const core = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(sceneWidth, sceneHeight) * 0.18,
      );
      core.addColorStop(0, `rgba(255, 255, 255, ${hovered ? 0.26 : 0.2})`);
      core.addColorStop(0.2, 'rgba(138, 180, 255, 0.10)');
      core.addColorStop(0.55, 'rgba(255, 45, 45, 0.04)');
      core.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, sceneWidth, sceneHeight);

      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          12 + i * 10,
          4 + i * 1.6,
          0,
          0,
          Math.PI * 2,
        );
        ctx.strokeStyle = i === 0
          ? `rgba(255, 255, 255, ${hovered ? 0.42 : 0.32})`
          : `rgba(255, 255, 255, ${0.08 - i * 0.012})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawLanes = (time: number, parallaxX: number, parallaxY: number, zoom: number) => {
      if (!sceneRef.current) {
        return;
      }

      const { lanes: sceneLanes, width: sceneWidth, height: sceneHeight, hovered, compact: isCompact } = sceneRef.current;
      const centerX = sceneWidth * 0.69 + parallaxX * 0.34;
      const centerY = sceneHeight * 0.47 + parallaxY * 0.2 - sceneRef.current.scrollY * 0.028;
      const highlight = hovered ? 1.22 : 1;

      for (let index = 0; index < sceneLanes.length; index += 1) {
        const lane = sceneLanes[index];

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, lane.rx * zoom, lane.ry * zoom, 0, 0, Math.PI * 2);

        if (lane.dashed) {
          ctx.setLineDash(isCompact ? [9, 16] : [12, 18]);
          ctx.lineDashOffset = -(time * 0.03 * (1 + index * 0.04));
        }

        ctx.strokeStyle = lane.tint === 'red'
          ? `rgba(255, 45, 45, ${lane.opacity * 0.55 * highlight})`
          : lane.tint === 'blue'
            ? `rgba(138, 180, 255, ${lane.opacity * 0.75 * highlight})`
            : `rgba(255, 255, 255, ${lane.opacity * highlight})`;
        ctx.lineWidth = lane.lineWidth;
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    const drawStars = (time: number, parallaxX: number, parallaxY: number) => {
      if (!sceneRef.current) {
        return;
      }

      const { stars, width: sceneWidth, height: sceneHeight } = sceneRef.current;

      for (const star of stars) {
        star.x -= star.speed * (0.45 + star.depth * 0.4);

        if (star.x < -16) {
          star.x = sceneWidth + 16;
          star.y = Math.random() * sceneHeight;
        }

        const twinkle = 0.7 + Math.sin(time * 0.001 + star.twinkle) * 0.3;
        const alpha = star.opacity * twinkle;
        const x = star.x + parallaxX * star.depth;
        const y = star.y + parallaxY * star.depth - sceneRef.current.scrollY * star.depth * 0.002;

        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = getColor(star.tint, alpha);
        ctx.fill();
      }
    };

    const drawDust = (delta: number, time: number, parallaxX: number, parallaxY: number, zoom: number) => {
      if (!sceneRef.current) {
        return;
      }

      const { lanes: sceneLanes, dust, width: sceneWidth, height: sceneHeight } = sceneRef.current;

      for (const particle of dust) {
        const lane = sceneLanes[particle.lane];
        particle.angle += particle.speed * delta * (0.8 + Math.sin(time * 0.0012 + particle.twinkle) * 0.2);
        const point = getLanePoint(lane, particle.angle, particle.radialOffset, sceneWidth, sceneHeight, zoom);
        const x = point.x + parallaxX * particle.depth;
        const y = point.y + parallaxY * particle.depth - sceneRef.current.scrollY * 0.012;
        const alpha = particle.opacity * (0.7 + Math.sin(time * 0.0013 + particle.twinkle) * 0.3);

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = getColor(particle.tint, alpha);
        ctx.fill();
      }
    };

    const drawTraffic = (delta: number, time: number, parallaxX: number, parallaxY: number, zoom: number) => {
      if (!sceneRef.current) {
        return;
      }

      const { lanes: sceneLanes, traffic, width: sceneWidth, height: sceneHeight } = sceneRef.current;

      for (const particle of traffic) {
        const lane = sceneLanes[particle.lane];
        const modulation = 0.82 + Math.sin(time * 0.0014 + particle.pulse) * 0.18;
        particle.angle += particle.speed * delta * modulation;

        const point = getLanePoint(lane, particle.angle, 0, sceneWidth, sceneHeight, zoom);
        const x = point.x + parallaxX * 1.1;
        const y = point.y + parallaxY * 0.85 - sceneRef.current.scrollY * 0.016;

        const glow = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          particle.glow,
        );

        if (particle.tint === 'red') {
          glow.addColorStop(0, 'rgba(255, 45, 45, 0.92)');
          glow.addColorStop(0.45, 'rgba(255, 45, 45, 0.22)');
        } else if (particle.tint === 'blue') {
          glow.addColorStop(0, 'rgba(148, 190, 255, 0.86)');
          glow.addColorStop(0.45, 'rgba(148, 190, 255, 0.18)');
        } else {
          glow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          glow.addColorStop(0.45, 'rgba(255, 255, 255, 0.16)');
        }

        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(x, y, particle.size * 3.6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = getSolidColor(particle.tint);
        ctx.fill();
      }
    };

    const drawShootingStars = (delta: number) => {
      if (!sceneRef.current) {
        return;
      }

      const { width: sceneWidth, height: sceneHeight, compact, shootingStars } = sceneRef.current;
      const spawnChance = compact ? 0.0012 : 0.0018;

      for (const shootingStar of shootingStars) {
        if (!shootingStar.active && Math.random() < spawnChance) {
          activateShootingStar(shootingStar, sceneWidth, sceneHeight);
        }

        if (!shootingStar.active) {
          continue;
        }

        shootingStar.x += shootingStar.vx * (delta / 16.67);
        shootingStar.y += shootingStar.vy * (delta / 16.67);
        shootingStar.life -= delta;

        const alpha = Math.max(shootingStar.life / shootingStar.maxLife, 0);

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.vx * 1.8, shootingStar.y - shootingStar.vy * 1.8);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        if (shootingStar.life <= 0 || shootingStar.x > sceneWidth + 120 || shootingStar.y > sceneHeight + 120) {
          shootingStar.active = false;
        }
      }
    };

    const drawRouteOverlay = (time: number, parallaxX: number, parallaxY: number, zoom: number) => {
      if (!sceneRef.current) {
        return;
      }

      const { lanes: sceneLanes, width: sceneWidth, height: sceneHeight, compact } = sceneRef.current;
      const lane = sceneLanes[Math.max(2, Math.floor(sceneLanes.length * ROUTE_LANE_RATIO))];
      const edgeOffset = compact ? ROUTE_EDGE_OFFSET_MOBILE : ROUTE_EDGE_OFFSET;
      const steps = compact ? 36 : 52;
      const scrollShift = sceneRef.current.scrollY * 0.015;
      const px = parallaxX * 0.42;
      const py = parallaxY * 0.24 - scrollShift;

      const phase = (time % ROUTE_CYCLE) / ROUTE_CYCLE;
      const pulseWave = Math.max(0, Math.sin(phase * Math.PI * 2 - Math.PI * 0.5));
      const pulseIntensity = Math.pow(pulseWave, 4);

      const baseAlpha = 0.12 + pulseIntensity * 0.18;
      const centerAlpha = 0.2 + pulseIntensity * 0.35;

      const traceArc = (radialOff: number, style: string, lw: number, dash: boolean) => {
        ctx.beginPath();

        for (let i = 0; i <= steps; i += 1) {
          const ratio = i / steps;
          const angle = ROUTE_ARC_START + ROUTE_ARC_SPAN * ratio;
          const pt = getLanePoint(lane, angle, radialOff, sceneWidth, sceneHeight, zoom);

          if (i === 0) {
            ctx.moveTo(pt.x + px, pt.y + py);
          } else {
            ctx.lineTo(pt.x + px, pt.y + py);
          }
        }

        if (dash) {
          ctx.setLineDash(compact ? [7, 13] : [10, 16]);
          ctx.lineDashOffset = -time * 0.05;
        }

        ctx.strokeStyle = style;
        ctx.lineWidth = lw;
        ctx.stroke();
        ctx.setLineDash([]);
      };

      traceArc(-edgeOffset, `rgba(255, 255, 255, ${baseAlpha})`, compact ? 0.9 : 1, false);
      traceArc(edgeOffset, `rgba(255, 255, 255, ${baseAlpha})`, compact ? 0.9 : 1, false);
      traceArc(0, `rgba(255, 45, 45, ${centerAlpha})`, compact ? 0.8 : 0.9, true);

      const chevronTotal = compact ? ROUTE_CHEVRON_COUNT_MOBILE : ROUTE_CHEVRON_COUNT;
      const chevronSpacing = ROUTE_ARC_SPAN / (chevronTotal + 1);
      const chevronPhase = (time * 0.00018) % 1;

      for (let i = 0; i < chevronTotal; i += 1) {
        const baseAngle = ROUTE_ARC_START + chevronSpacing * (i + 1);
        const driftAngle = baseAngle + chevronPhase * chevronSpacing;
        const wrappedAngle = ROUTE_ARC_START + ((driftAngle - ROUTE_ARC_START) % ROUTE_ARC_SPAN);
        const pt = getLanePoint(lane, wrappedAngle, 0, sceneWidth, sceneHeight, zoom);
        const rot = getLaneTangentAngle(lane, wrappedAngle, 0, zoom);
        const size = compact ? 6 : 7.5;
        const alpha = 0.22 + pulseIntensity * 0.38;

        ctx.save();
        ctx.translate(pt.x + px, pt.y + py);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.moveTo(-size, -size * 0.72);
        ctx.lineTo(0, 0);
        ctx.lineTo(-size, size * 0.72);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = compact ? 1.1 : 1.3;
        ctx.stroke();
        ctx.restore();
      }

      const signalTotal = compact ? ROUTE_SIGNAL_COUNT_MOBILE : ROUTE_SIGNAL_COUNT;

      for (let i = 0; i < signalTotal; i += 1) {
        const angle = ROUTE_ARC_START + ROUTE_ARC_SPAN * ((i + 0.5) / signalTotal);
        const pulse = 0.5 + Math.sin(time * 0.008 + i * 2.1) * 0.5;
        const pt = getLanePoint(lane, angle, 0, sceneWidth, sceneHeight, zoom);
        const x = pt.x + px;
        const y = pt.y + py;
        const glowRadius = compact ? 16 : 22;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        glow.addColorStop(0, `rgba(255, 45, 45, ${(0.5 + pulseIntensity * 0.4) * pulse})`);
        glow.addColorStop(0.4, `rgba(255, 45, 45, ${(0.12 + pulseIntensity * 0.15) * pulse})`);
        glow.addColorStop(1, 'rgba(255, 45, 45, 0)');

        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, compact ? 2 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.65 * pulse + pulseIntensity * 0.35})`;
        ctx.fill();
      }

      if (pulseIntensity > 0.05) {
        const waveAngle = ROUTE_ARC_START + phase * ROUTE_ARC_SPAN * 2.2;
        const clampedAngle = Math.min(waveAngle, ROUTE_ARC_START + ROUTE_ARC_SPAN);

        if (clampedAngle > ROUTE_ARC_START) {
          const wavePt = getLanePoint(lane, clampedAngle, 0, sceneWidth, sceneHeight, zoom);
          const waveX = wavePt.x + px;
          const waveY = wavePt.y + py;
          const waveRadius = (compact ? 38 : 56) * pulseIntensity;

          const waveGlow = ctx.createRadialGradient(waveX, waveY, 0, waveX, waveY, waveRadius);
          waveGlow.addColorStop(0, `rgba(255, 45, 45, ${0.55 * pulseIntensity})`);
          waveGlow.addColorStop(0.3, `rgba(255, 45, 45, ${0.18 * pulseIntensity})`);
          waveGlow.addColorStop(0.6, `rgba(138, 180, 255, ${0.06 * pulseIntensity})`);
          waveGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.arc(waveX, waveY, waveRadius, 0, Math.PI * 2);
          ctx.fillStyle = waveGlow;
          ctx.fill();
        }
      }
    };

    const drawRouteConnections = (time: number, parallaxX: number, parallaxY: number, zoom: number) => {
      if (!sceneRef.current) {
        return;
      }

      const { lanes: sceneLanes, width: sceneWidth, height: sceneHeight, compact } = sceneRef.current;
      const scrollShift = sceneRef.current.scrollY * 0.012;
      const px = parallaxX * 0.46;
      const py = parallaxY * 0.24 - scrollShift;
      const phase = (time % ROUTE_CYCLE) / ROUTE_CYCLE;
      const pulseWave = Math.max(0, Math.sin(phase * Math.PI * 2 - Math.PI * 0.5));
      const pulseIntensity = Math.pow(pulseWave, 4);

      const nodes = [
        {
          laneIndex: Math.min(sceneLanes.length - 1, compact ? 1 : 2),
          angle: -1.92,
          radialOffset: -0.01,
          size: compact ? 7 : 9,
          tint: 'blue' as const,
        },
        {
          laneIndex: Math.min(sceneLanes.length - 1, compact ? 3 : 5),
          angle: -1.08,
          radialOffset: 0,
          size: compact ? 10 : 13,
          tint: 'white' as const,
        },
        {
          laneIndex: Math.min(sceneLanes.length - 1, compact ? 4 : 7),
          angle: -0.18,
          radialOffset: 0.02,
          size: compact ? 8 : 10,
          tint: 'red' as const,
        },
        {
          laneIndex: Math.min(sceneLanes.length - 1, compact ? 6 : 9),
          angle: 0.86,
          radialOffset: 0.015,
          size: compact ? 11 : 14,
          tint: 'blue' as const,
        },
      ].map((node) => {
        const point = getLanePoint(
          sceneLanes[node.laneIndex],
          node.angle,
          node.radialOffset,
          sceneWidth,
          sceneHeight,
          zoom,
        );

        return {
          ...node,
          x: point.x + px,
          y: point.y + py,
        };
      });

      const connections: Array<[number, number, Tint]> = compact
        ? [
            [0, 1, 'white'],
            [1, 2, 'red'],
            [2, 3, 'blue'],
          ]
        : [
            [0, 1, 'white'],
            [1, 2, 'red'],
            [1, 3, 'blue'],
            [2, 3, 'white'],
          ];

      connections.forEach(([fromIndex, toIndex, tint], connectionIndex) => {
        const from = nodes[fromIndex];
        const to = nodes[toIndex];
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        const alphaBase = 0.12 + pulseIntensity * 0.16;

        gradient.addColorStop(0, getColor(tint, alphaBase));
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(1, getColor(tint === 'red' ? 'white' : tint, alphaBase * 0.92));

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = compact ? 1 : 1.1;
        ctx.stroke();

        ctx.setLineDash(compact ? [4, 8] : [5, 10]);
        ctx.lineDashOffset = -(time * 0.045 * (1 + connectionIndex * 0.06));
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 + pulseIntensity * 0.18})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      nodes.forEach((node, index) => {
        const glowRadius = node.size * (compact ? 2.8 : 3.4) * (1 + pulseIntensity * 0.18);
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);

        glow.addColorStop(0, getColor(node.tint, 0.24 + pulseIntensity * 0.18));
        glow.addColorStop(0.45, getColor(node.tint, 0.08 + pulseIntensity * 0.05));
        glow.addColorStop(1, getColor(node.tint, 0));

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = getSolidColor(node.tint);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + (compact ? 4 : 5.5) + Math.sin(time * 0.0014 + index) * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = getColor(node.tint, 0.14 + pulseIntensity * 0.12);
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      const launchStart = nodes[0];
      const launchEnd = nodes[3];
      const shipProgress = (time * 0.00006) % 1;
      const shipX = launchStart.x + (launchEnd.x - launchStart.x) * shipProgress;
      const shipY = launchStart.y + (launchEnd.y - launchStart.y) * shipProgress;
      const shipAngle = Math.atan2(launchEnd.y - launchStart.y, launchEnd.x - launchStart.x);
      const shipTrail = compact ? 34 : 48;

      ctx.beginPath();
      ctx.moveTo(shipX, shipY);
      ctx.lineTo(
        shipX - Math.cos(shipAngle) * shipTrail,
        shipY - Math.sin(shipAngle) * shipTrail,
      );
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.16 + pulseIntensity * 0.18})`;
      ctx.lineWidth = compact ? 1 : 1.2;
      ctx.stroke();

      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.rotate(shipAngle);

      ctx.beginPath();
      ctx.moveTo(compact ? 8 : 10, 0);
      ctx.lineTo(compact ? -6 : -7.5, compact ? -4.2 : -5.2);
      ctx.lineTo(compact ? -2.4 : -3.2, 0);
      ctx.lineTo(compact ? -6 : -7.5, compact ? 4.2 : 5.2);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 + pulseIntensity * 0.08})`;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(compact ? -6 : -7.5, 0);
      ctx.lineTo(compact ? -11 : -13, compact ? -3 : -3.8);
      ctx.lineTo(compact ? -11 : -13, compact ? 3 : 3.8);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 45, 45, ${0.72 + pulseIntensity * 0.16})`;
      ctx.fill();

      ctx.restore();
    };

    const draw = (time: number) => {
      if (!sceneRef.current) {
        return;
      }

      const scene = sceneRef.current;
      const delta = scene.lastTime ? Math.min(time - scene.lastTime, 34) : 16.67;
      scene.lastTime = time;
      const zoom = 1 + Math.min(scene.scrollY, scene.height) * 0.00018;

      const parallaxX = (scene.mouseX / scene.width - 0.5) * 14;
      const parallaxY = (scene.mouseY / scene.height - 0.5) * 8;

      ctx.clearRect(0, 0, scene.width, scene.height);

      drawCore(parallaxX, parallaxY, scene.hovered);
      drawStars(time, parallaxX * 0.45, parallaxY * 0.28);
      drawLanes(time, parallaxX * 0.3, parallaxY * 0.16, zoom);
      drawDust(delta, time, parallaxX * 0.34, parallaxY * 0.18, zoom);
      drawTraffic(delta, time, parallaxX * 0.38, parallaxY * 0.22, zoom);
      drawRouteConnections(time, parallaxX * 0.36, parallaxY * 0.2, zoom);
      drawShootingStars(delta);
      drawRouteOverlay(time, parallaxX * 0.34, parallaxY * 0.18, zoom);

      scene.raf = requestAnimationFrame(draw);
    };

    sceneRef.current.raf = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.raf);
      }
    };
  }, [initCanvas]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (sceneRef.current) {
        sceneRef.current.mouseX = e.clientX;
        sceneRef.current.mouseY = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sceneRef.current) {
        sceneRef.current.scrollY = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePointerEnter = useCallback(() => {
    if (sceneRef.current) {
      sceneRef.current.hovered = true;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (sceneRef.current) {
      sceneRef.current.hovered = false;
    }
  }, []);

  return (
    <section
      id="hero"
      className={classNames(cls.section, {}, [className ?? ''])}
      aria-labelledby="hero-title"
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
    >
      <canvas ref={canvasRef} className={classNames(cls.canvas, {}, [])} aria-hidden />

      <div className={classNames(cls.vignette, {}, [])} aria-hidden />

      <motion.div
        className={classNames(cls.content, {}, [])}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
        }}
      >
        <div className={classNames(cls.left, {}, [])}>

          <motion.h1
            id="hero-title"
            className={classNames(cls.title, {}, [])}
            variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: MOTION_EASE } } }}
          >
            <span className={classNames(cls.titleLine, {}, [])}>Создаем{'\u00A0'}систему</span>
            <span className={classNames(cls.titleLine, {}, [])}>движения.</span>
            <span className={classNames(cls.titleLine, {}, [])}>От{'\u00A0'}хаоса{'\u00A0'}к</span>
            <span className={classNames(cls.titleLine, {}, [])}>
              <span className={classNames(cls.titleAccent, {}, [])}>структуре.</span>
            </span>
          </motion.h1>

          <motion.p
            className={classNames(cls.subtitle, {}, [])}
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: MOTION_EASE } } }}
          >
            Интеллектуально проектируем транспортные и логистические каркасы будущего, превращая сложные потоки в ясную инфраструктурную систему.
          </motion.p>

          <motion.div
            className={classNames(cls.actions, {}, [])}
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: MOTION_EASE } } }}
          >
            <button
              type="button"
              className={classNames(cls.btnPrimary, {}, [])}
              onClick={onOpenContactPopup}
              aria-label="Оставить заявку"
            >
              Оставить заявку
              <ArrowRightIcon />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
