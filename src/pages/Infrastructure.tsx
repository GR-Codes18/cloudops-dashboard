import React, { useState } from 'react';
import { regions } from '../data/regions';
import { awsServices } from '../data/awsServices';
import { RegionCard } from '../components/RegionCard';
import { InfrastructureMap } from '../components/InfrastructureMap';
import { StatusBadge } from '../components/StatusBadge';
import { MapPin, Server, Globe2 } from 'lucide-react';
import type { InfrastructureStatus } from '../types/cloud';

const resolveServiceName = (serviceId: string): string => {
  const service = awsServices.find((s) => s.id === serviceId);
  return service?.name ?? serviceId;
};

const statusDotColors: Record<InfrastructureStatus, string> = {
  Operativo: '#16A34A',
  Degradado: '#F59E0B',
  Caído: '#DC2626',
};

export const Infrastructure: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(
    regions[0]?.id ?? null
  );

  const selectedRegion = regions.find((r) => r.id === selectedRegionId);

  // Conteo de regiones por estado, derivado del catálogo (sin datos inventados)
  const statusCounts = regions.reduce<Record<InfrastructureStatus, number>>(
    (acc, region) => {
      acc[region.status] = (acc[region.status] ?? 0) + 1;
      return acc;
    },
    { Operativo: 0, Degradado: 0, Caído: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Mapa + Panel lateral (resumen + detalle) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InfrastructureMap
            regions={regions}
            selectedRegionId={selectedRegionId}
            onSelectRegion={setSelectedRegionId}
          />
        </div>

        <div className="flex flex-col gap-6">
          {/* Tarjeta de resumen: regiones disponibles */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-semibold">
                  Regiones Disponibles
                </p>
                <p className="text-2xl font-bold text-text-primary leading-tight">
                  {regions.length}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              {(Object.keys(statusCounts) as InfrastructureStatus[]).map((status) => (
                <div key={status} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-text-secondary">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: statusDotColors[status] }}
                    />
                    {status}
                  </div>
                  <span className="font-semibold text-text-primary">
                    {statusCounts[status]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de detalle de la región seleccionada */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            {selectedRegion ? (
              <>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-text-primary text-base leading-tight">
                      {selectedRegion.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-text-secondary mt-0.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{selectedRegion.location} · {selectedRegion.id}</span>
                    </div>
                  </div>
                  <StatusBadge status={selectedRegion.status} size="sm" />
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  {selectedRegion.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
                    <Server className="w-3.5 h-3.5" />
                    <span>
                      Servicios Desplegados ({selectedRegion.deployedServices.length}):
                    </span>
                  </div>

                  {selectedRegion.deployedServices.length === 0 ? (
                    <p className="text-xs text-text-secondary italic">
                      Sin despliegues activos
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRegion.deployedServices.map((serviceId) => (
                        <span
                          key={serviceId}
                          className="px-2.5 py-1 bg-slate-100 text-text-primary rounded-lg text-xs font-medium border border-slate-200/60"
                        >
                          {resolveServiceName(serviceId)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 text-[11px] text-text-secondary">
                  Selecciona otro punto en el mapa para ver su detalle.
                </div>
              </>
            ) : (
              <p className="text-xs text-text-secondary">
                Selecciona una región en el mapa para ver su detalle.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Grid de tarjetas por región */}
      {regions.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-8 text-center text-text-secondary text-sm">
          No hay regiones registradas.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {regions.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>
      )}
    </div>
  );
};