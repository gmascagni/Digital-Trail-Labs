import {
  Bot,
  Building2,
  Coffee,
  Compass,
  Crosshair,
  Gauge,
  Leaf,
  Mountain,
  Plane,
  ScanLine,
  ShieldCheck,
  Tv,
  Wind,
  Wrench,
} from 'lucide-react';
import type { AppProject } from '../data/apps';

interface AppIconProps {
  name: AppProject['iconName'];
  from: string;
  to: string;
  size?: 'sm' | 'md' | 'lg';
}

const ICONS = {
  shield: ShieldCheck,
  bot: Bot,
  crosshair: Crosshair,
  mountain: Mountain,
  coffee: Coffee,
  leaf: Leaf,
  compass: Compass,
  wind: Wind,
  gauge: Gauge,
  scan: ScanLine,
  plane: Plane,
  wrench: Wrench,
  tv: Tv,
  building: Building2,
};

export function AppIcon({ name, from, to, size = 'md' }: AppIconProps) {
  const Icon = ICONS[name];
  const dims =
    size === 'lg'
      ? 'h-14 w-14 rounded-2xl'
      : size === 'sm'
        ? 'h-9 w-9 rounded-lg'
        : 'h-11 w-11 rounded-xl';
  const iconDims = size === 'lg' ? 'h-7 w-7' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center text-white shadow-sm ${dims}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      <Icon className={iconDims} />
    </div>
  );
}
