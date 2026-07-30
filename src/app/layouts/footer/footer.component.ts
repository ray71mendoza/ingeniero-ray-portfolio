import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowUp, Github, Linkedin, Mail, MessageSquare, ShieldCheck, Heart } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <footer class="relative mt-24 border-t border-cyber-border-dark overflow-hidden bg-cyber-dark/90 text-gray-400">
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
              <span class="font-extrabold text-xl text-gray-100 tracking-tight">Ingeniero RAY</span>
            </div>
            
            <p class="text-sm leading-relaxed max-w-md text-gray-400">
              Arquitecto de Software Senior y Full Stack Engineer especializado en Angular 20+, arquitectura de sistemas de alto rendimiento, microservicios y experiencias digitales futuristas.
            </p>

            <div class="flex items-center gap-4 pt-2">
              <a href="https://github.com" target="_blank" aria-label="GitHub Profile"
                class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-110 transition-all duration-300">
                <lucide-icon [img]="GithubIcon" class="w-5 h-5"></lucide-icon>
              </a>
              <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn Profile"
                class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-110 transition-all duration-300">
                <lucide-icon [img]="LinkedinIcon" class="w-5 h-5"></lucide-icon>
              </a>
              <a href="mailto:ray.ingeniero@example.com" aria-label="Email Contact"
                class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-neon-cyan hover:border-neon-cyan/50 hover:scale-110 transition-all duration-300">
                <lucide-icon [img]="MailIcon" class="w-5 h-5"></lucide-icon>
              </a>
              <a href="https://wa.me/573000000000" target="_blank" aria-label="WhatsApp Contact"
                class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-neon-emerald hover:border-neon-emerald/50 hover:scale-110 transition-all duration-300">
                <lucide-icon [img]="WhatsappIcon" class="w-5 h-5"></lucide-icon>
              </a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4 font-mono">Navegación</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#hero" class="hover:text-neon-cyan transition-colors">Inicio</a></li>
              <li><a href="#about" class="hover:text-neon-cyan transition-colors">Sobre mí</a></li>
              <li><a href="#experience" class="hover:text-neon-cyan transition-colors">Experiencia</a></li>
              <li><a href="#projects" class="hover:text-neon-cyan transition-colors">Proyectos</a></li>
              <li><a href="#github" class="hover:text-neon-cyan transition-colors">GitHub API</a></li>
              <li><a href="#tech-stack" class="hover:text-neon-cyan transition-colors">Tecnologías</a></li>
            </ul>
          </div>

          <!-- Column 3: Stack & Status -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4 font-mono">Estado</h4>
            <div class="space-y-3 text-sm">
              <div class="flex items-center gap-2 text-neon-emerald font-medium">
                <span class="w-2.5 h-2.5 rounded-full bg-neon-emerald animate-ping"></span>
                Disponible para Proyectos & Consultoría
              </div>
              <p class="text-xs text-gray-500">Desarrollado con Angular 20+, Tailwind CSS y GSAP. Optimizado para Vercel.</p>
              <div class="pt-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                  <lucide-icon [img]="ShieldIcon" class="w-3.5 h-3.5"></lucide-icon>
                  WCAG AA Compliant
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-cyber-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-gray-500 font-mono">
            © {{ currentYear }} Ingeniero RAY. Todos los derechos reservados.
          </p>

          <!-- Scroll to Top Button -->
          <button 
            (click)="scrollToTop()"
            class="group flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:border-neon-cyan/50 text-xs font-medium text-gray-300 hover:text-neon-cyan transition-all duration-300">
            <span>Volver arriba</span>
            <lucide-icon [img]="ArrowUpIcon" class="w-4 h-4 group-hover:-translate-y-1 transition-transform"></lucide-icon>
          </button>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  themeService = inject(ThemeService);

  readonly ArrowUpIcon = ArrowUp;
  readonly GithubIcon = Github;
  readonly LinkedinIcon = Linkedin;
  readonly MailIcon = Mail;
  readonly WhatsappIcon = MessageSquare;
  readonly ShieldIcon = ShieldCheck;

  currentYear = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
