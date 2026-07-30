import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, Award, Target, Zap, Shield, Heart, CheckCircle2, Layers, Cpu, Server } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GlassCardComponent],
  template: `
    <section id="about" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Section Header -->
        <div class="text-center space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-purple/30 text-xs font-mono text-neon-purple">
            <lucide-icon [img]="UserIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>Trayectoria & Filosofía</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Sobre <span class="text-gradient-cyan">Mí</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Ingeniero de Sistemas con una visión integral del desarrollo de software moderno: desde el diseño UI/UX fino hasta arquitecturas distribuidas de baja latencia.
          </p>
        </div>

        <!-- Interactive Tabs Selector -->
        <div class="flex justify-center mb-12">
          <div class="glass-panel p-1.5 rounded-2xl flex flex-wrap justify-center gap-2 border border-cyber-border-dark">
            @for (tab of tabs; track tab.id) {
              <button 
                (click)="activeTab.set(tab.id)"
                class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                [class.bg-gradient-to-r]="activeTab() === tab.id"
                [class.from-neon-cyan]="activeTab() === tab.id"
                [class.to-neon-purple]="activeTab() === tab.id"
                [class.text-gray-950]="activeTab() === tab.id"
                [class.shadow-[0_0_15px_rgba(0,242,254,0.3)]]="activeTab() === tab.id"
                [class.text-gray-400]="activeTab() !== tab.id"
                [class.hover:text-gray-200]="activeTab() !== tab.id">
                <span>{{ tab.label }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Tab Content Views -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <!-- Presentation Tab -->
          @if (activeTab() === 'presentation') {
            <div class="lg:col-span-7 space-y-6">
              <app-glass-card className="h-full space-y-4">
                <h3 class="text-2xl font-bold text-gray-100 flex items-center gap-2">
                  <lucide-icon [img]="AwardIcon" class="w-6 h-6 text-neon-cyan"></lucide-icon>
                  Presentación Profesional
                </h3>
                <p class="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Como **Arquitecto de Software y Full Stack Engineer**, me especializo en construir ecosistemas digitales resilientes, limpios y altamente optimizados. Con amplia experiencia en **Angular (desde v2 hasta v20+)**, TypeScript, RxJS y arquitecturas Cloud, he diseñado plataformas críticas para sectores financiero, e-commerce, logística y telecomunicaciones.
                </p>
                <p class="text-gray-400 leading-relaxed text-sm">
                  Mi enfoque combina estándares rigorosos de ingeniería (**SOLID, Clean Code, DDD, TDD**) con una obsesión por la experiencia visual premium (Glassmorphism, micro-animaciones fluidas, accesibilidad WCAG AA y rendimiento en tiempo de carga sub-segundo).
                </p>
                <div class="pt-4 grid grid-cols-2 gap-4">
                  <div class="p-4 rounded-xl bg-cyber-dark/60 border border-cyber-border-dark space-y-1">
                    <span class="text-xs font-mono text-neon-cyan">Especialidad</span>
                    <p class="font-bold text-sm text-gray-200">Angular 20+ Enterprise Apps</p>
                  </div>
                  <div class="p-4 rounded-xl bg-cyber-dark/60 border border-cyber-border-dark space-y-1">
                    <span class="text-xs font-mono text-neon-purple">Filosofía</span>
                    <p class="font-bold text-sm text-gray-200">Zero Technical Debt</p>
                  </div>
                </div>
              </app-glass-card>
            </div>

            <div class="lg:col-span-5 space-y-4">
              <app-glass-card className="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                    <lucide-icon [img]="TargetIcon" class="w-5 h-5"></lucide-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-base text-gray-100">Objetivo Profesional</h4>
                    <p class="text-xs text-gray-400">Liderazgo técnico y arquitectura de impacto mundial</p>
                  </div>
                </div>
                <p class="text-xs text-gray-300 leading-relaxed">
                  Liderar la transformación digital de organizaciones de alto nivel mediante código impecable, automatización CI/CD, arquitecturas desacopladas y mentorship de equipos de ingeniería.
                </p>
              </app-glass-card>

              <app-glass-card className="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
                    <lucide-icon [img]="ZapIcon" class="w-5 h-5"></lucide-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-base text-gray-100">Fortaleza Clave</h4>
                    <p class="text-xs text-gray-400">Optimización Web & Performance</p>
                  </div>
                </div>
                <p class="text-xs text-gray-300 leading-relaxed">
                  Especialista en reducir bundle sizes, maximizar métricas Core Web Vitals (LCP, CLS, INP) y lograr punteos perfectos 100/100 en Google Lighthouse.
                </p>
              </app-glass-card>
            </div>
          }

          <!-- Specialties Tab -->
          @if (activeTab() === 'specialties') {
            <div class="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <app-glass-card className="space-y-4">
                <div class="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                  <lucide-icon [img]="LayersIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <h4 class="font-bold text-lg text-gray-100">Frontend Engineering & Architecture</h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Desarrollo de SPA/SSR avanzadas con Angular 20+ (Signals, Standalone Components, Control Flow, RxJS, Micro-frontends).
                </p>
              </app-glass-card>

              <app-glass-card className="space-y-4">
                <div class="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
                  <lucide-icon [img]="ServerIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <h4 class="font-bold text-lg text-gray-100">Backend & Cloud Microservices</h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                  APIs RESTful y GraphQL con Node.js, Express, Python (FastAPI/Django), Laravel, PostgreSQL, Docker y desplegadas en AWS/Vercel.
                </p>
              </app-glass-card>

              <app-glass-card className="space-y-4">
                <div class="w-12 h-12 rounded-xl bg-neon-emerald/10 border border-neon-emerald/30 flex items-center justify-center text-neon-emerald">
                  <lucide-icon [img]="ShieldIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <h4 class="font-bold text-lg text-gray-100">Ciberseguridad & Pentesting</h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Auditorías OWASP Top 10, implementación de OAuth2/JWT, cifrado AES-256, hardening de servidores Linux Nginx y seguridad ISO 27001.
                </p>
              </app-glass-card>
            </div>
          }

          <!-- Values Tab -->
          @if (activeTab() === 'values') {
            <div class="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              @for (val of valuesList; track val.title) {
                <app-glass-card className="space-y-3">
                  <div class="flex items-center gap-3">
                    <lucide-icon [img]="CheckCircleIcon" class="w-5 h-5 text-neon-cyan"></lucide-icon>
                    <h4 class="font-bold text-base text-gray-100">{{ val.title }}</h4>
                  </div>
                  <p class="text-xs text-gray-300 leading-relaxed">{{ val.desc }}</p>
                </app-glass-card>
              }
            </div>
          }

          <!-- Soft Skills Tab -->
          @if (activeTab() === 'softskills') {
            <div class="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              @for (skill of softSkillsList; track skill) {
                <div class="glass-panel p-5 rounded-2xl border border-cyber-border-dark text-center space-y-2 hover:border-neon-cyan/40 transition-all duration-300">
                  <div class="w-10 h-10 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan mx-auto">
                    <lucide-icon [img]="ZapIcon" class="w-5 h-5"></lucide-icon>
                  </div>
                  <h5 class="font-bold text-sm text-gray-200">{{ skill }}</h5>
                </div>
              }
            </div>
          }

        </div>

      </div>
    </section>
  `
})
export class AboutComponent {
  readonly UserIcon = User;
  readonly AwardIcon = Award;
  readonly TargetIcon = Target;
  readonly ZapIcon = Zap;
  readonly ShieldIcon = Shield;
  readonly LayersIcon = Layers;
  readonly ServerIcon = Server;
  readonly CheckCircleIcon = CheckCircle2;

