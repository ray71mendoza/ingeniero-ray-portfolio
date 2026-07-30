import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { ExperienceItem } from '../../models/portfolio.models';

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
            <span>Trayectoria Profesional</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Línea del <span class="text-gradient-cyan">Tiempo</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Historial comprobado liderando desarrollo frontend, arquitecturas escalables y transformación digital.
          </p>
        </div>

        <!-- Vertical Timeline Grid -->
        <div class="relative border-l-2 border-neon-cyan/30 ml-4 md:ml-32 space-y-12">
          
          @for (item of experiences; track item.id; let idx = $index) {
            <div class="relative pl-8 md:pl-12 group">
              
              <!-- Glowing Node Circle -->
              <div class="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-cyber-dark border-2 border-neon-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.5)] group-hover:scale-125 group-hover:bg-neon-cyan transition-all duration-300">
                <span class="w-2.5 h-2.5 rounded-full bg-neon-cyan group-hover:bg-gray-950"></span>
              </div>

              <!-- Time Badge on Left (Desktop) -->
              <div class="hidden md:block absolute -left-36 top-1 text-right w-28 font-mono text-xs text-neon-cyan font-bold">
                {{ item.period }}
              </div>

              <!-- Content Glass Card -->
              <app-glass-card className="space-y-4 border border-cyber-border-dark group-hover:border-neon-cyan/40 transition-all duration-300">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-cyber-border-dark pb-4">
                  <div>
                    <h3 class="text-xl font-bold text-gray-100 flex items-center gap-2">
                      {{ item.role }}
                      <span class="text-xs px-2.5 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 font-mono">
                        {{ item.company }}
                      </span>
                    </h3>
                    <div class="flex items-center gap-4 text-xs text-gray-400 mt-1 font-mono">
                      <span class="flex items-center gap-1">
                        <lucide-icon [img]="CalendarIcon" class="w-3.5 h-3.5 text-neon-purple"></lucide-icon>
                        {{ item.period }}
                      </span>
                      <span class="flex items-center gap-1">
                        <lucide-icon [img]="MapPinIcon" class="w-3.5 h-3.5 text-neon-cyan"></lucide-icon>
                        {{ item.location }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Description List -->
                <ul class="space-y-2 text-xs sm:text-sm text-gray-300">
                  @for (desc of item.description; track desc) {
                    <li class="flex items-start gap-2">
                      <lucide-icon [img]="CheckCircleIcon" class="w-4 h-4 text-neon-cyan shrink-0 mt-0.5"></lucide-icon>
                      <span>{{ desc }}</span>
                    </li>
                  }
                </ul>

                <!-- Key Achievements -->
                <div class="p-3.5 rounded-xl bg-cyber-dark/80 border border-cyber-border-dark space-y-2">
                  <div class="flex items-center gap-2 text-xs font-mono text-neon-emerald font-bold uppercase tracking-wider">
                    <lucide-icon [img]="TrendingIcon" class="w-3.5 h-3.5"></lucide-icon>
                    Impacto & Logros Clave:
                  </div>
                  <ul class="space-y-1 text-xs text-gray-400">
                    @for (ach of item.achievements; track ach) {
                      <li class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-neon-emerald"></span>
                        <span>{{ ach }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Technologies Used Badges -->
                <div class="flex flex-wrap gap-1.5 pt-2">
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
  readonly BriefcaseIcon = Briefcase;
  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly CheckCircleIcon = CheckCircle2;
  readonly TrendingIcon = TrendingUp;

  readonly experiences: ExperienceItem[] = [
    {
      id: 'exp-1',
      company: 'Tech Enterprise Solutions',
      role: 'Principal Software Architect & Lead Angular',
      period: '2023 - Presente',
      location: 'Remoto / EE.UU.',
      description: [
        'Liderazgo técnico en la arquitectura de micro-frontends basados en Angular 20+ con Signals y RxJS.',
        'Diseño e implementación de sistemas de diseño corporativo con Web Components y Tailwind CSS.',
        'Migración masiva de código legado en AngularJS/Angular 12 a Angular Standalone Components.'
      ],
      achievements: [
        'Reducción del 45% en tiempo de carga inicial (Core Web Vitals LCP < 1.2s).',
        'Cero vulnerabilidades críticas reportadas en auditorías OWASP de producción.',
        'Mentoría a un equipo de 14 ingenieros frontend senior.'
      ],
      technologies: ['Angular 20', 'Signals', 'RxJS', 'TypeScript', 'Tailwind CSS', 'AWS', 'Docker', 'Jest']
    },
    {
      id: 'exp-2',
      company: 'Global Banking Systems',
      role: 'Senior Full Stack Engineer',
      period: '2020 - 2023',
      location: 'Híbrido',
      description: [
        'Desarrollo de plataforma transaccional bancaria de alta concurrencia.',
        'Construcción de microservicios REST/GraphQL en Node.js, Express y Python FastAPI.',
        'Integración de pasarelas de pago con seguridad PCI-DSS y cifrado AES-256.'
      ],
      achievements: [
        'Procesamiento seguro de más de 2M de transacciones diarias sin interrupciones.',
        'Implementación de pipelines CI/CD automatizados reduciendo deploys de 3h a 12 minutos.'
      ],
      technologies: ['Angular 14-16', 'Node.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'OAuth2/JWT']
    },
    {
      id: 'exp-3',
      company: 'Innovation Digital Agency',
      role: 'Frontend Engineer Lead',
      period: '2017 - 2020',
      location: 'Presencial',
      description: [
        'Creación de plataformas e-commerce, paneles administrativos y aplicaciones progresivas (PWA).',
        'Optimización SEO avanzada, implementación de SSR con Angular Universal y Web Vitals.'
      ],
      achievements: [
        'Incremento del 35% en conversión de usuarios gracias a mejoras de UI/UX y velocidad.'
      ],
      technologies: ['Angular', 'SCSS', 'Bootstrap', 'WordPress API', 'Firebase', 'GSAP']
    }
  ];
}
