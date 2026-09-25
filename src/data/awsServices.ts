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
    architectureRole:
      "Capa de cómputo donde corren las aplicaciones y procesos backend de la solución.",
    keyCapabilities: [
      "Escalado automático según demanda",
      "Múltiples familias de instancia (cómputo, memoria, GPU)",
      "Integración directa con la red virtual (VPC)",
    ],
    docsUrl: "https://docs.aws.amazon.com/ec2/",
  },
  {
    id: "s3",
    name: "S3",
    category: "Almacenamiento",
    description:
      "Almacenamiento de objetos altamente disponible y duradero (Simple Storage Service).",
    mainFunction: "Guardar y servir archivos, backups y contenido estático.",
    status: "Activo",
    architectureRole:
      "Capa de almacenamiento durable para archivos, artefactos y contenido servido a los usuarios.",
    keyCapabilities: [
      "Durabilidad diseñada para 99.99%",
      "Versionado de objetos",
      "Políticas de ciclo de vida para archivado automático",
    ],
    docsUrl: "https://docs.aws.amazon.com/s3/",
  },
  {
    id: "rds",
    name: "RDS",
    category: "Base de datos",
    description:
      "Servicio administrado de bases de datos relacionales (Relational Database Service).",
    mainFunction: "Alojar bases de datos sin gestionar el servidor manualmente.",
    status: "Activo",
    architectureRole:
      "Persistencia relacional administrada para la información transaccional de la solución.",
    keyCapabilities: [
      "Backups automáticos y restauración a un punto en el tiempo",
      "Alta disponibilidad Multi-AZ",
      "Motores administrados (PostgreSQL, MySQL, entre otros)",
    ],
    docsUrl: "https://docs.aws.amazon.com/rds/",
  },
  {
    id: "iam",
    name: "IAM",
    category: "Seguridad e identidad",
    description:
      "Gestión de identidades y accesos (Identity and Access Management).",
    mainFunction: "Controlar quién puede acceder a qué recursos.",
    status: "Activo",
    architectureRole:
      "Capa transversal de seguridad que define permisos sobre todos los demás servicios.",
    keyCapabilities: [
      "Políticas granulares por usuario, grupo o rol",
      "Autenticación multifactor (MFA)",
      "Principio de mínimo privilegio",
    ],
    docsUrl: "https://docs.aws.amazon.com/iam/",
  },
  {
    id: "vpc",
    name: "VPC",
    category: "Redes",
    description:
      "Red virtual privada y aislada dentro de la nube (Virtual Private Cloud).",
    mainFunction: "Definir y aislar la red donde viven los recursos.",
    status: "Activo",
    architectureRole:
      "Perímetro de red que aísla y organiza los recursos internos mediante subredes.",
    keyCapabilities: [
      "Subredes públicas y privadas",
      "Grupos de seguridad como firewall virtual",
      "Tablas de enrutamiento personalizadas",
    ],
    docsUrl: "https://docs.aws.amazon.com/vpc/",
  },
  {
    id: "route53",
    name: "Route 53",
    category: "Redes",
    description: "Servicio de DNS escalable y de alta disponibilidad.",
    mainFunction: "Resolver nombres de dominio hacia los recursos correctos.",
    status: "Activo",
    architectureRole:
      "Punto de entrada que traduce el dominio del usuario hacia la infraestructura correspondiente.",
    keyCapabilities: [
      "Resolución DNS de baja latencia",
      "Verificación de salud (health checks) de endpoints",
      "Enrutamiento por política (geográfico, ponderado, entre otros)",
    ],
    docsUrl: "https://docs.aws.amazon.com/route53/",
  },
  {
    id: "cloudfront",
    name: "CloudFront",
    category: "Redes / Contenido",
    description: "Red de distribución de contenido (CDN) de AWS.",
    mainFunction: "Entregar contenido con baja latencia desde ubicaciones cercanas al usuario.",
    status: "Activo",
    architectureRole:
      "Capa de distribución que acerca el contenido al usuario final antes de llegar a la VPC.",
    keyCapabilities: [
      "Red de ubicaciones de borde (edge locations) global",
      "Cacheo de contenido estático y dinámico",
      "Integración nativa con S3 y balanceadores de carga",
    ],
    docsUrl: "https://docs.aws.amazon.com/cloudfront/",
  },
];