import React from 'react';
import type { CostEstimate } from '../types/cloud';
import { awsServices } from '../data/awsServices';
import { DollarSign, Trash2, Clock, Layers } from 'lucide-react';

interface CostCardProps {
  estimate: CostEstimate;
  onDelete?: (id: string) => void;
}

export const CostCard: React.FC<CostCardProps> = ({ estimate, onDelete }) => {
  const service = awsServices.find((s) => s.id === estimate.serviceId);
  const serviceName = service ? service.name : estimate.serviceId.toUpperCase();

  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-cost">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-text-primary text-sm line-clamp-1">
              {serviceName}
            </h4>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(estimate.id)}
              className="p-1.5 rounded-lg text-text-secondary hover:text-alert hover:bg-rose-50 transition-colors"
              title="Eliminar estimación"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-slate-50 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Layers className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
            <span>Cant: <strong className="text-text-primary">{estimate.quantity}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Clock className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
            <span>Hrs/Mes: <strong className="text-text-primary">{estimate.estimatedHours}</strong></span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase font-semibold text-text-secondary">Costo Mensual</p>
          <p className="text-base font-bold text-cost">${estimate.monthlyCost.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase font-semibold text-text-secondary">Costo Anual</p>
          <p className="text-sm font-semibold text-text-primary">${estimate.annualCost.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};