  activeTab = signal<string>('presentation');

  readonly tabs = [
    { id: 'presentation', label: 'Presentación' },
    { id: 'specialties', label: 'Especialidades' },
    { id: 'values', label: 'Valores & Principios' },
    { id: 'softskills', label: 'Soft Skills' }
  ];

  readonly valuesList = [
    { title: 'Excelencia en Código (Clean Code)', desc: 'Priorizar código legible, testeable y mantenible con principios SOLID y patrones de diseño comprobados.' },
    { title: 'Obsesión por la Experiencia de Usuario (UI/UX)', desc: 'El rendimiento técnico sin una interfaz elegante e intuitiva carece de impacto. Ambas dimensiones deben ser extraordinarias.' },
    { title: 'Seguridad por Diseño (Security First)', desc: 'Prevenir vulnerabilidades OWASP desde la concepción del sistema y garantizar la protección de datos en tránsito y reposo.' },
    { title: 'Aprendizaje Continuo e Innovación AI', desc: 'Adopción proactiva de herramientas como GitHub Copilot, Cursor AI, DeepSeek y frameworks modernos para multiplicar la productividad.' }
  ];

  readonly softSkillsList = [
    'Liderazgo Técnico',
    'Pensamiento Crítico',
    'Resolución Compleja',
    'Comunicación Asertiva',
    'Trabajo bajo Presión',
    'Metodologías Ágiles (Scrum)',
    'Mentorship & Code Reviews',
    'Orientación a Resultados'
  ];
}
