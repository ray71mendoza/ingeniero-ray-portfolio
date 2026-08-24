<div align="center">

<!-- HEADER BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,10,20,30&height=180&section=header&text=Portafolio%20Profesional%20—%20Ingeniero%20RAY&fontSize=32&desc=Senior%20Software%20Architect%20%7C%20Angular%2020+%20%7C%20High-Performance%20Web%20Platform&descSize=15&fontColor=ffffff" alt="Portafolio Ray Banner" width="100%"/>

<!-- BADGES -->
[![Status](https://img.shields.io/badge/STATUS-PRODUCTION--READY-00E676?style=for-the-badge&logo=statuspage&logoColor=white)](https://ingeniero-ray.vercel.app)
[![Version](https://img.shields.io/badge/VERSION-1.0.0-00F2FE?style=for-the-badge&logo=semver&logoColor=white)](https://github.com/ray71mendoza/ingeniero-ray-portfolio)
[![Angular](https://img.shields.io/badge/ANGULAR-20+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TAILWIND_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/DEPLOY-VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/LICENSE-MIT-F59E0B?style=for-the-badge&logo=open-source-initiative&logoColor=white)](LICENSE)

<br/>

**Plataforma web de marca personal y escaparate tecnológico de alto rendimiento**, concebida bajo estándares de ingeniería de software enterprise. Implementa una arquitectura moderna basada en **Angular 20+**, reactividad declarativa con **Signals**, componentes *Standalone*, animaciones fluidas con **GSAP** y el sistema de diseño *"Cyber Luxury"* con soporte completo para temas Dark/Light y optimización SEO integral.

[🌐 Demo en Vivo](https://ingeniero-ray.vercel.app) • [📑 Reportar Bug](https://github.com/ray71mendoza/ingeniero-ray-portfolio/issues) • [✨ Solicitar Feature](https://github.com/ray71mendoza/ingeniero-ray-portfolio/issues)

</div>

---

## 🛠️ Stack Tecnológico

<div align="center">
  <img src="https://skillicons.dev/icons?i=angular,ts,tailwind,sass,html,css,js,git,github,vercel,vscode,postman" alt="Tech Stack Icons" />
</div>

<br/>

| Capa / Dominio | Tecnologías & Librerías |
| :--- | :--- |
| **Core Framework** | Angular 20+, Standalone Components, Signal Store, Zoneless Ready |
| **Lenguaje** | TypeScript 5.9 (Modo Estricto / Strict Type-Checking) |
| **Diseño & Estilos** | Tailwind CSS v3, SCSS, CSS Custom Properties, Glassmorphism UI |
| **Animaciones & UI FX** | GSAP 3, Typed.js, Swiper, CountUp.js, Lucide Icons Angular |
| **Servicios & APIs** | GitHub REST API v3, EmailJS Integration, Reactive Forms |
| **Arquitectura & Estado** | Clean Architecture (Core/Features/Shared), Angular Signals |
| **SEO & Rendimiento** | Open Graph, Twitter Cards, Schema.org JSON-LD, SPA Routing Vercel |

---

## 🚀 Características y Módulos del Sistema

| Módulo / Funcionalidad | Descripción Detallada | Estado |
| :--- | :--- | :---: |
| **Hero High-Impact** | Presentación interactiva con tipografía dinámica (Typed.js), métricas flotantes en tiempo real y llamadas a la acción (CTAs) de alta conversión. | ✅ |
| **About & Core Values** | Pestañas interactivas con desglose de especialidades, filosofía de ingeniería, valores y soft skills. | ✅ |
| **Experience Timeline** | Línea de tiempo vertical interactiva con animaciones de scroll impulsadas por IntersectionObserver y GSAP. | ✅ |
| **Projects Showcase** | Catálogo de proyectos con tarjetas 3D Tilt interactivas, filtros por categorías, buscador reactivo y modal de detalle extendido. | ✅ |
| **GitHub Live Integration** | Conexión en tiempo real con la API REST de GitHub para sincronizar repositorios, estrellas, forks y estadísticas de actividad. | ✅ |
| **Interactive Tech Stack** | Matriz de habilidades técnicas (25+ tecnologías) con categorización dinámica, tooltips e interacción hover 3D. | ✅ |
| **Services & Value Proposition** | Módulo de servicios profesionales orientado a soluciones empresariales, arquitectura frontend y consultoría técnica. | ✅ |
| **Certifications & Accreditations** | Galería de certificaciones y credenciales verificadas con previsualización en modal. | ✅ |
| **Contact Hub & Lead Capture** | Formulario reactivo validado con integración a EmailJS, soporte directo de WhatsApp y mapa interactivo. | ✅ |
| **Adaptive Theme Engine** | Alternador de temas *Deep Cyber Obsidian* (Dark) y *Pearl Snow* (Light) persistido en `localStorage`. | ✅ |
| **SEO & Accessibility (a11y)** | Cumplimiento de directrices WCAG AA, skip navigation, meta tags Open Graph dinámicos y marcado JSON-LD. | ✅ |

---

## 🏛️ Arquitectura del Proyecto

Estructura modular orientada al dominio (*Domain-Driven / Feature-Based Architecture*):

```text
portafolio-ray/
├── public/                    # Recursos estáticos globales, favicons y manifest
├── src/
│   ├── app/
│   │   ├── core/              # Lógica transversal, servicios singleton y estado
│   │   │   ├── services/      # ThemeService, GithubService, ContactService, SeoService
│   │   │   └── state/         # Signal Store / Manejadores de estado reactivo
│   │   ├── features/          # Módulos de funcionalidad independientes
│   │   │   ├── about/         # Módulo sobre mí y pestañas de perfil
│   │   │   ├── certifications/# Módulo de credenciales y títulos
│   │   │   ├── contact/       # Formulario reactivo y canales de contacto
│   │   │   ├── experience/    # Timeline de trayectoria profesional
│   │   │   ├── github/        # Consumo de GitHub REST API
│   │   │   ├── hero/          # Vista principal e introducción dinámica
│   │   │   ├── projects/      # Grilla de proyectos, filtros y modales
│   │   │   ├── services/      # Catálogo de servicios técnicos
│   │   │   └── tech-stack/    # Radar y matriz interactiva de tecnologías
│   │   ├── layouts/           # Estructuras visuales maestras (Header, Footer, Main)
│   │   ├── models/            # Interfaces, tipos de datos y contratos TypeScript
│   │   ├── pages/             # Vistas enrutadas de nivel superior
│   │   └── shared/            # Componentes reutilizables, directivas y pipes
│   ├── styles.scss            # Configuración global de estilos y temas
│   ├── index.html             # Punto de entrada HTML con SEO pre-renderizado
│   └── main.ts                # Bootstrap de la aplicación Angular Standalone
├── angular.json               # Configuración de compilación de Angular CLI
├── tailwind.config.js         # Tokens de diseño, paleta personalizada y plugins
├── tsconfig.json              # Configuración del compilador TypeScript
└── vercel.json                # Configuración de redirecciones y SPA Routing
```

---

## ⚡ Puesta en Marcha e Instalación

Sigue estos pasos para desplegar y ejecutar el proyecto en tu entorno local:

### 1. Prerrequisitos
- **Node.js**: `v20.x` o superior
- **npm**: `v10.x` o superior
- **Angular CLI** (opcional para desarrollo global): `npm i -g @angular/cli`

### 2. Clonación del Repositorio
```bash
git clone https://github.com/ray71mendoza/ingeniero-ray-portfolio.git
cd ingeniero-ray-portfolio
```

### 3. Instalación de Dependencias
```bash
npm install
```

### 4. Variables de Entorno (Opcional)
Si deseas conectar los envíos de formulario a tu propia cuenta de EmailJS, configura tus credenciales en el servicio correspondiente o en `src/environments/`:
```env
EMAILJS_SERVICE_ID=tu_service_id
EMAILJS_TEMPLATE_ID=tu_template_id
EMAILJS_PUBLIC_KEY=tu_public_key
```

### 5. Ejecución en Desarrollo
```bash
npm run start
```
> La aplicación estará disponible en `http://localhost:4200/` con recarga en caliente (*Hot Module Replacement*).

### 6. Compilación para Producción
```bash
npm run build
```
Los artefactos optimizados se generarán en la carpeta `dist/portafolio-app/browser`.

---

## 🌐 Integraciones y Uso Principal

### Consumo de GitHub REST API
El servicio `GithubService` consulta dinámicamente los repositorios públicos y métricas del perfil mediante peticiones seguras a:
```http
GET https://api.github.com/users/ray71mendoza/repos?sort=updated&per_page=6
```

### Enrutamiento y Despliegue en Vercel
El archivo `vercel.json` garantiza la correcta resolución de rutas para aplicaciones de una sola página (SPA):
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

---

## 📄 Licencia y Créditos

Este proyecto está distribuido bajo la licencia **MIT**. Para más información, consulta el archivo [LICENSE](LICENSE).

<div align="center">

Diseñado y desarrollado por **Ingeniero RAY**  
*Senior Software Architect & Full Stack Engineer*

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=flat-square&logo=github)](https://github.com/ray71mendoza)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00F2FE?style=flat-square&logo=googlechrome&logoColor=white)](https://ingeniero-ray.vercel.app)

</div>
