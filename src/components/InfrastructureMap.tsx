import React from 'react';
import type { Region, InfrastructureStatus } from '../types/cloud';

interface InfrastructureMapProps {
  regions: Region[];
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
}

// Coordenadas x/y en porcentaje (0-100) sobre el viewBox del mapa,
// aproximadas visualmente, no geográficamente exactas.
const mapCoords: Record<string, { x: number; y: number }> = {
  'us-east-1':      { x: 22, y: 36 },
  'us-west-2':      { x: 14, y: 33 },
  'sa-east-1':      { x: 32, y: 68 },
  'eu-west-1':      { x: 47, y: 27 },
  'eu-central-1':   { x: 51, y: 29 },
  'ap-southeast-1': { x: 78, y: 58 },
  'ap-northeast-1': { x: 86, y: 35 },
};

const statusColors: Record<InfrastructureStatus, string> = {
  Operativo: '#16A34A',
  Degradado: '#F59E0B',
  Caído: '#DC2626',
};

export const InfrastructureMap: React.FC<InfrastructureMapProps> = ({
  regions,
  selectedRegionId,
  onSelectRegion,
}) => {
  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
      <h3 className="font-bold text-text-primary text-base mb-4">
        Mapa de Infraestructura Global
      </h3>

      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        role="img"
        aria-label="Mapa de regiones AWS y su estado"
      >
        <g fill="#E2E8F0" opacity={0.6}>
          <rect x={120} y={150} width={220} height={160} rx={30} />
          <rect x={260} y={320} width={110} height={160} rx={25} />
          <rect x={480} y={120} width={200} height={140} rx={25} />
          <rect x={480} y={140} width={140} height={220} rx={25} />
          <rect x={620} y={140} width={280} height={200} rx={30} />
          <rect x={780} y={320} width={140} height={110} rx={25} />
        </g>

        {regions.map((region) => {
          const coords = mapCoords[region.id];
          if (!coords) return null;

          const cx = (coords.x / 100) * 1000;
          const cy = (coords.y / 100) * 500;
          const color = statusColors[region.status];
          const isSelected = region.id === selectedRegionId;

          return (
            <g
              key={region.id}
              onClick={() => onSelectRegion(region.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 12 : 9}
                fill={color}
                stroke="#FFFFFF"
                strokeWidth={isSelected ? 3 : 1.5}
              >
                <title>{`${region.name} · ${region.status}`}</title>
              </circle>
              <text
                x={cx}
                y={cy + 24}
                textAnchor="middle"
                fontSize={13}
                fontWeight={isSelected ? 700 : 600}
                fill="#1E293B"
                style={{ pointerEvents: 'none' }}
              >
                {region.name}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-100">
        {(Object.keys(statusColors) as InfrastructureStatus[]).map((status) => (
          <div key={status} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: statusColors[status] }}
            />
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};