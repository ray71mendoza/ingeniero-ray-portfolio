import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowUp, Github, Linkedin, Mail, MessageSquare, ShieldCheck, FileText, ExternalLink } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <footer class="relative mt-24 border-t border-cyber-border-dark overflow-hidden bg-cyber-dark/95 text-gray-400">
      <!-- Animated Top Border Glow -->
      <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse"></div>

      <div class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <!-- Column 1: Brand & Bio -->
          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-gray-950 font-extrabold text-xl shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                R
              </div>
              <div>
                <span class="font-extrabold text-lg sm:text-xl text-gray-100 tracking-tight block">
                  {{ ts.contactData.fullName }}
                </span>
                <span class="text-xs text-neon-cyan font-mono">
                  {{ ts.currentLang() === 'es' ? 'Ingeniero de Sistemas · Líder Técnico' : 'Systems Engineer · Tech Lead' }}
                </span>
              </div>
            </div>
            
            <p class="text-sm leading-relaxed max-w-md text-gray-400">
              {{ ts.t().footer.bio }}
            </p>

            <div class="flex flex-wrap items-center gap-3 pt-2">
              <a [href]="ts.contactData.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"
                class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-110 transition-all duration-300">
                <lucide-icon [img]="LinkedinIcon" class="w-5 h-5"></lucide-icon>
              </a>
              <a [href]="'mailto:' + ts.contactData.email" aria-label="Email Contact"
                class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-110 transition-all duration-300">
                <lucide-icon [img]="MailIcon" class="w-5 h-5"></lucide-icon>
              </a>
              <a [href]="'https://wa.me/' + ts.contactData.phoneColombiaClean" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Colombia"
                title="WhatsApp Colombia: +57 312 491 6281"
                class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-neon-emerald hover:border-neon-emerald/50 hover:scale-110 transition-all duration-300">
                <lucide-icon [img]="WhatsappIcon" class="w-5 h-5"></lucide-icon>
              </a>
              <a [href]="ts.getCurrentCVLink()" target="_blank" rel="noopener noreferrer" aria-label="Descargar CV"
                title="Descargar Curriculum Vitae / Resume"
                class="px-3 h-10 rounded-full glass-panel flex items-center gap-1.5 text-xs font-mono text-neon-cyan hover:border-neon-cyan/50 hover:scale-105 transition-all duration-300">
                <lucide-icon [img]="FileIcon" class="w-4 h-4"></lucide-icon>
                <span>{{ ts.currentLang() === 'es' ? 'CV' : 'Resume' }}</span>
              </a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4 font-mono">
              {{ ts.t().footer.quickNav }}
            </h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#hero" class="hover:text-neon-cyan transition-colors">{{ ts.t().nav.hero }}</a></li>
              <li><a href="#about" class="hover:text-neon-cyan transition-colors">{{ ts.t().nav.about }}</a></li>
              <li><a href="#experience" class="hover:text-neon-cyan transition-colors">{{ ts.t().nav.experience }}</a></li>
              <li><a href="#projects" class="hover:text-neon-cyan transition-colors">{{ ts.t().nav.projects }}</a></li>
              <li><a href="#tech-stack" class="hover:text-neon-cyan transition-colors">{{ ts.t().nav.techStack }}</a></li>
              <li><a href="#certifications" class="hover:text-neon-cyan transition-colors">{{ ts.t().nav.certifications }}</a></li>
              <li><a href="#contact" class="hover:text-neon-cyan transition-colors">{{ ts.t().nav.contact }}</a></li>
            </ul>
          </div>

          <!-- Column 3: Contact & Status -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4 font-mono">
              {{ ts.t().footer.statusTitle }}
            </h4>
            <div class="space-y-3 text-sm">
              <div class="flex items-center gap-2 text-neon-emerald font-medium text-xs">
                <span class="w-2.5 h-2.5 rounded-full bg-neon-emerald animate-ping"></span>
                {{ ts.t().footer.statusDesc }}
              </div>
              <div class="text-xs text-gray-400 space-y-1 font-mono">
                <p>🇨🇴 {{ ts.contactData.phoneColombia }}</p>
                <p>🇪🇸 {{ ts.contactData.phoneSpain }}</p>
                <p class="truncate">✉️ {{ ts.contactData.email }}</p>
              </div>
              <div class="pt-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                  <lucide-icon [img]="ShieldIcon" class="w-3.5 h-3.5"></lucide-icon>
                  ISO 27001 & Scrum Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-cyber-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-gray-500 font-mono">
            © {{ currentYear }} {{ ts.contactData.fullName }}. {{ ts.t().footer.rights }}
          </p>

          <!-- Scroll to Top Button -->
          <button 
            (click)="scrollToTop()"
            class="group flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-neon-cyan/50 text-xs font-medium text-gray-300 hover:text-neon-cyan transition-all duration-300">
            <span>{{ ts.t().footer.backToTop }}</span>
            <lucide-icon [img]="ArrowUpIcon" class="w-4 h-4 group-hover:-translate-y-1 transition-transform"></lucide-icon>
          </button>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  themeService = inject(ThemeService);
  ts = inject(TranslationService);

  readonly ArrowUpIcon = ArrowUp;
  readonly GithubIcon = Github;
  readonly LinkedinIcon = Linkedin;
  readonly MailIcon = Mail;
  readonly WhatsappIcon = MessageSquare;
  readonly ShieldIcon = ShieldCheck;
  readonly FileIcon = FileText;

  currentYear = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
