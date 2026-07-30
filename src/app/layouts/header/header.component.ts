import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sun, Moon, Menu, X, Code2, Sparkles } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header 
      class="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 lg:px-8 py-4"
      [class.bg-cyber-dark\/80]="isScrolled() && themeService.currentTheme() === 'dark'"
      [class.bg-white\/80]="isScrolled() && themeService.currentTheme() === 'light'"
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
            <span class="font-extrabold text-lg tracking-wide group-hover:text-neon-cyan transition-colors flex items-center gap-1.5">
              Ingeniero RAY
              <span class="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
            </span>
            <span class="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Software Architect</span>
          </div>
        </a>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden lg:flex items-center gap-1 bg-cyber-card-dark/40 border border-cyber-border-dark backdrop-blur-md px-4 py-1.5 rounded-full shadow-inner">
          @for (item of navItems; track item.id) {
            <a 
              [href]="'#' + item.id"
              (click)="setActiveSection(item.id)"
              class="px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
              [class.text-neon-cyan]="activeSection() === item.id"
              [class.bg-neon-cyan\/10]="activeSection() === item.id"
              [class.text-gray-300]="activeSection() !== item.id && themeService.currentTheme() === 'dark'"
              [class.text-gray-700]="activeSection() !== item.id && themeService.currentTheme() === 'light'"
              [class.hover:text-neon-cyan]="true">
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Header Actions: Theme Toggle & Mobile Menu -->
        <div class="flex items-center gap-3">
          <!-- Theme Toggle Button -->
          <button 
            (click)="themeService.toggleTheme()"
            aria-label="Cambiar Tema"
            class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-neon-cyan hover:scale-110 hover:border-neon-cyan/50 transition-all duration-300">
            @if (themeService.currentTheme() === 'dark') {
              <lucide-icon [img]="SunIcon" class="w-5 h-5 text-amber-400 animate-spin-slow"></lucide-icon>
            } @else {
              <lucide-icon [img]="MoonIcon" class="w-5 h-5 text-neon-indigo"></lucide-icon>
            }
          </button>

          <!-- Contact CTA Button (Desktop) -->
          <a 
            href="#contact" 
            class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue text-gray-950 font-bold text-xs shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] hover:scale-105 transition-all duration-300">
            <lucide-icon [img]="SparklesIcon" class="w-3.5 h-3.5"></lucide-icon>
            Contacto
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            (click)="toggleMobileMenu()"
            aria-label="Abrir Menú"
            class="lg:hidden w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-gray-200">
            @if (mobileMenuOpen()) {
              <lucide-icon [img]="XIcon" class="w-6 h-6 text-neon-cyan"></lucide-icon>
            } @else {
              <lucide-icon [img]="MenuIcon" class="w-6 h-6"></lucide-icon>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Drawer Navigation -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden mt-4 glass-panel rounded-2xl p-6 border border-cyber-border-dark animate-in fade-in slide-in-from-top duration-300">
          <div class="flex flex-col gap-2">
            @for (item of navItems; track item.id) {
              <a 
                [href]="'#' + item.id"
                (click)="onMobileNavClick(item.id)"
                class="px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-between"
                [class.text-neon-cyan]="activeSection() === item.id"
                [class.bg-neon-cyan\/10]="activeSection() === item.id"
                [class.text-gray-300]="activeSection() !== item.id">
                {{ item.label }}
                <span class="text-xs font-mono opacity-40">#{{ item.id }}</span>
              </a>
            }
            <a 
              href="#contact"
              (click)="mobileMenuOpen.set(false)"
              class="mt-2 text-center py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-gray-950 font-bold text-sm shadow-md">
              Hablemos
            </a>
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  themeService = inject(ThemeService);

  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly SparklesIcon = Sparkles;

  isScrolled = signal<boolean>(false);
  activeSection = signal<string>('hero');
  mobileMenuOpen = signal<boolean>(false);

  readonly navItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'github', label: 'GitHub' },
    { id: 'tech-stack', label: 'Tecnologías' },
    { id: 'services', label: 'Servicios' },
    { id: 'certifications', label: 'Certificaciones' },
    { id: 'contact', label: 'Contacto' },
  ];

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
