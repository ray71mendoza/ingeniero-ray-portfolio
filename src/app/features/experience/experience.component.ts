import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, Award, Layers } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ExperienceItem } from '../../models/portfolio.models';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GlassCardComponent],
  template: `
    <section id="experience" class="py-20 relative bg-cyber-dark/40">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan">
            <lucide-icon [img]="BriefcaseIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>{{ ts.t().experience.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ ts.t().experience.title }} <span class="text-gradient-cyan">{{ ts.t().experience.titleAccent }}</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {{ ts.t().experience.subtitle }}
          </p>
        </div>

        <!-- Vertical Timeline Grid -->
        <div class="relative border-l-2 border-neon-cyan/30 ml-4 md:ml-36 space-y-12">
          
          @for (item of experiences; track item.id; let idx = $index) {
            <div class="relative pl-8 md:pl-12 group">
              
              <!-- Glowing Node Circle -->
              <div class="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-cyber-dark border-2 border-neon-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.5)] group-hover:scale-125 group-hover:bg-neon-cyan transition-all duration-300">
                <span class="w-2.5 h-2.5 rounded-full bg-neon-cyan group-hover:bg-gray-950"></span>
              </div>

              <!-- Time Badge on Left (Desktop) -->
              <div class="hidden md:block absolute -left-40 top-1 text-right w-32 font-mono text-xs text-neon-cyan font-bold leading-tight">
                {{ ts.currentLang() === 'es' ? item.periodEs : item.periodEn }}
              </div>

              <!-- Content Glass Card -->
              <app-glass-card className="space-y-4 border border-cyber-border-dark group-hover:border-neon-cyan/40 transition-all duration-300">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-cyber-border-dark pb-4">
                  <div>
                    <!-- Mobile Time Badge -->
                    <div class="md:hidden inline-block mb-1 px-2.5 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan text-[11px] font-mono font-bold">
                      {{ ts.currentLang() === 'es' ? item.periodEs : item.periodEn }}
                    </div>

                    <h3 class="text-xl font-bold text-gray-100 flex flex-wrap items-center gap-2">
                      {{ ts.currentLang() === 'es' ? item.roleEs : item.roleEn }}
                      <span class="text-xs px-2.5 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 font-mono font-normal">
                        {{ item.company }}
                      </span>
                    </h3>
                    
                    <div class="flex items-center gap-4 text-xs text-gray-400 mt-1 font-mono">
                      <span class="flex items-center gap-1">
                        <lucide-icon [img]="MapPinIcon" class="w-3.5 h-3.5 text-neon-cyan"></lucide-icon>
                        {{ ts.currentLang() === 'es' ? item.locationEs : item.locationEn }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Description List -->
                <ul class="space-y-2 text-xs sm:text-sm text-gray-300">
                  @for (desc of (ts.currentLang() === 'es' ? item.descriptionEs : item.descriptionEn); track desc) {
                    <li class="flex items-start gap-2.5">
                      <lucide-icon [img]="CheckCircleIcon" class="w-4 h-4 text-neon-cyan shrink-0 mt-0.5"></lucide-icon>
                      <span class="leading-relaxed">{{ desc }}</span>
                    </li>
                  }
                </ul>

                <!-- Technologies Used Badges -->
                <div class="flex flex-wrap gap-1.5 pt-3 border-t border-cyber-border-dark/60">
                  @for (tech of item.technologies; track tech) {
                    <span class="px-2.5 py-1 rounded-md bg-cyber-dark border border-cyber-border-dark text-[11px] font-mono text-gray-300">
                      {{ tech }}
                    </span>
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
export class ExperienceComponent {
  ts = inject(TranslationService);

  readonly BriefcaseIcon = Briefcase;
  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly CheckCircleIcon = CheckCircle2;
  readonly TrendingIcon = TrendingUp;

  readonly experiences: ExperienceItem[] = [
    {
      id: 'exp-mt-solutions',
      company: 'MT Solutions',
      roleEs: 'Desarrollador Sénior - Líder Técnico',
      roleEn: 'Senior Developer - Technical Lead',
      periodEs: 'Nov 2024 – Actualidad',
      periodEn: 'Nov 2024 – Present',
      locationEs: 'Colombia',
      locationEn: 'Colombia',
      descriptionEs: [
        'Lideré un equipo de desarrollo de software con metodología ágil Scrum (Daily Scrum, sprint planning, revisiones, retrospectivas).',
        'Diseñé, desarrollé e implementé aplicaciones web Full Stack (Front-end y Back-end), integrando interfaces, lógica de negocio, APIs y servicios.',
        'Desarrollé, administré y personalicé plataformas Moodle (funcionalidades, entornos virtuales de aprendizaje, integraciones y automatizaciones).',
        'Diseñé y administré bases de datos relacionales con SQL (consultas, procedimientos, optimización, mantenimiento).',
        'Desarrollé con Python, PHP, JavaScript, HTML, CSS y control de versiones.',
        'Implementé y consumí APIs REST para interoperabilidad entre plataformas.',
        'Administré repositorios de código y procesos de integración/despliegue.',
        'Brindé soporte técnico y funcional, mantenimiento correctivo/preventivo de plataformas e infraestructura.',
        'Administré la mesa de ayuda GLPI (incidentes, requerimientos, inventario TI, SLA).',
        'Elaboré documentación técnica, manuales y procedimientos.',
        'Participé en proyectos de transformación digital.'
      ],
      descriptionEn: [
        'Led a software engineering team using agile Scrum methodology (Daily Scrum, sprint planning, reviews, retrospectives).',
        'Designed, developed, and implemented Full Stack web applications (Front-end and Back-end), integrating interfaces, business logic, APIs, and microservices.',
        'Developed, administered, and customized Moodle platforms (custom features, virtual learning environments, integrations, and automation).',
        'Designed and managed relational databases with SQL (complex queries, stored procedures, indexing, performance optimization).',
        'Developed with Python, PHP, JavaScript, HTML, CSS, and Git version control.',
        'Implemented and consumed REST APIs to enable cross-platform interoperability.',
        'Managed code repositories, CI/CD pipelines, and deployment lifecycles.',
        'Provided functional and technical IT support, preventive/corrective maintenance for enterprise platforms and infrastructure.',
        'Administered the GLPI IT Service Desk (incidents, requests, IT asset inventory, SLA enforcement).',
        'Authored in-depth technical documentation, developer manuals, and standard operating procedures.',
        'Active participant in corporate digital transformation initiatives.'
      ],
      technologies: ['Scrum', 'Python', 'PHP', 'JavaScript', 'SQL', 'APIs REST', 'Moodle', 'GLPI', 'HTML/CSS', 'Git']
    },
    {
      id: 'exp-tic-global',
      company: 'TIC Global',
      roleEs: 'Ingeniero de Sistemas Junior',
      roleEn: 'Junior Systems Engineer',
      periodEs: 'Ago 2025 – Dic 2025',
      periodEn: 'Aug 2025 – Dec 2025',
      locationEs: 'Colombia',
      locationEn: 'Colombia',
      descriptionEs: [
        'Participé en el desarrollo y mantenimiento de software para los Servicios Ciudadanos Digitales (SCD), apoyando transformación digital de entidades públicas.',
        'Desarrollé funcionalidades (codificación, depuración, pruebas unitarias).',
        'Implementé e integré APIs REST y servicios web.',
        'Elaboré documentación técnica, manuales de usuario, guías de instalación y reportes de pruebas.',
        'Participé en reuniones ágiles de seguimiento técnico y de proyecto.',
        'Apoyé la masificación de los SCD en entidades públicas nacionales y territoriales.',
        'Apliqué buenas prácticas de desarrollo seguro y accesible según la Agencia Nacional de Gobierno Digital.'
      ],
      descriptionEn: [
        'Contributed to the development and maintenance of software for Digital Citizen Services (SCD), supporting digital transformation in public sector entities.',
        'Engineered new application features (coding, debugging, unit testing).',
        'Implemented and integrated RESTful APIs and web services.',
        'Authored technical documentation, user manuals, deployment guides, and test reports.',
        'Participated in agile technical tracking and project coordination meetings.',
        'Supported the nationwide rollout and adoption of SCD across national and regional public organizations.',
        'Applied secure and accessible software development standards in compliance with the National Digital Government Agency guidelines.'
      ],
      technologies: ['Servicios Ciudadanos Digitales', 'APIs REST', 'Desarrollo Seguro', 'Testing', 'Documentación Técnica', 'Gobierno Digital']
    },
    {
      id: 'exp-indra',
      company: 'INDRA',
      roleEs: 'SOC - Ingeniero de Sistemas Junior',
      roleEn: 'SOC - Junior Systems Engineer',
      periodEs: 'May 2024 – Nov 2024',
      periodEn: 'May 2024 – Nov 2024',
      locationEs: 'Colombia',
      locationEn: 'Colombia',
      descriptionEs: [
        'Desarrollé herramientas de automatización en Python para extracción, procesamiento y análisis de datos.',
        'Automaticé configuraciones de infraestructura de red en dispositivos Cisco mediante scripting.',
        'Diseñé e implementé herramientas con interfaces gráficas.',
        'Elaboré 46 guías técnicas en Excel para la gestión de 21 sistemas.',
        'Realicé seguimiento técnico y comunicación de avances con stakeholders.',
        'Fortalecí conocimientos en ciberseguridad (ISO 27001, NIST, Ethical Hacking, Pentesting).'
      ],
      descriptionEn: [
        'Developed Python automation tools for high-volume data extraction, processing, and analytics.',
        'Automated network infrastructure provisioning and configuration on Cisco devices via scripting.',
        'Designed and implemented GUI-based automation utilities for internal operations.',
        'Authored 46 comprehensive technical Excel management guides covering 21 critical systems.',
        'Conducted technical tracking and communicated project milestones with senior stakeholders.',
        'Strengthened cybersecurity knowledge (ISO 27001, NIST framework, Ethical Hacking, and Pentesting).'
      ],
      technologies: ['Python Automation', 'Cisco Network Scripting', 'ISO 27001', 'NIST', 'Ethical Hacking', 'SOC']
    },
    {
      id: 'exp-saintz',
      company: 'Corporación de Ingeniería Saintz S.A.S',
      roleEs: 'Ingeniero de Sistemas Junior',
      roleEn: 'Junior Systems Engineer',
      periodEs: 'Sep 2022 – Abr 2024',
      periodEn: 'Sep 2022 – Apr 2024',
      locationEs: 'Colombia',
      locationEn: 'Colombia',
      descriptionEs: [
        'Brindé soporte técnico (hardware/software, instalación de SO y aplicaciones, remoto y presencial).',
        'Capacité a usuarios en buenas prácticas tecnológicas.',
        'Participé en desarrollo y mantenimiento de aplicaciones con JavaScript y Python, pruebas de software, documentación técnica y control de versiones (Git/GitHub).',
        'Contribuí en manuales de usuario y desarrollador.'
      ],
      descriptionEn: [
        'Delivered comprehensive technical support (hardware/software troubleshooting, OS deployment, and application installation, both remotely and on-site).',
        'Trained end-users on technology best practices and system usage.',
        'Participated in software development and maintenance using JavaScript and Python, software testing, technical documentation, and version control (Git/GitHub).',
        'Contributed to user and developer documentation manuals.'
      ],
      technologies: ['JavaScript', 'Python', 'Git/GitHub', 'Soporte TI', 'Hardware/Software', 'Capacitación']
    }
  ];
}
