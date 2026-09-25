import React from 'react';
import { securityChecks } from '../data/securityChecks';
import { SecurityCard } from '../components/SecurityCard';
import { Cloud, Building2 } from 'lucide-react';

const awsResponsibilities = [
  'Seguridad física de los centros de datos',
  'Infraestructura de red y virtualización',
  'Disponibilidad del hardware subyacente',
  'Parcheo del hipervisor y servicios gestionados',
];

const clientResponsibilities = [
  'Configuración de IAM, usuarios y permisos',
  'Cifrado de datos en tránsito y en reposo',
  'Configuración de grupos de seguridad y firewalls',
  'Gestión de parches en sistemas operativos propios',
];

export const Security: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Modelo de Responsabilidad Compartida */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-text-primary text-base">
              Responsabilidad de AWS
            </h3>
          </div>
          <ul className="space-y-2.5">
            {awsResponsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-security/10 text-security rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-text-primary text-base">
              Responsabilidad del Cliente
            </h3>
          </div>
          <ul className="space-y-2.5">
            {clientResponsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-security mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid de verificaciones de seguridad */}
      <div>
        <h3 className="font-bold text-text-primary text-base mb-4">
          Verificaciones de IAM, Cuentas, Datos y Cumplimiento
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {securityChecks.map((check) => (
            <SecurityCard key={check.id} check={check} />
          ))}
        </div>
      </div>
    </div>
  );
};