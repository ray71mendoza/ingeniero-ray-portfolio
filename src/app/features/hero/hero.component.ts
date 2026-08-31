import { Component, ElementRef, OnInit, OnDestroy, ViewChild, signal, inject, PLATFORM_ID, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, ArrowRight, Download, Sparkles, Code, Cpu, ShieldCheck, Terminal, Github, Linkedin, Mail, FileText, ChevronDown } from 'lucide-angular';
import Typed from 'typed.js';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TiltDirective],
  template: `
    <section id="hero" class="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <!-- Animated Background Lights -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-neon-cyan/20 to-neon-purple/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <!-- Left Side: Hero Text & Call to Actions -->
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <!-- Availability Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-neon-cyan/30 text-xs font-mono text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.15)] animate-float">
            <span class="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping"></span>
            <span>{{ ts.t().hero.badge }}</span>
          </div>

          <!-- Main Title -->
          <div class="space-y-2">
            <h1 class="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-gray-100">
              <span class="text-gray-400 font-medium text-xl sm:text-2xl block mb-1">{{ ts.t().hero.greeting }}</span>
              <span class="text-gradient-cyan">{{ ts.contactData.fullName }}</span>
            </h1>
            <div class="h-12 text-lg sm:text-2xl font-mono text-neon-cyan flex items-center justify-center lg:justify-start gap-2">
              <span class="text-gray-400 font-normal">&gt;</span>
              <span #typedElement class="font-semibold text-gray-200"></span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
            {{ ts.t().hero.bio }}
          </p>

          <!-- CTAs & Buttons -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
            
            <!-- Explore Projects Button -->
            <a href="#projects"
              class="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-gray-950 font-extrabold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.7)] hover:scale-105 transition-all duration-300">
              <span>{{ ts.t().hero.btnProjects }}</span>
              <lucide-icon [img]="ArrowRightIcon" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></lucide-icon>
            </a>

            <!-- Contact Direct Button -->
            <a href="#contact"
              class="px-6 py-3.5 rounded-xl glass-panel glass-panel-hover border border-cyber-border-dark text-gray-200 font-bold text-sm flex items-center gap-2">
              <lucide-icon [img]="SparklesIcon" class="w-4 h-4 text-neon-cyan"></lucide-icon>
              <span>{{ ts.t().hero.btnContact }}</span>
            </a>

            <!-- Download CV / Documents Dropdown -->
            <div class="relative inline-block text-left">
              <button 
                (click)="toggleDownloadMenu()"
                class="px-5 py-3.5 rounded-xl glass-panel hover:border-neon-cyan/50 text-neon-cyan font-semibold text-sm flex items-center gap-2 transition-all">
                <lucide-icon [img]="DownloadIcon" class="w-4 h-4"></lucide-icon>
                <span>{{ ts.t().hero.btnDownloadCV }}</span>
                <lucide-icon [img]="ChevronDownIcon" class="w-3.5 h-3.5 opacity-70"></lucide-icon>
              </button>

              @if (downloadMenuOpen()) {
                <div class="absolute left-0 lg:left-0 right-0 sm:right-auto mt-2 w-64 rounded-2xl glass-panel border border-neon-cyan/40 p-2 shadow-2xl z-30 animate-in fade-in zoom-in duration-200 bg-cyber-dark/95 backdrop-blur-xl">
                  <a 
                    [href]="ts.links.cvSpanish" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    (click)="downloadMenuOpen.set(false)"
                    class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-200 hover:bg-neon-cyan/10 hover:text-neon-cyan transition-colors">
                    <lucide-icon [img]="FileIcon" class="w-4 h-4 text-neon-cyan"></lucide-icon>
                    <span>Descargar CV (Español)</span>
                  </a>
                  <a 
                    [href]="ts.links.cvEnglish" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    (click)="downloadMenuOpen.set(false)"
                    class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-200 hover:bg-neon-cyan/10 hover:text-neon-cyan transition-colors">
                    <lucide-icon [img]="FileIcon" class="w-4 h-4 text-neon-purple"></lucide-icon>
                    <span>Download Resume (English)</span>
                  </a>
                  <a 
                    [href]="ts.links.certificates" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    (click)="downloadMenuOpen.set(false)"
                    class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-200 hover:bg-neon-emerald/10 hover:text-neon-emerald transition-colors border-t border-cyber-border-dark mt-1 pt-2">
                    <lucide-icon [img]="ShieldIcon" class="w-4 h-4 text-neon-emerald"></lucide-icon>
                    <span>Descargar Certificados (Drive)</span>
                  </a>
                </div>
              }
            </div>

          </div>

          <!-- Quick Metrics Bar -->
          <div class="pt-8 border-t border-cyber-border-dark/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-extrabold text-neon-cyan font-mono">{{ ts.t().hero.metric1Value }}</div>
              <div class="text-xs text-gray-400 font-mono uppercase">{{ ts.t().hero.metric1Label }}</div>
            </div>
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-extrabold text-neon-purple font-mono">{{ ts.t().hero.metric2Value }}</div>
              <div class="text-xs text-gray-400 font-mono uppercase">{{ ts.t().hero.metric2Label }}</div>
            </div>
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-extrabold text-neon-emerald font-mono">{{ ts.t().hero.metric3Value }}</div>
              <div class="text-xs text-gray-400 font-mono uppercase">{{ ts.t().hero.metric3Label }}</div>
            </div>
          </div>

        </div>

        <!-- Right Side: Profile Photo Frame & Floating Badges -->
        <div class="lg:col-span-5 flex justify-center relative">
          
          <div appTilt [maxTilt]="10" class="relative group cursor-pointer max-w-sm sm:max-w-md w-full">
            
            <!-- Glowing Ambient Ring behind Photo -->
            <div class="absolute -inset-1.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

            <!-- Profile Photo Container -->
            <div class="relative rounded-3xl p-2 glass-panel border border-neon-cyan/30 overflow-hidden bg-cyber-dark">
              
              <img 
                src="assets/images/profile.jpg" 
                alt="Ray Sebastián Mendoza Torres" 
                class="w-full h-[420px] object-cover object-center rounded-2xl group-hover:scale-105 transition-transform duration-700 filter brightness-105 contrast-105" />

              <!-- Overlay Gradient at bottom of photo -->
              <div class="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-80"></div>

              <!-- Profile Badge Tag -->
              <div class="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-panel border border-cyber-border-dark flex items-center justify-between backdrop-blur-md">
                <div>
                  <h3 class="font-bold text-sm text-gray-100">{{ ts.contactData.fullName }}</h3>
                  <p class="text-xs text-neon-cyan font-mono">
                    {{ ts.currentLang() === 'es' ? 'Ingeniero de Sistemas' : 'Systems Engineer' }}
                  </p>
                </div>
                <a [href]="ts.contactData.linkedin" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan hover:scale-110 transition-transform">
                  <lucide-icon [img]="LinkedinIcon" class="w-4 h-4"></lucide-icon>
                </a>
              </div>
            </div>

            <!-- Floating Cyber Badges -->
            <div class="absolute -top-4 -right-4 glass-panel border border-neon-purple/40 px-3 py-2 rounded-xl text-xs font-mono text-neon-purple shadow-neon-purple flex items-center gap-2 animate-float">
              <lucide-icon [img]="CpuIcon" class="w-4 h-4 text-neon-purple"></lucide-icon>
              <span>Full Stack & Tech Lead</span>
            </div>

            <div class="absolute -bottom-4 -left-4 glass-panel border border-neon-emerald/40 px-3 py-2 rounded-xl text-xs font-mono text-neon-emerald shadow-lg flex items-center gap-2 animate-float" style="animation-delay: 2s;">
              <lucide-icon [img]="ShieldIcon" class="w-4 h-4 text-neon-emerald"></lucide-icon>
              <span>Scrum & ISO 27001</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class HeroComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  ts = inject(TranslationService);
  
  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;

  readonly ArrowRightIcon = ArrowRight;
  readonly DownloadIcon = Download;
  readonly SparklesIcon = Sparkles;
  readonly CodeIcon = Code;
  readonly CpuIcon = Cpu;
  readonly ShieldIcon = ShieldCheck;
  readonly FileIcon = FileText;
  readonly ChevronDownIcon = ChevronDown;
  readonly LinkedinIcon = Linkedin;

  downloadMenuOpen = signal<boolean>(false);
  private typedInstance: Typed | null = null;

  constructor() {
    effect(() => {
      const strings = this.ts.t().hero.typedStrings;
      this.initTyped(strings);
    });
  }

  ngOnInit(): void {
    // Initialized in effect
  }

  ngOnDestroy(): void {
    if (this.typedInstance) {
      this.typedInstance.destroy();
    }
  }

  private initTyped(strings: string[]): void {
    if (isPlatformBrowser(this.platformId) && this.typedElement) {
      if (this.typedInstance) {
        this.typedInstance.destroy();
      }
      this.typedInstance = new Typed(this.typedElement.nativeElement, {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
      });
    }
  }

  toggleDownloadMenu(): void {
    this.downloadMenuOpen.update(v => !v);
  }
}
