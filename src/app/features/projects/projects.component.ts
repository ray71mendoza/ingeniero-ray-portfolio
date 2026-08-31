import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, FolderGit2, Search, ExternalLink, Github, Eye, X, Sparkles, Layers, CheckCircle2, Shield, Maximize2, Monitor } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { Project } from '../../models/portfolio.models';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, GlassCardComponent, TiltDirective],
  template: `
    <section id="projects" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan">
            <lucide-icon [img]="FolderIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>{{ ts.t().projects.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ ts.t().projects.title }} <span class="text-gradient-cyan">{{ ts.t().projects.titleAccent }}</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {{ ts.t().projects.subtitle }}
          </p>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          <!-- Category Filter Pills -->
          <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
            @for (cat of categories(); track cat.id) {
              <button 
                (click)="selectedCategoryId.set(cat.id)"
                class="px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300"
                [class.bg-gradient-to-r]="selectedCategoryId() === cat.id"
                [class.from-neon-cyan]="selectedCategoryId() === cat.id"
                [class.to-neon-purple]="selectedCategoryId() === cat.id"
                [class.text-gray-950]="selectedCategoryId() === cat.id"
                [class.font-bold]="selectedCategoryId() === cat.id"
                [class.shadow-[0_0_15px_rgba(0,242,254,0.3)]]="selectedCategoryId() === cat.id"
                [class.glass-panel]="selectedCategoryId() !== cat.id"
                [class.text-gray-400]="selectedCategoryId() !== cat.id">
                {{ cat.label }}
              </button>
            }
          </div>

          <!-- Search Input Bar -->
          <div class="relative w-full md:w-80">
            <input 
              type="text"
              [(ngModel)]="searchQuery"
              [placeholder]="ts.t().projects.searchPlaceholder"
              class="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel border border-cyber-border-dark text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-colors" />
            <lucide-icon [img]="SearchIcon" class="w-4 h-4 text-gray-400 absolute left-3.5 top-3"></lucide-icon>
          </div>

        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (proj of filteredProjects(); track proj.id) {
            
            <div appTilt [maxTilt]="8" class="h-full cursor-pointer" (click)="openProjectModal(proj)">
              <app-glass-card className="h-full flex flex-col justify-between space-y-4 group border border-cyber-border-dark hover:border-neon-cyan/50 transition-all duration-300 bg-cyber-dark/85">
                
                <!-- Project Image Preview -->
                <div class="relative h-52 rounded-xl overflow-hidden bg-cyber-dark border border-cyber-border-dark/60 group/img">
                  <img 
                    [src]="proj.imageUrl" 
                    [alt]="proj.title" 
                    class="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500" />
                  
                  <div class="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-70"></div>
                  
                  <!-- Category Tag -->
                  <div class="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyber-dark/90 backdrop-blur-md border border-neon-cyan/30 text-[10px] font-mono text-neon-cyan shadow-md">
                    {{ proj.category }}
                  </div>

                  <!-- Hover Action Overlay -->
                  <div class="absolute inset-0 bg-cyber-dark/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                    <span class="px-4 py-2 rounded-xl bg-neon-cyan text-gray-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg transform group-hover:scale-105 transition-transform">
                      <lucide-icon [img]="EyeIcon" class="w-4 h-4"></lucide-icon>
                      <span>{{ ts.t().projects.btnViewDetails }}</span>
                    </span>
                  </div>
                </div>

                <!-- Content Info -->
                <div class="space-y-3 flex-1">
                  <h3 class="text-xl font-bold text-gray-100 group-hover:text-neon-cyan transition-colors flex items-center justify-between">
                    <span>{{ proj.title }}</span>
                  </h3>
                  <p class="text-xs text-gray-300 leading-relaxed line-clamp-3">
                    {{ ts.currentLang() === 'es' ? proj.descriptionEs : proj.descriptionEn }}
                  </p>
                </div>

                <!-- Technologies Badges -->
                <div class="flex flex-wrap gap-1.5 pt-2">
                  @for (tech of proj.technologies; track tech) {
                    <span class="px-2 py-0.5 rounded bg-cyber-dark border border-cyber-border-dark text-[10px] font-mono text-gray-300">
                      {{ tech }}
                    </span>
                  }
                </div>

                <!-- Footer Action Bar -->
                <div class="pt-4 border-t border-cyber-border-dark flex items-center justify-between">
                  <span class="text-xs font-mono text-neon-cyan group-hover:underline flex items-center gap-1.5 font-semibold">
                    <lucide-icon [img]="EyeIcon" class="w-3.5 h-3.5"></lucide-icon>
                    <span>{{ ts.t().projects.btnViewDetails }}</span>
                  </span>

                  <span class="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                    <lucide-icon [img]="MonitorIcon" class="w-3.5 h-3.5 text-neon-purple"></lucide-icon>
                    <span>UI Preview</span>
                  </span>
                </div>

              </app-glass-card>
            </div>

          }
        </div>

        <!-- Project Detail Modal (Shows Full Interface Screenshot) -->
        @if (selectedModalProject()) {
          <div class="fixed inset-0 z-50 bg-cyber-dark/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" (click)="selectedModalProject.set(null)">
            <div 
              class="max-w-4xl w-full glass-panel border border-neon-cyan/40 p-6 sm:p-8 rounded-3xl space-y-6 animate-in fade-in zoom-in duration-300 relative max-h-[92vh] overflow-y-auto bg-cyber-dark/95 shadow-2xl" 
              (click)="$event.stopPropagation()">
              
              <!-- Close Button -->
              <button 
                (click)="selectedModalProject.set(null)" 
                class="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all z-10">
                <lucide-icon [img]="XIcon" class="w-5 h-5"></lucide-icon>
              </button>

              <!-- Modal Header -->
              <div class="space-y-2 pr-10">
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                    {{ selectedModalProject()?.category }}
                  </span>
                  <span class="px-3 py-1 rounded-full text-xs font-mono bg-neon-purple/10 text-neon-purple border border-neon-purple/30 flex items-center gap-1">
                    <lucide-icon [img]="MonitorIcon" class="w-3 h-3"></lucide-icon>
                    {{ ts.currentLang() === 'es' ? 'Interfaz Oficial del Proyecto' : 'Official Project UI' }}
                  </span>
                </div>
                <h3 class="text-2xl sm:text-4xl font-extrabold text-gray-100">
                  {{ selectedModalProject()?.title }}
                </h3>
              </div>

              <!-- Full Project Interface Frame -->
              <div class="rounded-2xl overflow-hidden border-2 border-cyber-border-dark group relative bg-cyber-dark shadow-2xl">
                <!-- Browser Mockup Bar -->
                <div class="bg-cyber-dark/90 px-4 py-2 border-b border-cyber-border-dark flex items-center justify-between">
                  <div class="flex items-center gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                    <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <span class="text-[11px] font-mono text-gray-400 truncate max-w-xs">
                    {{ selectedModalProject()?.title }} — Preview
                  </span>
                  <a 
                    [href]="selectedModalProject()?.imageUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Ver imagen en tamaño completo"
                    class="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1">
                    <lucide-icon [img]="MaximizeIcon" class="w-3.5 h-3.5"></lucide-icon>
                    <span class="hidden sm:inline">{{ ts.currentLang() === 'es' ? 'Ampliar' : 'Enlarge' }}</span>
                  </a>
                </div>

                <!-- High-Res Interface Image -->
                <img 
                  [src]="selectedModalProject()?.imageUrl" 
                  [alt]="selectedModalProject()?.title" 
                  class="w-full max-h-[500px] object-contain object-top bg-black/40" />
              </div>

              <!-- Project Detailed Description -->
              <div class="space-y-2">
                <h4 class="text-xs font-mono uppercase text-neon-cyan tracking-wider font-bold">
                  {{ ts.currentLang() === 'es' ? 'Descripción Arquitectónica & Funcional' : 'Architectural & Functional Description' }}
                </h4>
                <p class="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line text-justify">
                  {{ ts.currentLang() === 'es' 
                    ? (selectedModalProject()?.longDescriptionEs || selectedModalProject()?.descriptionEs)
                    : (selectedModalProject()?.longDescriptionEn || selectedModalProject()?.descriptionEn) }}
                </p>
              </div>

              <!-- Technologies List -->
              <div class="space-y-2 pt-2 border-t border-cyber-border-dark">
                <h4 class="text-xs font-mono uppercase text-gray-400 font-bold">
                  {{ ts.t().projects.techLabel }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  @for (tech of selectedModalProject()?.technologies; track tech) {
                    <span class="px-3 py-1 rounded-lg bg-cyber-dark border border-cyber-border-dark text-xs font-mono text-neon-cyan">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>

              <!-- Metrics -->
              @if (selectedModalProject()?.metrics) {
                <div class="grid grid-cols-2 gap-3 pt-2">
                  @for (metric of selectedModalProject()?.metrics; track metric.value) {
                    <div class="p-3.5 rounded-xl bg-cyber-dark border border-cyber-border-dark">
                      <div class="text-lg font-bold text-neon-cyan font-mono">{{ metric.value }}</div>
                      <div class="text-[11px] text-gray-400 font-mono uppercase">
                        {{ ts.currentLang() === 'es' ? metric.labelEs : metric.labelEn }}
                      </div>
                    </div>
                  }
                </div>
              }

              <!-- Action Buttons -->
              <div class="flex items-center justify-between pt-4 border-t border-cyber-border-dark">
                <a 
                  [href]="selectedModalProject()?.imageUrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-5 py-2.5 rounded-xl glass-panel border border-neon-cyan/40 text-neon-cyan text-xs font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                  <lucide-icon [img]="MaximizeIcon" class="w-4 h-4"></lucide-icon>
                  <span>{{ ts.currentLang() === 'es' ? 'Abrir Imagen Completa' : 'Open Full Image' }}</span>
                </a>

                <button 
                  (click)="selectedModalProject.set(null)" 
                  class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-gray-950 text-xs font-extrabold shadow-md hover:scale-105 transition-transform">
                  {{ ts.currentLang() === 'es' ? 'Cerrar' : 'Close' }}
                </button>
              </div>

            </div>
          </div>
        }

      </div>
    </section>
  `
})
export class ProjectsComponent {
  ts = inject(TranslationService);

