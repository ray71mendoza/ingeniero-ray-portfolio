import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Award, ExternalLink, FileText, CheckCircle2, ShieldCheck, Download, Clock, Star } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { CertificationItem } from '../../models/portfolio.models';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GlassCardComponent, TiltDirective],
  template: `
    <section id="certifications" class="py-20 relative">
      <div class="max-w-7xl mx-auto px-6">
        
        <!-- Header -->
        <div class="text-center space-y-4 mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-neon-purple/30 text-xs font-mono text-neon-purple">
            <lucide-icon [img]="AwardIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>{{ ts.t().certifications.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {{ ts.t().certifications.title }} <span class="text-gradient-purple">{{ ts.t().certifications.titleAccent }}</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {{ ts.t().certifications.subtitle }}
          </p>

          <!-- Download All Certificates Button -->
          <div class="pt-2">
            <a 
              [href]="ts.links.certificates"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold text-xs shadow-[0_0_20px_rgba(112,0,255,0.4)] hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] hover:scale-105 transition-all">
              <lucide-icon [img]="DownloadIcon" class="w-4 h-4"></lucide-icon>
              <span>{{ ts.t().certifications.btnDownloadAll }}</span>
              <lucide-icon [img]="ExternalIcon" class="w-3.5 h-3.5"></lucide-icon>
            </a>
          </div>
        </div>

        <!-- Certifications Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (cert of certsList; track cert.id) {
            <div appTilt [maxTilt]="6" class="h-full">
              <app-glass-card className="h-full space-y-4 flex flex-col justify-between border border-cyber-border-dark hover:border-neon-purple/50 transition-all duration-300 group bg-cyber-dark/85">
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/30 truncate max-w-[200px]" [title]="cert.institution">
                      {{ cert.institution }}
                    </span>
                    <span class="text-xs font-mono text-gray-400 shrink-0">{{ cert.issueDate }}</span>
                  </div>

                  <h3 class="text-base sm:text-lg font-bold text-gray-100 group-hover:text-neon-purple transition-colors leading-snug">
                    {{ cert.title }}
                  </h3>

                  <!-- Hours & Score Badges -->
                  <div class="flex flex-wrap items-center gap-2 pt-1">
                    @if (cert.hours) {
                      <span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-cyber-dark border border-cyber-border-dark text-gray-300">
                        <lucide-icon [img]="ClockIcon" class="w-3 h-3 text-neon-cyan"></lucide-icon>
                        {{ cert.hours }} {{ ts.t().certifications.hoursLabel }}
                      </span>
                    }
                    @if (cert.score) {
                      <span class="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-cyber-dark border border-cyber-border-dark text-amber-300">
                        <lucide-icon [img]="StarIcon" class="w-3 h-3 text-amber-400"></lucide-icon>
                        {{ ts.t().certifications.scoreLabel }}: {{ cert.score }}/10
                      </span>
                    }
                  </div>

                  <!-- Skills Badges -->
                  <div class="flex flex-wrap gap-1.5 pt-2">
                    @for (skill of cert.skills; track skill) {
                      <span class="px-2 py-0.5 rounded bg-cyber-dark text-[10px] font-mono text-gray-400 border border-cyber-border-dark">
                        {{ skill }}
                      </span>
                    }
                  </div>
                </div>

                <div class="pt-4 border-t border-cyber-border-dark flex items-center justify-between">
                  <a 
                    [href]="ts.links.certificates"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1.5">
                    <lucide-icon [img]="FileIcon" class="w-4 h-4"></lucide-icon>
                    <span>{{ ts.t().certifications.btnView }}</span>
                  </a>

                  <lucide-icon [img]="ShieldCheckIcon" class="w-5 h-5 text-neon-emerald"></lucide-icon>
                </div>

              </app-glass-card>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class CertificationsComponent {
  ts = inject(TranslationService);

  readonly AwardIcon = Award;
  readonly ExternalIcon = ExternalLink;
  readonly FileIcon = FileText;
  readonly ShieldCheckIcon = ShieldCheck;
  readonly DownloadIcon = Download;
  readonly ClockIcon = Clock;
  readonly StarIcon = Star;

  readonly certsList: CertificationItem[] = [
    {
      id: 'cert-ofimatica',
      title: 'Técnico en Informática (Ofimática)',
      institution: 'Fundación Carlos Slim - Capacítate para el Empleo',
      issueDate: '20 Feb 2025',
      hours: 91,
      score: 8.67,
      skills: ['Ofimática Avanzada', 'Sistemas de Información', 'Productividad Digital']
    },
    {
      id: 'cert-rep-telefonico',
      title: 'Representante Telefónico',
      institution: 'Fundación Carlos Slim - Capacítate para el Empleo',
      issueDate: '21 Feb 2025',
      hours: 28,
      score: 9.14,
      skills: ['Atención a Usuarios', 'Resolución de Conflictos', 'Comunicación Asertiva']
    },
    {
      id: 'cert-ethical-hacking',
      title: 'Ethical Hacking y Pentesting',
      institution: 'Academia Hacker Mentor',
      issueDate: '10 Sep 2024',
      hours: 8,
      skills: ['Ethical Hacking', 'Pentesting', 'Análisis de Vulnerabilidades', 'Ciberseguridad']
    },
    {
      id: 'cert-robotica-rv',
      title: 'Curso de Robótica y Realidad Virtual',
      institution: 'RobóTICos / Etraining / MinTIC / Colciencias',
      issueDate: '30 Ago 2017',
      hours: 80,
      skills: ['Robótica Educativa', 'Realidad Virtual', 'Programación y Algoritmia']
    },
    {
      id: 'cert-utb-linked',
      title: 'UTB Linked Class 2022-1',
      institution: 'Universidad Tecnológica de Bolívar (Internacionalización)',
      issueDate: 'Feb – May 2022',
      skills: ['Internacionalización', 'Colaboración Global', 'Ingeniería de Sistemas']
    },
    {
      id: 'cert-capc',
      title: 'Cybersecurity Awareness Professional Certification (CAPC™)',
      institution: 'CertiProf International',
      issueDate: '2024',
      skills: ['Cybersecurity Awareness', 'ISO 27001', 'Seguridad de la Información']
    },
    {
      id: 'cert-talento-tech',
      title: 'Ciberseguridad Nivel Básico',
      institution: 'Bootcamp MinTIC / Universidad Tecnológica de Bolívar / Talento Tech 2.0',
      issueDate: '18 Jun 2025',
      hours: 159,
      skills: ['Ciberseguridad Defensiva', 'NIST Framework', 'Seguridad en Redes', 'Hardening']
    }
  ];
}
