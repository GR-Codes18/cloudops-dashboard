import React from 'react';
import type { SecurityCheck } from '../types/cloud';
import { StatusBadge } from './StatusBadge';
import { ShieldCheck, KeyRound, Lock, FileCheck, ShieldAlert } from 'lucide-react';

interface SecurityCardProps {
  check: SecurityCheck;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  IAM: KeyRound,
  'Protección de cuentas': ShieldCheck,
  'Protección de datos': Lock,
  Cumplimiento: FileCheck,
};

export const SecurityCard: React.FC<SecurityCardProps> = ({ check }) => {
  const IconComponent = categoryIcons[check.category] || ShieldAlert;

  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-security/10 text-security flex-shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                {check.category}
              </span>
              <h4 className="font-bold text-text-primary text-sm leading-tight mt-0.5">
                Verificación de Seguridad
              </h4>
            </div>
          </div>
          <StatusBadge status={check.status} size="sm" />
        </div>

        <p className="text-xs text-text-secondary leading-relaxed my-2">
          {check.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between text-[11px] text-text-secondary font-medium">
        <span>ID Control: <strong className="text-text-primary">{check.id}</strong></span>
      </div>
    </div>
  );
};