import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, User, Award, Target, Zap, Shield, Heart, CheckCircle2, Layers, Cpu, Server, Globe2, Sparkles, BookOpen } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TranslationService } from '../../core/services/translation.service';

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
            <span>{{ ts.t().about.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ ts.t().about.title }} <span class="text-gradient-cyan">{{ ts.t().about.titleAccent }}</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {{ ts.t().about.subtitle }}
          </p>
        </div>

        <!-- Interactive Tabs Selector -->
        <div class="flex justify-center mb-12">
          <div class="glass-panel p-1.5 rounded-2xl flex flex-wrap justify-center gap-2 border border-cyber-border-dark">
            <button 
              (click)="activeTab.set('presentation')"
              class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              [class.bg-gradient-to-r]="activeTab() === 'presentation'"
              [class.from-neon-cyan]="activeTab() === 'presentation'"
              [class.to-neon-purple]="activeTab() === 'presentation'"
              [class.text-gray-950]="activeTab() === 'presentation'"
              [class.shadow-[0_0_15px_rgba(0,242,254,0.3)]]="activeTab() === 'presentation'"
              [class.text-gray-400]="activeTab() !== 'presentation'">
              <span>{{ ts.t().about.tabPresentation }}</span>
            </button>
            <button 
              (click)="activeTab.set('specialties')"
              class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              [class.bg-gradient-to-r]="activeTab() === 'specialties'"
              [class.from-neon-cyan]="activeTab() === 'specialties'"
              [class.to-neon-purple]="activeTab() === 'specialties'"
              [class.text-gray-950]="activeTab() === 'specialties'"
              [class.shadow-[0_0_15px_rgba(0,242,254,0.3)]]="activeTab() === 'specialties'"
              [class.text-gray-400]="activeTab() !== 'specialties'">
              <span>{{ ts.t().about.tabSpecialties }}</span>
            </button>
            <button 
              (click)="activeTab.set('values')"
              class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              [class.bg-gradient-to-r]="activeTab() === 'values'"
              [class.from-neon-cyan]="activeTab() === 'values'"
              [class.to-neon-purple]="activeTab() === 'values'"
              [class.text-gray-950]="activeTab() === 'values'"
              [class.shadow-[0_0_15px_rgba(0,242,254,0.3)]]="activeTab() === 'values'"
              [class.text-gray-400]="activeTab() !== 'values'">
              <span>{{ ts.t().about.tabValues }}</span>
            </button>
            <button 
              (click)="activeTab.set('languages')"
              class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              [class.bg-gradient-to-r]="activeTab() === 'languages'"
              [class.from-neon-cyan]="activeTab() === 'languages'"
              [class.to-neon-purple]="activeTab() === 'languages'"
              [class.text-gray-950]="activeTab() === 'languages'"
              [class.shadow-[0_0_15px_rgba(0,242,254,0.3)]]="activeTab() === 'languages'"
              [class.text-gray-400]="activeTab() !== 'languages'">
              <span>{{ ts.t().about.tabLanguages }}</span>
            </button>
          </div>
        </div>

        <!-- Tab Content Views -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <!-- Presentation Tab -->
          @if (activeTab() === 'presentation') {
            <div class="lg:col-span-7 space-y-6">
              <app-glass-card className="h-full space-y-4">
                <div class="flex items-center justify-between border-b border-cyber-border-dark pb-3">
                  <h3 class="text-xl font-bold text-gray-100 flex items-center gap-2">
                    <lucide-icon [img]="AwardIcon" class="w-5 h-5 text-neon-cyan"></lucide-icon>
                    {{ ts.contactData.fullName }}
                  </h3>
                  <span class="text-xs font-mono px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                    {{ ts.currentLang() === 'es' ? 'Perfil Verificado' : 'Verified Profile' }}
                  </span>
                </div>
                
                <p class="text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line text-justify">
                  {{ ts.t().about.profileText }}
                </p>

                <div class="pt-4 grid grid-cols-2 gap-4">
                  <div class="p-4 rounded-xl bg-cyber-dark/80 border border-cyber-border-dark space-y-1">
                    <span class="text-xs font-mono text-neon-cyan">{{ ts.currentLang() === 'es' ? 'Enfoque Principal' : 'Core Focus' }}</span>
                    <p class="font-bold text-sm text-gray-200">Full Stack & Tech Lead</p>
                  </div>
                  <div class="p-4 rounded-xl bg-cyber-dark/80 border border-cyber-border-dark space-y-1">
                    <span class="text-xs font-mono text-neon-purple">{{ ts.currentLang() === 'es' ? 'Metodología' : 'Methodology' }}</span>
                    <p class="font-bold text-sm text-gray-200">Scrum / Agile & CI/CD</p>
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
                    <h4 class="font-bold text-base text-gray-100">
                      {{ ts.currentLang() === 'es' ? 'Objetivo Profesional' : 'Professional Objective' }}
                    </h4>
                    <p class="text-xs text-gray-400">
                      {{ ts.currentLang() === 'es' ? 'Desarrollo de impacto y transformación digital' : 'Impactful development & digital transformation' }}
                    </p>
                  </div>
                </div>
                <p class="text-xs text-gray-300 leading-relaxed">
                  {{ ts.currentLang() === 'es' 
                    ? 'Orientado al desarrollo de soluciones escalables, la mejora continua y la aplicación de buenas prácticas de desarrollo seguro, arquitectura de software y trabajo colaborativo.'
                    : 'Aimed at building scalable software solutions, continuous improvement, and the application of secure development practices, clean software architecture, and collaborative teamwork.' }}
                </p>
              </app-glass-card>

              <app-glass-card className="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
                    <lucide-icon [img]="ZapIcon" class="w-5 h-5"></lucide-icon>
                  </div>
                  <div>
                    <h4 class="font-bold text-base text-gray-100">
                      {{ ts.currentLang() === 'es' ? 'Liderazgo & Automatización' : 'Leadership & Automation' }}
                    </h4>
                    <p class="text-xs text-gray-400">
                      {{ ts.currentLang() === 'es' ? 'Gestión de equipos y procesos eficientes' : 'Team management & efficient workflows' }}
                    </p>
                  </div>
                </div>
                <p class="text-xs text-gray-300 leading-relaxed">
                  {{ ts.currentLang() === 'es'
                    ? 'Capacidad para liderar equipos de desarrollo, implementar metodologías ágiles Scrum, automatizar configuraciones y gestionar plataformas críticas como Moodle y GLPI.'
                    : 'Proven ability to lead development squads, implement agile Scrum workflows, automate network/data tasks with Python, and manage critical platforms such as Moodle LMS and GLPI.' }}
                </p>
              </app-glass-card>
            </div>
          }

          <!-- Specialties Tab -->
          @if (activeTab() === 'specialties') {
            <div class="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <app-glass-card className="space-y-4">
                <div class="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
                  <lucide-icon [img]="LayersIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <h4 class="font-bold text-base text-gray-100">{{ ts.t().about.specialty1Title }}</h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                  {{ ts.t().about.specialty1Desc }}
                </p>
              </app-glass-card>

              <app-glass-card className="space-y-4">
                <div class="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
                  <lucide-icon [img]="ServerIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <h4 class="font-bold text-base text-gray-100">{{ ts.t().about.specialty2Title }}</h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                  {{ ts.t().about.specialty2Desc }}
                </p>
              </app-glass-card>

              <app-glass-card className="space-y-4">
                <div class="w-12 h-12 rounded-xl bg-neon-emerald/10 border border-neon-emerald/30 flex items-center justify-center text-neon-emerald">
                  <lucide-icon [img]="CpuIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <h4 class="font-bold text-base text-gray-100">{{ ts.t().about.specialty3Title }}</h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                  {{ ts.t().about.specialty3Desc }}
                </p>
              </app-glass-card>

              <app-glass-card className="space-y-4">
                <div class="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <lucide-icon [img]="ShieldIcon" class="w-6 h-6"></lucide-icon>
                </div>
                <h4 class="font-bold text-base text-gray-100">{{ ts.t().about.specialty4Title }}</h4>
                <p class="text-xs text-gray-400 leading-relaxed">
                  {{ ts.t().about.specialty4Desc }}
                </p>
              </app-glass-card>

            </div>
          }

          <!-- Values Tab -->
          @if (activeTab() === 'values') {
            <div class="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              @for (val of (ts.currentLang() === 'es' ? valuesEs : valuesEn); track val.title) {
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

          <!-- Languages Tab -->
          @if (activeTab() === 'languages') {
            <div class="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <app-glass-card className="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl">🇨🇴</span>
                    <div>
                      <h4 class="font-bold text-lg text-gray-100">{{ ts.currentLang() === 'es' ? 'Español' : 'Spanish' }}</h4>
                      <span class="text-xs font-mono text-neon-cyan">{{ ts.currentLang() === 'es' ? 'Nativo' : 'Native' }}</span>
                    </div>
                  </div>
                  <span class="text-sm font-bold font-mono text-neon-cyan">100%</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed">
                  {{ ts.currentLang() === 'es' ? 'Lengua materna. Comunicación técnica, redacción de documentación y liderazgo fluido.' : 'Native speaker. Fluent technical communication, documentation authoring, and team leadership.' }}
                </p>
                <div class="w-full bg-cyber-dark h-2 rounded-full overflow-hidden border border-cyber-border-dark">
                  <div class="h-full bg-gradient-to-r from-neon-cyan to-neon-purple w-full rounded-full"></div>
                </div>
              </app-glass-card>

              <app-glass-card className="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl">🇺🇸</span>
                    <div>
                      <h4 class="font-bold text-lg text-gray-100">{{ ts.currentLang() === 'es' ? 'Inglés' : 'English' }}</h4>
                      <span class="text-xs font-mono text-neon-purple">{{ ts.currentLang() === 'es' ? 'B1 - Intermedio' : 'B1 - Intermediate' }}</span>
                    </div>
                  </div>
                  <span class="text-sm font-bold font-mono text-neon-purple">B1</span>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed">
                  {{ ts.currentLang() === 'es' ? 'Lectura y redacción de documentación técnica, consumo de APIs internacionales y comunicación profesional.' : 'Reading and writing technical documentation, consuming international APIs, and professional communication.' }}
                </p>
                <div class="w-full bg-cyber-dark h-2 rounded-full overflow-hidden border border-cyber-border-dark">
                  <div class="h-full bg-gradient-to-r from-neon-purple to-neon-blue w-[65%] rounded-full"></div>
                </div>
              </app-glass-card>
            </div>
          }

        </div>

      </div>
    </section>
  `
})
export class AboutComponent {
  ts = inject(TranslationService);

  readonly UserIcon = User;
  readonly AwardIcon = Award;
  readonly TargetIcon = Target;
  readonly ZapIcon = Zap;
  readonly ShieldIcon = Shield;
  readonly LayersIcon = Layers;
  readonly ServerIcon = Server;
  readonly CpuIcon = Cpu;
  readonly CheckCircleIcon = CheckCircle2;
  readonly GlobeIcon = Globe2;

  activeTab = signal<string>('presentation');

  readonly valuesEs = [
    { title: 'Desarrollo Seguro y Escalable', desc: 'Aplicación de estándares ISO 27001, OWASP y buenas prácticas de desarrollo seguro para proteger la integridad de los datos.' },
    { title: 'Liderazgo y Metodología Scrum', desc: 'Gestión ágil enfocada en sprints, entregas continuas, retrospectivas y sincronización efectiva de equipos.' },
    { title: 'Excelencia en Documentación Técnica', desc: 'Elaboración de manuales de usuario, especificaciones de APIs, reportes de pruebas y guías de infraestructura.' },
    { title: 'Mejora Continua & Transformación Digital', desc: 'Constante actualización en tecnologías modernas, automatización de procesos y modernización de plataformas.' }
  ];

  readonly valuesEn = [
    { title: 'Secure & Scalable Engineering', desc: 'Implementation of ISO 27001, OWASP standards, and secure coding practices to safeguard data integrity.' },
    { title: 'Scrum Agile Leadership', desc: 'Sprint-based agile project management, continuous delivery, sprint retrospectives, and effective team coordination.' },
    { title: 'Comprehensive Technical Documentation', desc: 'Crafting clear user manuals, REST API specifications, testing reports, and deployment guides.' },
    { title: 'Continuous Improvement & Digital Transformation', desc: 'Proactive adoption of modern technologies, operational process automation, and platform modernization.' }
  ];
}
