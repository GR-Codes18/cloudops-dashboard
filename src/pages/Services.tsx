import React, { useState, useMemo } from 'react';
import { awsServices } from '../data/awsServices';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import type { AWSService } from '../types/cloud';

const ALL_CATEGORIES = 'Todos';

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(awsServices.map((s) => s.category)));
    return [ALL_CATEGORIES, ...unique];
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES) return awsServices;
    return awsServices.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isActive
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card text-text-secondary border-border hover:border-primary/40'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredServices.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-8 text-center text-text-secondary text-sm">
          No hay servicios en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      )}

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};