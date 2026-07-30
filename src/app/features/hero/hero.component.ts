import { Component, ElementRef, OnInit, ViewChild, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, ArrowRight, Download, Sparkles, Code, Cpu, ShieldCheck, Terminal, Github, Linkedin, Mail } from 'lucide-angular';
import Typed from 'typed.js';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TiltDirective],
  template: `
    <section id="hero" class="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      <!-- Animated Background Lights -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-neon-cyan/20 to-neon-purple/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <!-- Left Side: Hero Text & Call to Actions -->
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <!-- Availability Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.15)] animate-float">
            <span class="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping"></span>
            <span>Disponible para Proyectos & Consultoría Arquitectónica</span>
          </div>

          <!-- Main Title -->
          <div class="space-y-2">
            <h1 class="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-none text-gray-100">
              Hola, soy el <br class="hidden sm:inline" />
              <span class="text-gradient-cyan">Ingeniero RAY</span>
            </h1>
            <div class="h-10 text-xl sm:text-2xl font-mono text-neon-cyan flex items-center justify-center lg:justify-start gap-2">
              <span class="text-gray-400 font-normal">&gt;</span>
              <span #typedElement class="font-semibold text-gray-200"></span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Arquitecto de Software Senior y Full Stack Engineer especializado en **Angular 20+**, desarrollo de aplicaciones web escalables, arquitecturas orientadas a eventos y optimización de rendimiento de nivel empresarial.
          </p>

          <!-- CTAs & Buttons -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <a href="#projects"
              class="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-gray-950 font-extrabold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.7)] hover:scale-105 transition-all duration-300">
              <span>Explorar Proyectos</span>
              <lucide-icon [img]="ArrowRightIcon" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></lucide-icon>
            </a>

            <a href="#contact"
              class="px-7 py-3.5 rounded-xl glass-panel glass-panel-hover border border-cyber-border-dark text-gray-200 font-bold text-sm flex items-center gap-2">
              <lucide-icon [img]="SparklesIcon" class="w-4 h-4 text-neon-cyan"></lucide-icon>
              <span>Contacto Directo</span>
            </a>

            <button (click)="downloadCV()"
              class="px-5 py-3.5 rounded-xl glass-panel hover:border-neon-cyan/50 text-gray-300 font-medium text-sm flex items-center gap-2 hover:text-neon-cyan transition-colors">
              <lucide-icon [img]="DownloadIcon" class="w-4 h-4"></lucide-icon>
              <span>Descargar CV</span>
            </button>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="pt-8 border-t border-cyber-border-dark/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-extrabold text-neon-cyan font-mono">10+</div>
              <div class="text-xs text-gray-400 font-mono uppercase">Años Exp.</div>
            </div>
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-extrabold text-neon-purple font-mono">50+</div>
              <div class="text-xs text-gray-400 font-mono uppercase">Proyectos</div>
            </div>
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-extrabold text-neon-emerald font-mono">99.9%</div>
              <div class="text-xs text-gray-400 font-mono uppercase">Uptime Rate</div>
            </div>
          </div>

        </div>

        <!-- Right Side: Interactive Profile Photo Frame & Floating Badges -->
        <div class="lg:col-span-5 flex justify-center relative">
          
          <div appTilt [maxTilt]="10" class="relative group cursor-pointer max-w-sm sm:max-w-md w-full">
            
            <!-- Glowing Ambient Ring behind Photo -->
            <div class="absolute -inset-1.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

            <!-- Profile Photo Container -->
            <div class="relative rounded-3xl p-2 glass-panel border border-neon-cyan/30 overflow-hidden bg-cyber-dark">
              
              <img 
                src="assets/images/profile.jpg" 
                alt="Ingeniero RAY - Arquitecto de Software" 
                class="w-full h-[420px] object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105" />

              <!-- Overlay Gradient at bottom of photo -->
              <div class="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-80"></div>

              <!-- Profile Badge Tag -->
              <div class="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-panel border border-cyber-border-dark flex items-center justify-between backdrop-blur-md">
                <div>
                  <h3 class="font-bold text-sm text-gray-100">Ingeniero RAY</h3>
                  <p class="text-xs text-neon-cyan font-mono">Senior Software Architect</p>
                </div>
                <div class="w-8 h-8 rounded-lg bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan">
                  <lucide-icon [img]="CodeIcon" class="w-4 h-4"></lucide-icon>
                </div>
              </div>
            </div>

            <!-- Floating Cyber Badges -->
            <div class="absolute -top-4 -right-4 glass-panel border border-neon-purple/40 px-3 py-2 rounded-xl text-xs font-mono text-neon-purple shadow-neon-purple flex items-center gap-2 animate-float">
              <lucide-icon [img]="CpuIcon" class="w-4 h-4 text-neon-purple"></lucide-icon>
              <span>Angular 20+ Specialist</span>
            </div>

            <div class="absolute -bottom-4 -left-4 glass-panel border border-neon-emerald/40 px-3 py-2 rounded-xl text-xs font-mono text-neon-emerald shadow-lg flex items-center gap-2 animate-float" style="animation-delay: 2s;">
              <lucide-icon [img]="ShieldIcon" class="w-4 h-4 text-neon-emerald"></lucide-icon>
              <span>Clean Code & SOLID</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class HeroComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;

  readonly ArrowRightIcon = ArrowRight;
  readonly DownloadIcon = Download;
  readonly SparklesIcon = Sparkles;
  readonly CodeIcon = Code;
  readonly CpuIcon = Cpu;
  readonly ShieldIcon = ShieldCheck;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.typedElement) {
      new Typed(this.typedElement.nativeElement, {
        strings: [
          'Arquitecto de Software',
          'Angular Expert (v20+)',
          'Senior Full Stack Developer',
          'Especialista en Ciberseguridad & Cloud'
        ],
        typeSpeed: 60,
        backSpeed: 35,
        backDelay: 2000,
        loop: true
      });
    }
  }

  downloadCV(): void {
    alert('Iniciando descarga del Curriculum Vitae de Ingeniero RAY...');
  }
}
