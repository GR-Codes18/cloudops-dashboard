import React from 'react';
import type {
  ServiceStatus,
  InfrastructureStatus,
  SecurityStatus,
  AvailabilityLevel,
} from '../types/cloud';

export type AnyStatus =
  | ServiceStatus
  | InfrastructureStatus
  | SecurityStatus
  | AvailabilityLevel
  | string;

interface StatusBadgeProps {
  status: AnyStatus;
  size?: 'sm' | 'md';
}

interface BadgeStyle {
  container: string;
  dot: string;
  label: string;
}

const statusMap: Record<string, BadgeStyle> = {
  // --- Éxito / Verde ---
  Activo: {
    container: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    dot: 'bg-emerald-500',
    label: 'Activo',
  },
  Operativo: {
    container: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    dot: 'bg-emerald-500',
    label: 'Operativo',
  },
  correcto: {
    container: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    dot: 'bg-emerald-500',
    label: 'Correcto',
  },
  'Alta disponibilidad': {
    container: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    dot: 'bg-emerald-500',
    label: 'Alta disponibilidad',
  },

  // --- Advertencia / Amarillo ---
  'En prueba': {
    container: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    dot: 'bg-amber-500',
    label: 'En prueba',
  },
  Degradado: {
    container: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    dot: 'bg-amber-500',
    label: 'Degradado',
  },
  revision: {
    container: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    dot: 'bg-amber-500',
    label: 'Requiere Revisión',
  },
  Básico: {
    container: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    dot: 'bg-amber-500',
    label: 'Básico',
  },

  // --- Peligro / Rojo ---
  Inactivo: {
    container: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    dot: 'bg-rose-500',
    label: 'Inactivo',
  },
  Caído: {
    container: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    dot: 'bg-rose-500',
    label: 'Caído',
  },
  problema: {
    container: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    dot: 'bg-rose-500',
    label: 'Problema Crítico',
  },
  Crítica: {
    container: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    dot: 'bg-rose-500',
    label: 'Misión Crítica',
  },
};

const defaultStyle: BadgeStyle = {
  container: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
  dot: 'bg-slate-500',
  label: 'Desconocido',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const currentStyle = statusMap[status] || { ...defaultStyle, label: String(status) };

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px] gap-1.5'
      : 'px-2.5 py-1 text-xs gap-2';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${currentStyle.container} ${sizeClasses} select-none transition-colors`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${currentStyle.dot} flex-shrink-0`} />
      <span className="capitalize">{currentStyle.label}</span>
    </span>
  );
};