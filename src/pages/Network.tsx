import React from 'react';
import {
  Globe,
  Route,
  Zap,
  Network as NetworkIcon,
  Server,
  Database,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';

const flowNodes = [
  {
    icon: Globe,
    label: 'Internet',
    description: 'Origen del tráfico de usuarios finales.',
  },
  {
    icon: Route,
    label: 'Route 53',
    description: 'Resolución DNS y enrutamiento de dominio.',
  },
  {
    icon: Zap,
    label: 'CloudFront',
    description: 'CDN: distribución de contenido de baja latencia.',
  },
];

export const Network: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Diagrama de arquitectura */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-bold text-text-primary text-base mb-1">
          Arquitectura de Red
        </h3>
        <p className="text-xs text-text-secondary mb-6">
          Flujo de tráfico desde Internet hasta los recursos internos de la VPC
        </p>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {flowNodes.map((node) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={node.label}>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-text-primary text-sm">{node.label}</p>
                  <p className="text-[11px] text-text-secondary leading-snug">
                    {node.description}
                  </p>
                </div>

                <div className="flex justify-center text-text-secondary">
                  <ArrowRight className="w-5 h-5 hidden md:block" />
                  <ArrowDown className="w-5 h-5 md:hidden" />
                </div>
              </React.Fragment>
            );
          })}

          {/* Contenedor VPC con EC2 y RDS dentro */}
          <div className="flex-[1.6] border-2 border-dashed border-primary/40 rounded-xl p-4 bg-primary/5">
            <div className="flex items-center gap-2 mb-3">
              <NetworkIcon className="w-5 h-5 text-primary" />
              <p className="font-bold text-text-primary text-sm">VPC</p>
              <span className="text-[10px] text-text-secondary">
                (Red Privada Virtual)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-slate-200 rounded-lg p-3 flex flex-col items-center text-center gap-1.5">
                <Server className="w-5 h-5 text-security" />
                <p className="font-bold text-text-primary text-xs">EC2</p>
                <p className="text-[10px] text-text-secondary leading-snug">
                  Instancias de cómputo
                </p>
              </div>
              <div className="bg-card border border-slate-200 rounded-lg p-3 flex flex-col items-center text-center gap-1.5">
                <Database className="w-5 h-5 text-security" />
                <p className="font-bold text-text-primary text-xs">RDS</p>
                <p className="text-[10px] text-text-secondary leading-snug">
                  Base de datos relacional
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explicación conceptual */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <h3 className="font-bold text-text-primary text-base mb-4">
          Componentes de la Arquitectura
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-text-primary mb-1">
              Tráfico Externo
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              El tráfico de Internet es resuelto por Route 53 (DNS) y distribuido
              globalmente por CloudFront antes de llegar a la infraestructura interna,
              reduciendo la latencia percibida por el usuario.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-text-primary mb-1">
              Red Privada (VPC)
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              La VPC aísla los recursos de cómputo (EC2) y base de datos (RDS) del
              resto de Internet, permitiendo control granular de tráfico mediante
              subredes, grupos de seguridad y tablas de enrutamiento.
            </p>
          </div>
        </div>
      </div>

      {/* Desglose de subredes dentro de la VPC */}
      <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            Red Privada Virtual
          </span>
        </div>
        <h3 className="font-bold text-text-primary text-base mb-4">
          Subredes dentro de la VPC
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <NetworkIcon className="w-4 h-4 text-primary" />
              <p className="font-bold text-text-primary text-xs">Subred Pública</p>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Recibe el tráfico entrante desde CloudFront a través de reglas de
              enrutamiento controladas, sin exponer directamente los recursos internos.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-4 h-4 text-security" />
              <p className="font-bold text-text-primary text-xs">Capa de Aplicación</p>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              Las instancias EC2 procesan las solicitudes y pueden escalar
              horizontalmente según la demanda de tráfico.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-cost" />
              <p className="font-bold text-text-primary text-xs">Subred Privada</p>
            </div>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              RDS almacena los datos sin acceso público directo, aislado detrás
              de grupos de seguridad y sin ruta directa a Internet.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
          <span className="w-1.5 h-1.5 rounded-full bg-security" />
          <p className="text-[11px] text-text-secondary">
            Los Security Groups y tablas de rutas privadas protegen la comunicación interna.
          </p>
        </div>
      </div>
    </div>
  );
};