  readonly FolderIcon = FolderGit2;
  readonly SearchIcon = Search;
  readonly ExternalIcon = ExternalLink;
  readonly GithubIcon = Github;
  readonly EyeIcon = Eye;
  readonly XIcon = X;
  readonly MaximizeIcon = Maximize2;
  readonly MonitorIcon = Monitor;

  selectedCategoryId = signal<string>('all');
  searchQuery = signal<string>('');
  selectedModalProject = signal<Project | null>(null);

  categories = computed(() => {
    const isEs = this.ts.currentLang() === 'es';
    return [
      { id: 'all', label: isEs ? 'Todos' : 'All' },
      { id: 'Fullstack', label: 'Fullstack' },
      { id: 'Frontend', label: 'Frontend' },
      { id: 'Architecture', label: isEs ? 'Arquitectura' : 'Architecture' },
      { id: 'FinTech', label: 'FinTech' },
      { id: 'Enterprise', label: 'Enterprise' }
    ];
  });

  readonly projectsList: Project[] = [
    {
      id: 'vertex-crm-pro',
      title: 'Vertex CRM PRO',
      category: 'Fullstack',
      descriptionEs: 'Sistema CRM profesional para gestión de leads, propuestas comerciales, chat en tiempo real y análisis de conversión.',
      descriptionEn: 'Professional SaaS CRM platform for sales, commercial proposals, real-time chat, invoicing, and conversion analytics.',
      longDescriptionEs: 'Plataforma SaaS empresarial completa para automatización de ventas, emisión de propuestas comerciales, control de cotizaciones, chat operativo en tiempo real mediante WebSockets/Pusher y analítica interactiva de conversión con Chart.js.',
      longDescriptionEn: 'Full-featured enterprise SaaS CRM designed for sales automation, commercial proposal generation, real-time chat powered by WebSockets/Pusher, and conversion pipeline analytics with Chart.js.',
      technologies: ['React 18', 'Vite 5', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'Tailwind CSS', 'Chart.js', 'JWT', 'Zod'],
      imageUrl: 'assets/images/projects/vertex-crm-pro.jpeg',
      githubUrl: 'https://github.com',
      featured: true,
      metrics: [
        { labelEs: 'Versión', labelEn: 'Version', value: 'v2.0.0' },
        { labelEs: 'Estado', labelEn: 'Status', value: 'Production Ready' }
      ]
    },
    {
      id: 'vertex-sprint',
      title: 'Vertex SPRINT',
      category: 'Frontend',
      descriptionEs: 'Espacio de trabajo para gestión ágil de proyectos y ciclos de vida Scrum empresarial.',
      descriptionEn: 'Enterprise agile lifecycle workspace & Scrum project management platform.',
      longDescriptionEs: 'Herramienta integral para gestión de sprints, tableros Kanban interactivos, backlog grooming, estimaciones de historias de usuario y seguimiento de velocidad de equipo con animaciones fluidas en Framer Motion y Tailwind CSS.',
      longDescriptionEn: 'Comprehensive agile workspace featuring interactive Kanban boards, sprint lifecycle management, backlog grooming, user story estimation, and team velocity metrics built with React, TypeScript, and Framer Motion.',
      technologies: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
      imageUrl: 'assets/images/projects/vertex-sprint.jpeg',
      githubUrl: 'https://github.com',
      featured: true,
      metrics: [
        { labelEs: 'Metodología', labelEn: 'Methodology', value: 'Scrum / Agile' },
        { labelEs: 'Estado', labelEn: 'Status', value: 'Production Ready' }
      ]
    },
    {
      id: 'vertex-nexo',
      title: 'Vertex Nexo',
      category: 'Architecture',
      descriptionEs: 'Sistema de Gestión Documental y Archivo Electrónico Enterprise con arquitectura monorepo Turborepo.',
      descriptionEn: 'Enterprise electronic document management & archiving system with Turborepo monorepo architecture.',
      longDescriptionEs: 'Solución corporativa de archivo electrónico y gestión documental con arquitectura de microservicios en Turborepo, backend en NestJS 11, persistencia relacional PostgreSQL, control de versiones de documentos y cumplimiento de estándares de seguridad y retención.',
      longDescriptionEn: 'Corporate electronic document management and archiving system powered by NestJS 11, Turborepo monorepo architecture, Docker containerization, PostgreSQL persistence, and strict compliance and retention controls.',
      technologies: ['TypeScript', 'NestJS 11', 'Turborepo', 'Docker', 'PostgreSQL', 'REST APIs'],
      imageUrl: 'assets/images/projects/vertex-nexo.jpeg',
      githubUrl: 'https://github.com',
      featured: true,
      metrics: [
        { labelEs: 'Arquitectura', labelEn: 'Architecture', value: 'Turborepo Monorepo' },
        { labelEs: 'Backend Core', labelEn: 'Backend Core', value: 'NestJS 11' }
      ]
    },
    {
      id: 'vertex-enterprise-suite',
      title: 'Suite de Vertex (Enterprise Suite)',
      category: 'Enterprise',
      descriptionEs: 'Plataforma SaaS empresarial modular con Single Sign-On (SSO) y hub centralizado de aplicaciones corporativas.',
      descriptionEn: 'Centralized enterprise SaaS hub and modular SSO application suite for corporate environments.',
      longDescriptionEs: 'Hub centralizado de aplicaciones empresariales modular con Single Sign-On (SSO), autenticación centralizada JWT, control de roles de usuario (RBAC), registro de auditoría y micro-frontends integrados para el ecosistema de productos Vertex.',
      longDescriptionEn: 'Centralized corporate application hub featuring Single Sign-On (SSO), centralized JWT authentication, Role-Based Access Control (RBAC), comprehensive audit trails, and modular enterprise SaaS integration.',
      technologies: ['React 18', 'Node.js 18+', 'Express', 'PostgreSQL 15+', 'Tailwind CSS', 'Vite', 'JWT'],
      imageUrl: 'assets/images/projects/vertex-enterprise-suite.jpeg',
      githubUrl: 'https://github.com',
      featured: true,
      metrics: [
        { labelEs: 'Seguridad', labelEn: 'Security', value: 'SSO & RBAC' },
        { labelEs: 'Estado', labelEn: 'Status', value: 'Production Ready' }
      ]
    },
    {
      id: 'suite-financiera-vertex',
      title: 'Suite Financiera de Vertex',
      category: 'FinTech',
      descriptionEs: 'Sistema de facturación y contabilidad para Colombia con contabilidad de partida doble e integración DIAN UBL 2.1 simulada.',
      descriptionEn: 'Financial management, double-entry bookkeeping, and simulated DIAN UBL 2.1 electronic invoicing system for Colombian SMBs.',
      longDescriptionEs: 'Prototipo ejecutable de nivel empresarial para gestión financiera, contabilidad de partida doble con PUC colombiano, conciliación bancaria, generación de balances financieros e integración electrónica de facturas con validación de XML/DIAN UBL 2.1.',
      longDescriptionEn: 'Production-grade financial engine for SMBs featuring double-entry bookkeeping, Colombian accounting standards (PUC), bank reconciliation, balance sheet generation, and simulated DIAN UBL 2.1 electronic invoice processing.',
      technologies: ['Spring Boot 3.3', 'Java 21', 'React 18', 'TypeScript', 'PostgreSQL 16', 'Flyway', 'Docker', 'Swagger UI'],
      imageUrl: 'assets/images/projects/suite-financiera-vertex.jpeg',
      githubUrl: 'https://github.com',
      featured: true,
      metrics: [
        { labelEs: 'Stack Core', labelEn: 'Core Stack', value: 'Java 21 + Spring Boot' },
        { labelEs: 'Estándar', labelEn: 'Standard', value: 'DIAN UBL 2.1 / PUC' }
      ]
    },
    {
      id: 'food-core',
      title: 'Food Core (Restaurante)',
      category: 'Fullstack',
      descriptionEs: 'Plataforma integral de gestión gastronómica: POS, facturación, Kitchen Display System (KDS) y Machine Learning.',
      descriptionEn: 'End-to-end restaurant management platform: POS, billing, real-time Kitchen Display System (KDS), and Machine Learning.',
      longDescriptionEs: 'Sistema integral gastronómico para restaurantes y dark kitchens. Incluye Point of Sale (POS) con facturación, Kitchen Management (KDS) en tiempo real con temporizadores de urgencia, portal de meseros, menú digital interactivo con tokens QR y módulo de predicción de demanda mediante algoritmos de Machine Learning (Weka).',
      longDescriptionEn: 'Full-scale restaurant management ecosystem featuring POS billing, real-time Kitchen Display System (KDS) with urgency timers, waiter ordering portal, digital QR menu, and demand forecasting powered by Machine Learning (Weka).',
      technologies: ['React', 'Java / Spring Boot', 'Maven', 'Recharts', 'Docker', 'QR Code', 'Weka ML'],
      imageUrl: 'assets/images/projects/food-core.jpeg',
      githubUrl: 'https://github.com',
      featured: true,
      metrics: [
        { labelEs: 'Módulo ML', labelEn: 'ML Module', value: 'Predicción de Demanda' },
        { labelEs: 'Tiempo Real', labelEn: 'Real-time', value: 'KDS & Meseros' }
      ]
    },
    {
      id: 'petcare',
      title: 'PetCare (Veterinaria)',
      category: 'Fullstack',
      descriptionEs: 'Sistema integral de gestión veterinaria, cuidado de mascotas, adopción, historias clínicas y e-commerce.',
      descriptionEn: 'Comprehensive pet care and veterinary clinic management system: clinical records, appointments, pet adoption, and e-commerce.',
      longDescriptionEs: 'Aplicación web full-stack integral diseñada para clínicas veterinarias, adopción y cuidado de mascotas. Provee interfaces diferenciadas y seguras para propietarios de mascotas, médicos veterinarios y administradores, con gestión de citas médicas, historial clínico y tienda online.',
      longDescriptionEn: 'End-to-end full-stack web platform for veterinary clinics and pet care. Provides dedicated role-based portals for pet owners, veterinary doctors, and administrators with clinical history management, appointment booking, adoption, and e-commerce.',
      technologies: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS 4', 'REST APIs'],
      imageUrl: 'assets/images/projects/pet-care.jpeg',
      githubUrl: 'https://github.com',
      featured: true,
      metrics: [
        { labelEs: 'Frontend', labelEn: 'Frontend', value: 'React 19' },
        { labelEs: 'Base de Datos', labelEn: 'Database', value: 'MongoDB' }
      ]
    }
  ];

  filteredProjects = computed(() => {
    const catId = this.selectedCategoryId();
    const query = this.searchQuery().toLowerCase().trim();

    return this.projectsList.filter(p => {
      const matchesCategory = catId === 'all' || p.category === catId;
      const desc = (this.ts.currentLang() === 'es' ? p.descriptionEs : p.descriptionEn).toLowerCase();
      const matchesQuery = !query || 
        p.title.toLowerCase().includes(query) || 
        desc.includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  });

  openProjectModal(project: Project): void {
    this.selectedModalProject.set(project);
  }
}
