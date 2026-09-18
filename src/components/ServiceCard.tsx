import React from 'react';
import type { AWSService } from '../types/cloud';
import { StatusBadge } from './StatusBadge';
import { Server, Shield, Database, HardDrive, Globe, Network, Cpu } from 'lucide-react';

interface ServiceCardProps {
  service: AWSService;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ec2: Cpu,
  s3: HardDrive,
  rds: Database,
  iam: Shield,
  vpc: Network,
  route53: Globe,
  cloudfront: Server,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = iconMap[service.id] || Server;

  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-text-primary text-base leading-tight">
                {service.name}
              </h4>
              <span className="text-xs font-medium text-text-secondary">
                {service.category}
              </span>
            </div>
          </div>
          <StatusBadge status={service.status} size="sm" />
        </div>

        <p className="text-xs text-text-secondary mb-4 line-clamp-2">
          {service.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 bg-slate-50/50 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
        <p className="text-[11px] font-medium text-text-secondary">
          <strong className="text-text-primary font-semibold">Función principal:</strong>{' '}
          {service.mainFunction}
        </p>
      </div>
    </div>
  );
};