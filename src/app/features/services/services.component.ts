import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Wrench, Layers, Database, Shield, Cpu, Code2, ArrowUpRight, CheckCircle2 } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { ServiceOffering } from '../../models/portfolio.models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GlassCardComponent, TiltDirective],
  template: `
    <section id="services" class="py-20 relative bg-cyber-dark/40">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan">
            <lucide-icon [img]="WrenchIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>Propuesta de Valor</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Servicios <span class="text-gradient-cyan">Especializados</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Soluciones de ingeniería de software de punta a punta orientadas a resultados de alto nivel corporativo.
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (serv of servicesList; track serv.id) {
            <div appTilt [maxTilt]="8" class="h-full">
              <app-glass-card className="h-full space-y-6 flex flex-col justify-between border border-cyber-border-dark hover:border-neon-cyan/50 transition-all duration-300 group">
                
                <div class="space-y-4">
                  <div class="w-12 h-12 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan group-hover:scale-110 group-hover:bg-neon-cyan group-hover:text-gray-950 transition-all duration-300">
                    <lucide-icon [img]="CodeIcon" class="w-6 h-6"></lucide-icon>
                  </div>

                  <div class="space-y-1">
                    <span class="text-xs font-mono text-neon-cyan font-bold uppercase tracking-wider">{{ serv.subtitle }}</span>
                    <h3 class="text-xl font-bold text-gray-100 group-hover:text-neon-cyan transition-colors">
                      {{ serv.title }}
                    </h3>
                  </div>

                  <p class="text-xs text-gray-400 leading-relaxed">
                    {{ serv.description }}
                  </p>
                </div>

                <!-- Features List -->
                <div class="pt-4 border-t border-cyber-border-dark space-y-2">
                  @for (feat of serv.features; track feat) {
                    <div class="flex items-center gap-2 text-xs text-gray-300">
                      <lucide-icon [img]="CheckIcon" class="w-3.5 h-3.5 text-neon-cyan shrink-0"></lucide-icon>
                      <span>{{ feat }}</span>
                    </div>
                  }
                </div>

              </app-glass-card>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class ServicesComponent {
  readonly WrenchIcon = Wrench;
  readonly CodeIcon = Code2;
  readonly CheckIcon = CheckCircle2;

  readonly servicesList: ServiceOffering[] = [
    {
      id: 's1',
      title: 'Arquitectura & Apps Angular 20+',
      subtitle: 'Frontend Enterprise',
      description: 'Construcción de aplicaciones web complejas, migración de código legado y adopción de Angular Signals & Control Flow.',
      icon: 'layers',
      features: ['Standalone Architecture', 'Gestión de Estado con Signals', 'Optimización Core Web Vitals <1s', 'Estrategia OnPush & Lazy Loading']
    },
    {
      id: 's2',
      title: 'Desarrollo Full Stack REST / GraphQL',
      subtitle: 'Sistemas a Medida',
      description: 'Desarrollo integral cliente-servidor con Node.js, Express, Python FastAPI, PostgreSQL y MongoDB.',
      icon: 'code',
      features: ['APIs RESTful y GraphQL', 'Autenticación OAuth2 / JWT', 'Microservicios Dockerizados', 'Bases de Datos Relacionales y NoSQL']
    },
    {
      id: 's3',
      title: 'Ciberseguridad & Auditorías OWASP',
      subtitle: 'Hardening & Pentesting',
      description: 'Análisis de vulnerabilidades, protección contra ataques SQLi/XSS/CSRF e implementación de estándares ISO 27001.',
      icon: 'shield',
      features: ['Auditoría de Código y Configuración', 'Cifrado de Datos AES-256', 'Protección Headers de Seguridad', 'Hardening de Nginx y Linux']
    }
  ];
}
