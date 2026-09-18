import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  accentColor?: 'primary' | 'security' | 'cost' | 'alert';
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

const colorStyles = {
  primary: {
    iconBg: 'bg-blue-50 text-primary border-blue-100',
    accentBar: 'bg-primary',
  },
  security: {
    iconBg: 'bg-emerald-50 text-security border-emerald-100',
    accentBar: 'bg-security',
  },
  cost: {
    iconBg: 'bg-amber-50 text-cost border-amber-100',
    accentBar: 'bg-cost',
  },
  alert: {
    iconBg: 'bg-rose-50 text-alert border-rose-100',
    accentBar: 'bg-alert',
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  accentColor = 'primary',
  trend,
}) => {
  const styles = colorStyles[accentColor];

  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Barra de acento superior tenue */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${styles.accentBar}`} />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-text-primary tracking-tight">
            {value}
          </h3>
        </div>

        <div className={`p-3 rounded-xl border ${styles.iconBg} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-text-secondary font-normal truncate">
              {subtitle}
            </span>
          )}
          {trend && (
            <span
              className={`font-semibold ${
                trend.isPositive ? 'text-security' : 'text-alert'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};