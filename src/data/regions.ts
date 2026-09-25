import type { Region } from '../types/cloud';

// ============================================
// Catálogo de Infraestructura Global (Módulo 4)
// ============================================
// Datos simulados, sin relación con datos reales de AWS.

export const regions: Region[] = [
  {
    id: 'us-east-1',
    name: 'N. Virginia',
    location: 'Estados Unidos',
    deployedServices: ['ec2', 'rds', 'iam'],
    status: 'Operativo',
    description: 'Región principal de cómputo, con la mayor variedad de servicios activos y bajo tiempo de latencia para cargas críticas.',
  },
  {
    id: 'us-west-2',
    name: 'Oregon',
    location: 'Estados Unidos',
    deployedServices: ['s3', 'cloudfront'],
    status: 'Degradado',
    description: 'Región de respaldo para almacenamiento y distribución de contenido, actualmente bajo revisión por latencia elevada.',
  },
  {
    id: 'sa-east-1',
    name: 'São Paulo',
    location: 'Brasil',
    deployedServices: ['ec2', 'vpc'],
    status: 'Operativo',
    description: 'Cobertura para usuarios de Latinoamérica, con red privada virtual dedicada para aislar tráfico interno.',
  },
  {
    id: 'eu-west-1',
    name: 'Irlanda',
    location: 'Europa',
    deployedServices: ['s3', 'rds', 'route53'],
    status: 'Operativo',
    description: 'Región orientada a cumplimiento GDPR, con enrutamiento DNS gestionado y almacenamiento redundante.',
  },
  {
    id: 'eu-central-1',
    name: 'Fráncfort',
    location: 'Alemania',
    deployedServices: ['iam'],
    status: 'Caído',
    description: 'Región centrada en gestión de identidades, actualmente presentando una interrupción en el servicio.',
  },
  {
    id: 'ap-southeast-1',
    name: 'Singapur',
    location: 'Asia Pacífico',
    deployedServices: ['cloudfront', 'route53', 'vpc'],
    status: 'Operativo',
    description: 'Punto de distribución para Asia-Pacífico, con red de entrega de contenido y enrutamiento de baja latencia.',
  },
  {
    id: 'ap-northeast-1',
    name: 'Tokio',
    location: 'Japón',
    deployedServices: [],
    status: 'Degradado',
    description: 'Región reservada para expansión futura, sin cargas de trabajo desplegadas actualmente.',
  },
];

// ============================================
// Coordenadas geográficas reales (lat/lng) para react-simple-maps
// ============================================

export const regionMapCoords: Record<string, { lat: number; lng: number }> = {
  'us-east-1':      { lat: 38.13, lng: -78.45 },
  'us-west-2':      { lat: 45.84, lng: -119.7 },
  'sa-east-1':      { lat: -23.55, lng: -46.63 },
  'eu-west-1':      { lat: 53.41, lng: -8.24 },
  'eu-central-1':   { lat: 50.11, lng: 8.68 },
  'ap-southeast-1': { lat: 1.35, lng: 103.82 },
  'ap-northeast-1': { lat: 35.68, lng: 139.65 },
};