import React from 'react';
import type { AWSService } from '../types/cloud';
import { StatusBadge } from './StatusBadge';
import { X, ExternalLink } from 'lucide-react';

interface ServiceDetailModalProps {
  service: AWSService | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
}) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-card rounded-2xl border border-border shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        {/* Encabezado */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Vista Detallada
            </span>

            <h2
              id="service-modal-title"
              className="text-2xl font-bold text-text-primary leading-tight mt-0.5"
            >
              {service.name}
            </h2>

            <p className="text-xs text-text-secondary mt-0.5">
              {service.category}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-secondary hover:bg-slate-100 transition-colors flex-shrink-0"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-3 mb-5">
          <StatusBadge status={service.status} size="sm" />
        </div>

        {/* Contenido en dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-1">
                Descripción
              </p>

              <p className="text-sm text-text-primary leading-relaxed">
                {service.description}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-1">
                Función Principal
              </p>

              <p className="text-sm text-text-primary leading-relaxed">
                {service.mainFunction}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-1">
                Rol en la Arquitectura
              </p>

              <p className="text-sm text-text-primary leading-relaxed">
                {service.architectureRole}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-2">
                Capacidades Clave
              </p>

              <ul className="space-y-1.5">
                {service.keyCapabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-2 text-sm text-text-primary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer: link a documentación */}
        <div className="pt-5 mt-5 border-t border-slate-100">
          <a
            href={service.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            Ver documentación oficial de AWS
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};