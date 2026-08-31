import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Wrench, Layers, Database, Shield, Cpu, Code2, ArrowUpRight, CheckCircle2 } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { ServiceOffering } from '../../models/portfolio.models';
import { TranslationService } from '../../core/services/translation.service';

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
            <span>{{ ts.t().services.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ ts.t().services.title }} <span class="text-gradient-cyan">{{ ts.t().services.titleAccent }}</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {{ ts.t().services.subtitle }}
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (serv of servicesList; track serv.id) {
            <div appTilt [maxTilt]="8" class="h-full">
              <app-glass-card className="h-full space-y-6 flex flex-col justify-between border border-cyber-border-dark hover:border-neon-cyan/50 transition-all duration-300 group bg-cyber-dark/80">
                
                <div class="space-y-4">
                  <div class="w-12 h-12 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan group-hover:scale-110 group-hover:bg-neon-cyan group-hover:text-gray-950 transition-all duration-300">
                    <lucide-icon [img]="CodeIcon" class="w-6 h-6"></lucide-icon>
                  </div>

                  <div class="space-y-1">
                    <span class="text-xs font-mono text-neon-cyan font-bold uppercase tracking-wider">
                      {{ ts.currentLang() === 'es' ? serv.subtitleEs : serv.subtitleEn }}
                    </span>
                    <h3 class="text-xl font-bold text-gray-100 group-hover:text-neon-cyan transition-colors">
                      {{ ts.currentLang() === 'es' ? serv.titleEs : serv.titleEn }}
                    </h3>
                  </div>

                  <p class="text-xs text-gray-400 leading-relaxed">
                    {{ ts.currentLang() === 'es' ? serv.descriptionEs : serv.descriptionEn }}
                  </p>
                </div>

                <!-- Features List -->
                <div class="pt-4 border-t border-cyber-border-dark space-y-2">
                  @for (feat of (ts.currentLang() === 'es' ? serv.featuresEs : serv.featuresEn); track feat) {
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
  ts = inject(TranslationService);

  readonly WrenchIcon = Wrench;
  readonly CodeIcon = Code2;
  readonly CheckIcon = CheckCircle2;

  readonly servicesList: ServiceOffering[] = [
    {
      id: 's1',
      titleEs: 'Desarrollo Web Full Stack & APIs',
      titleEn: 'Full Stack & APIs Web Engineering',
      subtitleEs: 'Arquitectura & Escalabilidad',
      subtitleEn: 'Architecture & Scalability',
      descriptionEs: 'Diseño, construcción y despliegue de aplicaciones web de alto rendimiento con Python, JavaScript, PHP, React, Node.js y SQL.',
      descriptionEn: 'Designing, building, and deploying high-performance web applications using Python, JavaScript, PHP, React, Node.js, and SQL.',
      icon: 'code',
      featuresEs: [
        'Desarrollo Frontend y Backend',
        'Diseño y consumo de APIs RESTful',
        'Bases de datos relacionales (MySQL, PostgreSQL)',
        'Control de versiones Git y despliegue continuo'
      ],
      featuresEn: [
        'End-to-End Frontend & Backend Development',
        'RESTful API Architecture & Consumption',
        'Relational Databases (MySQL, PostgreSQL)',
        'Git Workflow & Continuous Deployment'
      ]
    },
    {
      id: 's2',
      titleEs: 'Liderazgo Técnico & Metodologías Ágiles',
      titleEn: 'Technical Leadership & Agile Scrum',
      subtitleEs: 'Gestión & Equipos de Alto Rendimiento',
      subtitleEn: 'Management & High-Performance Squads',
      descriptionEs: 'Coordinación y liderazgo de squads de desarrollo bajo marco Scrum, sprint planning, estimaciones y aseguramiento de calidad técnica.',
      descriptionEn: 'Coordinating and leading engineering squads with Scrum framework, sprint planning, accurate estimations, and code review governance.',
      icon: 'layers',
      featuresEs: [
        'Liderazgo de Daily Scrums y Retrospectivas',
        'Revisión de Código y Mentoría',
        'Redacción de Documentación Técnica',
        'Transformación Digital Corporativa'
      ],
      featuresEn: [
        'Daily Standups & Retrospective Facilitation',
        'Code Reviews & Technical Mentoring',
        'Comprehensive Technical Documentation',
        'Corporate Digital Transformation'
      ]
    },
    {
      id: 's3',
      titleEs: 'Automatización, LMS Moodle & Soporte TI',
      titleEn: 'Automation, Moodle LMS & IT Operations',
      subtitleEs: 'Eficiencia Operativa & Mesa de Ayuda',
      subtitleEn: 'Operational Efficiency & Service Desk',
      descriptionEs: 'Automatización de tareas con Python, personalización avanzada de plataformas Moodle y administración de mesas de ayuda GLPI.',
      descriptionEn: 'Process automation using Python scripts, enterprise Moodle LMS customization, and GLPI Service Desk orchestration.',
      icon: 'shield',
      featuresEs: [
        'Scripting en Python para Procesamiento de Datos',
        'Administración y Personalización de Moodle',
        'Gestión de Mesa de Ayuda GLPI y SLAs',
        'Soporte Técnico Especializado e Infraestructura'
      ],
      featuresEn: [
        'Python Scripting for Data Pipelines & Tasks',
        'Moodle LMS Administration & Custom Theming',
        'GLPI Service Desk & SLA Enforcement',
        'Specialized Hardware & Software Support'
      ]
    }
  ];
}
