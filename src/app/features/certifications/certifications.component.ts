import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Award, ExternalLink, FileText, CheckCircle2, ShieldCheck } from 'lucide-angular';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { CertificationItem } from '../../models/portfolio.models';

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
            <span>Acreditación Técnica</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Certificaciones <span class="text-gradient-purple">Oficiales</span>
          </h2>
          <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Validación de competencias otorgada por instituciones tecnológicas internacionales.
          </p>
        </div>

        <!-- Certifications Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (cert of certsList; track cert.id) {
            <div appTilt [maxTilt]="8" class="h-full">
              <app-glass-card className="h-full space-y-4 flex flex-col justify-between border border-cyber-border-dark hover:border-neon-purple/50 transition-all duration-300 group">
                
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-mono px-2.5 py-1 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/30">
                      {{ cert.institution }}
                    </span>
                    <span class="text-xs font-mono text-gray-400">{{ cert.issueDate }}</span>
                  </div>

                  <h3 class="text-lg font-bold text-gray-100 group-hover:text-neon-purple transition-colors">
                    {{ cert.title }}
                  </h3>

                  <div class="flex flex-wrap gap-1.5 pt-2">
                    @for (skill of cert.skills; track skill) {
                      <span class="px-2 py-0.5 rounded bg-cyber-dark text-[10px] font-mono text-gray-400 border border-cyber-border-dark">
                        {{ skill }}
                      </span>
                    }
                  </div>
                </div>

                <div class="pt-4 border-t border-cyber-border-dark flex items-center justify-between">
                  <button (click)="viewPDF(cert)" class="text-xs font-mono text-neon-cyan hover:underline flex items-center gap-1.5">
                    <lucide-icon [img]="FileIcon" class="w-4 h-4"></lucide-icon>
                    Ver Credencial PDF
                  </button>

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
  readonly AwardIcon = Award;
  readonly ExternalIcon = ExternalLink;
  readonly FileIcon = FileText;
  readonly ShieldCheckIcon = ShieldCheck;

  readonly certsList: CertificationItem[] = [
    {
      id: 'c1',
      title: 'Angular Certified Solution Architect',
      institution: 'Angular Institute',
      issueDate: '2024',
      imageUrl: '',
      skills: ['Angular 20', 'Signals', 'RxJS', 'Enterprise Architecture']
    },
    {
      id: 'c2',
      title: 'AWS Certified Solutions Architect – Associate',
      institution: 'Amazon Web Services',
      issueDate: '2023',
      imageUrl: '',
      skills: ['Cloud Architecture', 'S3', 'ECS', 'CloudFront', 'Serverless']
    },
    {
      id: 'c3',
      title: 'Certified Ethical Hacker (CEH) / OWASP Security',
      institution: 'EC-Council',
      issueDate: '2022',
      imageUrl: '',
      skills: ['Pentesting', 'OWASP Top 10', 'AES-256', 'Network Hardening']
    }
  ];

  viewPDF(cert: CertificationItem): void {
    alert(`Visualizando credencial verificada de ${cert.title} - ${cert.institution}`);
  }
}
