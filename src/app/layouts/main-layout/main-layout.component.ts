import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CustomCursorComponent } from '../../shared/components/custom-cursor/custom-cursor.component';
import { ScrollProgressComponent } from '../../shared/components/scroll-progress/scroll-progress.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, CustomCursorComponent, ScrollProgressComponent],
  template: `
    <div class="relative min-h-screen bg-cyber-dark text-gray-100 transition-colors duration-300">
      <!-- Scroll Reading Progress Bar -->
      <app-scroll-progress></app-scroll-progress>

      <!-- Custom Magnetic Glowing Cursor -->
      <app-custom-cursor></app-custom-cursor>

      <!-- Sticky Glass Header -->
      <app-header></app-header>

      <!-- Main Page Content -->
      <main id="hero" role="main" class="relative z-10 pt-20">
        <router-outlet></router-outlet>
      </main>

      <!-- Master Footer -->
      <app-footer></app-footer>
    </div>
  `
})
export class MainLayoutComponent {}

