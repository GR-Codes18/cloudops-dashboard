import type { AWSService } from "../types/cloud";

export const awsServices: AWSService[] = [
  {
    id: "ec2",
    name: "EC2",
    category: "Cómputo",
    description:
      "Servicio de máquinas virtuales escalables en la nube (Elastic Compute Cloud).",
    mainFunction: "Ejecutar servidores virtuales bajo demanda.",
    status: "Activo",
  },
  {
    id: "s3",
    name: "S3",
    category: "Almacenamiento",
    description:
      "Almacenamiento de objetos altamente disponible y duradero (Simple Storage Service).",
    mainFunction: "Guardar y servir archivos, backups y contenido estático.",
    status: "Activo",
  },
  {
    id: "rds",
    name: "RDS",
    category: "Base de datos",
    description:
      "Servicio administrado de bases de datos relacionales (Relational Database Service).",
    mainFunction: "Alojar bases de datos sin gestionar el servidor manualmente.",
    status: "Activo",
  },
  {
    id: "iam",
    name: "IAM",
    category: "Seguridad e identidad",
    description:
      "Gestión de identidades y accesos (Identity and Access Management).",
    mainFunction: "Controlar quién puede acceder a qué recursos.",
    status: "Activo",
  },
  {
    id: "vpc",
    name: "VPC",
    category: "Redes",
    description:
      "Red virtual privada y aislada dentro de la nube (Virtual Private Cloud).",
    mainFunction: "Definir y aislar la red donde viven los recursos.",
    status: "Activo",
  },
  {
    id: "route53",
    name: "Route 53",
    category: "Redes",
    description: "Servicio de DNS escalable y de alta disponibilidad.",
    mainFunction: "Resolver nombres de dominio hacia los recursos correctos.",
    status: "Activo",
  },
  {
    id: "cloudfront",
    name: "CloudFront",
    category: "Redes / Contenido",
    description: "Red de distribución de contenido (CDN) de AWS.",
    mainFunction: "Entregar contenido con baja latencia desde ubicaciones cercanas al usuario.",
    status: "Activo",
  },
];