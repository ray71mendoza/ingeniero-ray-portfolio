import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sun, Moon, Menu, X, Globe, Sparkles, Download, ExternalLink } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header 
      class="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 lg:px-8 py-3"
      [class.bg-cyber-dark\/90]="isScrolled() && themeService.currentTheme() === 'dark'"
      [class.bg-white\/90]="isScrolled() && themeService.currentTheme() === 'light'"
      [class.backdrop-blur-xl]="isScrolled()"
      [class.border-b]="isScrolled()"
      [class.border-cyber-border-dark]="isScrolled() && themeService.currentTheme() === 'dark'"
      [class.border-cyber-border-light]="isScrolled() && themeService.currentTheme() === 'light'"
      [class.shadow-lg]="isScrolled()">
      
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Brand Logo -->
        <a href="#hero" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.4)] group-hover:scale-105 transition-transform duration-300">
            <span class="text-gray-950 font-extrabold text-xl tracking-tighter">R</span>
          </div>
          <div class="flex flex-col">
            <span class="font-extrabold text-base sm:text-lg tracking-wide group-hover:text-neon-cyan transition-colors flex items-center gap-1.5">
              Ray Mendoza
              <span class="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
            </span>
            <span class="text-[10px] uppercase tracking-widest text-gray-400 font-mono">
              {{ ts.currentLang() === 'es' ? 'Ingeniero de Sistemas' : 'Systems Engineer' }}
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden xl:flex items-center gap-1 bg-cyber-card-dark/40 border border-cyber-border-dark backdrop-blur-md px-4 py-1.5 rounded-full shadow-inner">
          <a 
            *ngFor="let item of navItems"
            [href]="'#' + item.id"
            (click)="setActiveSection(item.id)"
            class="px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
            [class.text-neon-cyan]="activeSection() === item.id"
            [class.bg-neon-cyan\/10]="activeSection() === item.id"
            [class.text-gray-300]="activeSection() !== item.id && themeService.currentTheme() === 'dark'"
            [class.text-gray-700]="activeSection() !== item.id && themeService.currentTheme() === 'light'"
            [class.hover:text-neon-cyan]="true">
            {{ getNavLabel(item.id) }}
          </a>
        </nav>

        <!-- Header Actions: Language Switch, Theme Toggle, CV & Contact -->
        <div class="flex items-center gap-2 sm:gap-3">
          
          <!-- Language Selector Switch (ES / EN) -->
          <div class="flex items-center bg-cyber-dark/80 border border-cyber-border-dark rounded-full p-0.5 shadow-inner">
            <button 
              (click)="ts.setLanguage('es')"
              [class.bg-gradient-to-r]="ts.currentLang() === 'es'"
              [class.from-neon-cyan]="ts.currentLang() === 'es'"
              [class.to-neon-blue]="ts.currentLang() === 'es'"
              [class.text-gray-950]="ts.currentLang() === 'es'"
              [class.font-extrabold]="ts.currentLang() === 'es'"
              [class.text-gray-400]="ts.currentLang() !== 'es'"
              class="px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-300">
              ES
            </button>
            <button 
              (click)="ts.setLanguage('en')"
              [class.bg-gradient-to-r]="ts.currentLang() === 'en'"
              [class.from-neon-cyan]="ts.currentLang() === 'en'"
              [class.to-neon-blue]="ts.currentLang() === 'en'"
              [class.text-gray-950]="ts.currentLang() === 'en'"
              [class.font-extrabold]="ts.currentLang() === 'en'"
              [class.text-gray-400]="ts.currentLang() !== 'en'"
              class="px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-300">
              EN
            </button>
          </div>

          <!-- Theme Toggle Button -->
          <button 
            (click)="themeService.toggleTheme()"
            aria-label="Cambiar Tema"
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-panel flex items-center justify-center text-neon-cyan hover:scale-105 hover:border-neon-cyan/50 transition-all duration-300">
            @if (themeService.currentTheme() === 'dark') {
              <lucide-icon [img]="SunIcon" class="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 animate-spin-slow"></lucide-icon>
            } @else {
              <lucide-icon [img]="MoonIcon" class="w-4 h-4 sm:w-5 sm:h-5 text-neon-indigo"></lucide-icon>
            }
          </button>

          <!-- Direct CV Download Link -->
          <a 
            [href]="ts.getCurrentCVLink()" 
            target="_blank"
            rel="noopener noreferrer"
            class="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-neon-cyan/40 hover:border-neon-cyan text-xs font-medium text-neon-cyan hover:scale-105 transition-all">
            <lucide-icon [img]="DownloadIcon" class="w-3.5 h-3.5"></lucide-icon>
            <span>{{ ts.currentLang() === 'es' ? 'CV' : 'Resume' }}</span>
          </a>

          <!-- Contact CTA Button -->
          <a 
            href="#contact" 
            class="hidden sm:flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-gray-950 font-bold text-xs shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] hover:scale-105 transition-all duration-300">
            <lucide-icon [img]="SparklesIcon" class="w-3.5 h-3.5"></lucide-icon>
            {{ ts.t().nav.ctaTalk }}
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            (click)="toggleMobileMenu()"
            aria-label="Abrir Menú"
            class="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-panel flex items-center justify-center text-gray-200">
            @if (mobileMenuOpen()) {
              <lucide-icon [img]="XIcon" class="w-5 h-5 text-neon-cyan"></lucide-icon>
            } @else {
              <lucide-icon [img]="MenuIcon" class="w-5 h-5"></lucide-icon>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Navigation -->
      @if (mobileMenuOpen()) {
        <div class="xl:hidden mt-4 glass-panel rounded-2xl p-6 border border-cyber-border-dark animate-in fade-in slide-in-from-top duration-300">
          
          <!-- Mobile Language Selector -->
          <div class="flex items-center justify-between pb-4 mb-3 border-b border-cyber-border-dark">
            <span class="text-xs font-mono text-gray-400">
              {{ ts.currentLang() === 'es' ? 'Idioma / Language:' : 'Language / Idioma:' }}
            </span>
            <div class="flex items-center bg-cyber-dark border border-cyber-border-dark rounded-full p-0.5">
              <button 
                (click)="ts.setLanguage('es')"
                [class.bg-neon-cyan]="ts.currentLang() === 'es'"
                [class.text-gray-950]="ts.currentLang() === 'es'"
                [class.font-bold]="ts.currentLang() === 'es'"
                [class.text-gray-400]="ts.currentLang() !== 'es'"
                class="px-3 py-1 rounded-full text-xs font-mono">
                Español
              </button>
              <button 
                (click)="ts.setLanguage('en')"
                [class.bg-neon-cyan]="ts.currentLang() === 'en'"
                [class.text-gray-950]="ts.currentLang() === 'en'"
                [class.font-bold]="ts.currentLang() === 'en'"
                [class.text-gray-400]="ts.currentLang() !== 'en'"
                class="px-3 py-1 rounded-full text-xs font-mono">
                English
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            @for (item of navItems; track item.id) {
              <a 
                [href]="'#' + item.id"
                (click)="onMobileNavClick(item.id)"
                class="px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-between"
                [class.text-neon-cyan]="activeSection() === item.id"
                [class.bg-neon-cyan\/10]="activeSection() === item.id"
                [class.text-gray-300]="activeSection() !== item.id">
                {{ getNavLabel(item.id) }}
                <span class="text-xs font-mono opacity-40">#{{ item.id }}</span>
              </a>
            }

            <div class="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-cyber-border-dark">
              <a 
                [href]="ts.getCurrentCVLink()"
                target="_blank"
                rel="noopener noreferrer"
                class="text-center py-2.5 rounded-xl glass-panel border border-neon-cyan/40 text-neon-cyan font-bold text-xs flex items-center justify-center gap-1.5">
                <lucide-icon [img]="DownloadIcon" class="w-3.5 h-3.5"></lucide-icon>
                {{ ts.currentLang() === 'es' ? 'Descargar CV' : 'Download CV' }}
              </a>

              <a 
                href="#contact"
                (click)="mobileMenuOpen.set(false)"
                class="text-center py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-gray-950 font-bold text-xs shadow-md flex items-center justify-center gap-1.5">
                <lucide-icon [img]="SparklesIcon" class="w-3.5 h-3.5"></lucide-icon>
                {{ ts.t().nav.ctaTalk }}
              </a>
            </div>
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  ts = inject(TranslationService);

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly GlobeIcon = Globe;
  readonly SparklesIcon = Sparkles;
  readonly DownloadIcon = Download;
  readonly ExternalIcon = ExternalLink;

  isScrolled = signal<boolean>(false);
  activeSection = signal<string>('hero');
  mobileMenuOpen = signal<boolean>(false);

  readonly navItems = [
    { id: 'hero' },
    { id: 'about' },
    { id: 'experience' },
    { id: 'projects' },
    { id: 'github' },
    { id: 'tech-stack' },
    { id: 'services' },
    { id: 'certifications' },
    { id: 'contact' }
  ];

  getNavLabel(id: string): string {
    const nav = this.ts.t().nav;
    switch (id) {
      case 'hero': return nav.hero;
      case 'about': return nav.about;
      case 'experience': return nav.experience;
      case 'projects': return nav.projects;
      case 'github': return nav.github;
      case 'tech-stack': return nav.techStack;
      case 'services': return nav.services;
      case 'certifications': return nav.certifications;
      case 'contact': return nav.contact;
      default: return id;
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 30);
  }

  setActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  onMobileNavClick(sectionId: string): void {
    this.setActiveSection(sectionId);
    this.mobileMenuOpen.set(false);
  }
}
