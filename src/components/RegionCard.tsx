import React from 'react';
import type { Region } from '../types/cloud';
import { StatusBadge } from './StatusBadge';
import { awsServices } from '../data/awsServices';
import { MapPin, Server, Radio } from 'lucide-react';

interface RegionCardProps {
  region: Region;
}

export const RegionCard: React.FC<RegionCardProps> = ({ region }) => {
  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 flex-shrink-0">
              <Radio className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-text-primary text-base leading-tight">
                {region.name}
              </h4>
              <div className="flex items-center gap-1 text-xs text-text-secondary mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
                <span>{region.location} · {region.id}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={region.status} size="sm" />
        </div>

        {/* Descripción */}
        <p className="text-xs text-text-secondary leading-relaxed mb-3">
          {region.description}
        </p>

        {/* Lista de Servicios Desplegados */}
        <div className="space-y-2 my-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
            <Server className="w-3.5 h-3.5 text-text-secondary" />
            <span>Servicios Desplegados ({region.deployedServices.length}):</span>
          </div>

          {region.deployedServices.length === 0 ? (
            <p className="text-xs text-text-secondary italic">
              Sin despliegues activos
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {region.deployedServices.map((serviceId) => {
                const service = awsServices.find((s) => s.id === serviceId);
                return (
                  <span
                    key={`${region.id}-svc-${serviceId}`}
                    className="px-2.5 py-1 bg-slate-100 text-text-primary rounded-lg text-xs font-medium border border-slate-200/60"
                  >
                    {service?.name ?? serviceId}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-[11px] text-text-secondary flex items-center justify-between">
        <span>Infraestructura AWS Global</span>
        <span className="font-semibold text-security flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-security animate-ping" />
          Monitoreo activo
        </span>
      </div>
    </div>
  );
};